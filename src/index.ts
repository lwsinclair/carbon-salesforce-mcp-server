#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import { config } from "dotenv";

// Import the 4 simple tools - each makes 1 API call
import { CARBON_SEARCH_FILES, handleCarbonSearchFiles } from "./tools/searchFiles.js";
import { CARBON_GET_FILE, handleCarbonGetFile } from "./tools/getFile.js";
import { CARBON_LIST_DIRECTORY, handleCarbonListDirectory } from "./tools/listDirectory.js";
import { CARBON_GET_REPOSITORY_INFO, handleCarbonGetRepositoryInfo } from "./tools/getRepositoryInfo.js";

// Load environment variables
config();

// Create server instance
const server = new Server(
  {
    name: "carbon-salesforce-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List all 4 tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      CARBON_SEARCH_FILES,
      CARBON_GET_FILE, 
      CARBON_LIST_DIRECTORY,
      CARBON_GET_REPOSITORY_INFO
    ] as Tool[],
  };
});

// Handle tool calls
server.setRequestHandler(
  CallToolRequestSchema,
  async (request, extra): Promise<CallToolResult> => {
    try {
      const { name, arguments: toolArgs } = request.params;

      switch (name) {
        case CARBON_SEARCH_FILES.name:
          return await handleCarbonSearchFiles(toolArgs as any);

        case CARBON_GET_FILE.name:
          return await handleCarbonGetFile(toolArgs as any);

        case CARBON_LIST_DIRECTORY.name:
          return await handleCarbonListDirectory(toolArgs as any);

        case CARBON_GET_REPOSITORY_INFO.name:
          return await handleCarbonGetRepositoryInfo();

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log startup message to stderr so it doesn't interfere with MCP communication
  console.error("Carbon for Salesforce MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});