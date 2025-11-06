/**
 * Complete Carbon Salesforce HTTP MCP Server
 * All Carbon Design System tools with HTTP interface
 */

import { BaseHTTPServer } from './http-server-base.js';

// Import all Carbon tools
import { CARBON_SEARCH_FILES, handleCarbonSearchFiles } from "../tools/searchFiles.js";
import { CARBON_GET_FILE, handleCarbonGetFile } from "../tools/getFile.js";
import { CARBON_LIST_DIRECTORY, handleCarbonListDirectory } from "../tools/listDirectory.js";
import { CARBON_GET_REPOSITORY_INFO, handleCarbonGetRepositoryInfo } from "../tools/getRepositoryInfo.js";

export class CarbonSalesforceHTTPServer extends BaseHTTPServer {
  constructor() {
    super();
    this.setTools([
      // Carbon Design System Tools (4 tools)
      CARBON_SEARCH_FILES,
      CARBON_GET_FILE, 
      CARBON_LIST_DIRECTORY,
      CARBON_GET_REPOSITORY_INFO
    ]);
  }

  protected async handleToolCall(name: string, args: any): Promise<any> {
    try {
      console.log(`Executing Carbon tool: ${name}`);

      switch (name) {
        case CARBON_SEARCH_FILES.name:
          return await handleCarbonSearchFiles(args);

        case CARBON_GET_FILE.name:
          return await handleCarbonGetFile(args);

        case CARBON_LIST_DIRECTORY.name:
          return await handleCarbonListDirectory(args);

        case CARBON_GET_REPOSITORY_INFO.name:
          return await handleCarbonGetRepositoryInfo();

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error executing Carbon tool ${name}:`, errorMessage);
      
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
}