import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ToolResponse } from "../types/tools.js";
import { Octokit } from "@octokit/rest";

// Constants
const GITHUB_TOKEN = process.env.IBM_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const IBM_GITHUB_ENTERPRISE_URL = "https://github.ibm.com/api/v3";
const REPO_OWNER = "carbon-for-salesforce";
const REPO_NAME = "carbon-for-salesforce";

// GitHub API client
const octokit = new Octokit({
  baseUrl: IBM_GITHUB_ENTERPRISE_URL,
  auth: GITHUB_TOKEN,
  headers: {
    "User-Agent": "carbon-salesforce-mcp-server",
    Accept: "application/vnd.github.v3+json",
  },
});

export const CARBON_SEARCH_FILES: Tool = {
  name: "carbon_search_files",
  description: "Search for files in the Carbon for Salesforce repository. One API call - returns raw GitHub search results.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query (e.g., 'button', 'carbon lwc', 'filename:button.js')"
      },
      maxResults: {
        type: "number",
        default: 10,
        description: "Maximum number of results to return"
      }
    },
    required: ["query"]
  }
};

interface SearchFilesArgs {
  query: string;
  maxResults?: number;
}

export async function handleCarbonSearchFiles(args: SearchFilesArgs): Promise<ToolResponse> {
  try {
    const { query, maxResults = 10 } = args;
    
    // Single GitHub API call
    const response = await octokit.rest.search.code({
      q: `${query} repo:${REPO_OWNER}/${REPO_NAME}`,
      per_page: Math.min(maxResults, 100)
    });

    // Return raw results
    return {
      content: [{
        type: "text",
        text: JSON.stringify(response.data, null, 2)
      }],
      isError: false
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          error: error instanceof Error ? error.message : "Unknown error",
          query: args.query
        }, null, 2)
      }],
      isError: true
    };
  }
}