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

export const CARBON_GET_FILE: Tool = {
  name: "carbon_get_file",
  description: "Get the content of a specific file from the Carbon for Salesforce repository. One API call - returns raw file content.",
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "File path in the repository (e.g., 'force-app/main/default/lwc/carbonButton/carbonButton.js')"
      }
    },
    required: ["path"]
  }
};

interface GetFileArgs {
  path: string;
}

export async function handleCarbonGetFile(args: GetFileArgs): Promise<ToolResponse> {
  try {
    const { path } = args;
    
    // Single GitHub API call
    const response = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path,
    });

    // Return raw file data
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
          path: args.path
        }, null, 2)
      }],
      isError: true
    };
  }
}