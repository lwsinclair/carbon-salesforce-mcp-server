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

export const CARBON_GET_REPOSITORY_INFO: Tool = {
  name: "carbon_get_repository_info",
  description: "Get repository information for Carbon for Salesforce. One API call - returns raw repository metadata.",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  }
};

export async function handleCarbonGetRepositoryInfo(): Promise<ToolResponse> {
  try {
    // Single GitHub API call
    const response = await octokit.rest.repos.get({
      owner: REPO_OWNER,
      repo: REPO_NAME,
    });

    // Return raw repository data
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
          repository: `${REPO_OWNER}/${REPO_NAME}`
        }, null, 2)
      }],
      isError: true
    };
  }
}