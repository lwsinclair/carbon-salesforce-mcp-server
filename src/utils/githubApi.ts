import { Octokit } from "@octokit/rest";

// Get GitHub token from environment variable (required)
const GITHUB_TOKEN = process.env.IBM_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const IBM_GITHUB_ENTERPRISE_URL = "https://github.ibm.com/api/v3";
export const REPO_OWNER = "carbon-for-salesforce";
export const REPO_NAME = "carbon-for-salesforce";

if (!GITHUB_TOKEN) {
  console.warn("Warning: No GitHub token provided. Set IBM_GITHUB_TOKEN or GITHUB_TOKEN environment variable.");
}

// GitHub API client for Carbon for Salesforce repository
export const octokit: Octokit = new Octokit({
  baseUrl: IBM_GITHUB_ENTERPRISE_URL,
  auth: GITHUB_TOKEN,
  headers: {
    "User-Agent": "carbon-salesforce-mcp-server",
    Accept: "application/vnd.github.v3+json",
  },
});

/**
 * Test the GitHub connection
 */
export async function testGitHubConnection(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await octokit.rest.repos.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export interface GitHubFile {
  name: string;
  path: string;
  content?: string;
  type: "file" | "dir";
  download_url?: string;
}

export interface ComponentFile {
  name: string;
  path: string;
  jsContent?: string;
  htmlContent?: string;
  xmlContent?: string;
  cssContent?: string;
}

/**
 * Fetch repository contents from Carbon for Salesforce
 */
export async function fetchRepositoryContents(
  path: string = ""
): Promise<GitHubFile[]> {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path,
    });

    const contents = Array.isArray(response.data)
      ? response.data
      : [response.data];

    return contents.map((item) => ({
      name: item.name,
      path: item.path,
      type: item.type as "file" | "dir",
      download_url:
        "download_url" in item ? item.download_url || undefined : undefined,
    }));
  } catch (error) {
    console.error(
      `Error fetching repository contents for path ${path}:`,
      error
    );
    return [];
  }
}

/**
 * Fetch file content from GitHub with caching
 */
export async function fetchFileContent(
  path: string
): Promise<string | undefined> {
  try {
    // Check cache first
    const cacheKey = `file_${path}`;
    const cached = contentsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.content;
    }

    const response = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path,
    });

    if ("content" in response.data && response.data.content) {
      const content = Buffer.from(response.data.content, "base64").toString("utf-8");
      
      // Cache the result
      contentsCache.set(cacheKey, {
        content,
        timestamp: Date.now()
      });
      
      return content;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching file content for ${path}:`, error);
    return undefined;
  }
}

/**
 * Discover Lightning Web Components in the repository
 */
export async function discoverLightningComponents(): Promise<ComponentFile[]> {
  try {
    // Look for LWC components in common Salesforce paths
    const lwcPaths = ["force-app/main/default/lwc", "src/lwc", "packages/lwc"];

    const components: ComponentFile[] = [];

    for (const basePath of lwcPaths) {
      try {
        const contents = await fetchRepositoryContents(basePath);

        for (const item of contents) {
          if (item.type === "dir" && item.name.startsWith("carbon")) {
            const componentFiles = await fetchRepositoryContents(item.path);

            const component: ComponentFile = {
              name: item.name,
              path: item.path,
            };

            // Fetch component files
            for (const file of componentFiles) {
              if (file.name.endsWith(".js")) {
                component.jsContent =
                  (await fetchFileContent(file.path)) || undefined;
              } else if (file.name.endsWith(".html")) {
                component.htmlContent =
                  (await fetchFileContent(file.path)) || undefined;
              } else if (file.name.endsWith(".xml")) {
                component.xmlContent =
                  (await fetchFileContent(file.path)) || undefined;
              } else if (file.name.endsWith(".css")) {
                component.cssContent =
                  (await fetchFileContent(file.path)) || undefined;
              }
            }

            components.push(component);
          }
        }
      } catch (error) {
        // Path doesn't exist, continue to next
        continue;
      }
    }

    return components;
  } catch (error) {
    console.error("Error discovering Lightning components:", error);
    return [];
  }
}

/**
 * Fetch repository README files and documentation
 */
export async function fetchDocumentation(
  path: string = ""
): Promise<string | undefined> {
  const readmePaths = [
    "README.md",
    "README.rst",
    "README.txt",
    "docs/README.md",
  ];

  for (const readmePath of readmePaths) {
    const fullPath = path ? `${path}/${readmePath}` : readmePath;
    const content = await fetchFileContent(fullPath);
    if (content) {
      return content;
    }
  }

  return undefined;
}

/**
 * Parse component properties from JavaScript file content
 */
export function parseComponentProperties(jsContent: string): Array<{
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  options?: string[];
}> {
  const properties: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
    options?: string[];
  }> = [];

  if (!jsContent) return properties;

  // Look for @api decorated properties
  const apiPropertyRegex = /@api\s+(\w+)(?:\s*=\s*([^;]+))?;?/g;
  let match;

  while ((match = apiPropertyRegex.exec(jsContent)) !== null) {
    const [, name, defaultValue] = match;
    properties.push({
      name,
      type: "string", // Default type, could be enhanced with type inference
      required: !defaultValue,
      default: defaultValue?.trim(),
      description: `API property: ${name}`,
    });
  }

  // Look for track decorated properties
  const trackPropertyRegex = /@track\s+(\w+)(?:\s*=\s*([^;]+))?;?/g;

  while ((match = trackPropertyRegex.exec(jsContent)) !== null) {
    const [, name, defaultValue] = match;
    properties.push({
      name,
      type: "string",
      required: false,
      default: defaultValue?.trim(),
      description: `Tracked property: ${name}`,
    });
  }

  return properties;
}

/**
 * Parse component events from JavaScript file content
 */
export function parseComponentEvents(jsContent: string): Array<{
  name: string;
  description: string;
  payload?: string;
}> {
  const events: Array<{
    name: string;
    description: string;
    payload?: string;
  }> = [];

  if (!jsContent) return events;

  // Look for this.dispatchEvent calls
  const eventRegex =
    /this\.dispatchEvent\(\s*new\s+CustomEvent\(\s*['"`](\w+)['"`]\s*(?:,\s*\{([^}]+)\})?\s*\)/g;
  let match;

  while ((match = eventRegex.exec(jsContent)) !== null) {
    const [, eventName, eventDetails] = match;
    events.push({
      name: eventName,
      description: `Custom event: ${eventName}`,
      payload: eventDetails ? `{${eventDetails}}` : "Event object",
    });
  }

  return events;
}

/**
 * Get latest repository information
 */
export async function getRepositoryInfo() {
  try {
    const response = await octokit.rest.repos.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });

    return {
      name: response.data.name,
      description: response.data.description,
      url: response.data.html_url,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      lastUpdated: response.data.updated_at,
      defaultBranch: response.data.default_branch,
    };
  } catch (error) {
    console.error("Error fetching repository info:", error);
    return null;
  }
}

/**
 * Get latest releases
 */
export async function getLatestReleases(limit: number = 5) {
  try {
    const response = await octokit.rest.repos.listReleases({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      per_page: limit,
    });

    return response.data.map((release) => ({
      tagName: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      body: release.body,
      url: release.html_url,
    }));
  } catch (error) {
    console.error("Error fetching releases:", error);
    return [];
  }
}

// Simple cache for repository contents
const contentsCache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Search for specific Carbon components in the repository - OPTIMIZED VERSION
 */
export async function searchCarbonComponents(
  componentName?: string
): Promise<ComponentFile[]> {
  try {
    // More targeted search query
    const searchQuery = componentName
      ? `${componentName} in:path path:lwc repo:${REPO_OWNER}/${REPO_NAME}`
      : `carbon in:path path:lwc repo:${REPO_OWNER}/${REPO_NAME}`;

    const response = await octokit.rest.search.code({
      q: searchQuery,
      per_page: 20, // Reduced from 100 to limit results
    });

    const components: ComponentFile[] = [];
    const processedDirs = new Set<string>();

    // Process only first 5 results for speed
    const itemsToProcess = response.data.items.slice(0, 5);

    for (const item of itemsToProcess) {
      const dirPath = item.path.substring(0, item.path.lastIndexOf("/"));

      if (!processedDirs.has(dirPath) && dirPath.includes("lwc")) {
        processedDirs.add(dirPath);

        const componentFiles = await fetchRepositoryContents(dirPath);
        const compName = dirPath.split("/").pop() || "";

        if (compName.includes("carbon") || (componentName && compName.toLowerCase().includes(componentName.toLowerCase()))) {
          const component: ComponentFile = {
            name: compName,
            path: dirPath,
          };

          // Fetch files in parallel for better performance
          const filePromises = componentFiles.map(async (file) => {
            if (file.name.endsWith(".js")) {
              return { type: 'js', content: await fetchFileContent(file.path) };
            } else if (file.name.endsWith(".html")) {
              return { type: 'html', content: await fetchFileContent(file.path) };
            } else if (file.name.endsWith(".xml")) {
              return { type: 'xml', content: await fetchFileContent(file.path) };
            } else if (file.name.endsWith(".css")) {
              return { type: 'css', content: await fetchFileContent(file.path) };
            }
            return null;
          });

          const fileResults = await Promise.all(filePromises);
          
          // Assign content based on file type
          fileResults.forEach(result => {
            if (result && result.content) {
              switch (result.type) {
                case 'js':
                  component.jsContent = result.content;
                  break;
                case 'html':
                  component.htmlContent = result.content;
                  break;
                case 'xml':
                  component.xmlContent = result.content;
                  break;
                case 'css':
                  component.cssContent = result.content;
                  break;
              }
            }
          });

          components.push(component);
        }
      }
    }

    return components;
  } catch (error) {
    console.error("Error searching for Carbon components:", error);
    // Return simple fallback instead of expensive directory discovery
    return [{
      name: componentName || "carbon-component",
      path: "component-not-found",
      jsContent: `// Component ${componentName || 'carbon-component'} not found in repository`
    }];
  }
}
