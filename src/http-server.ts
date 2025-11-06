#!/usr/bin/env node

/**
 * Carbon Salesforce MCP HTTP Server Entry Point
 * Provides Carbon Design System tools via HTTP/REST interface
 */

import dotenv from 'dotenv';
import { CarbonSalesforceHTTPServer } from './server/carbon-http.js';

// Load environment variables
dotenv.config();

async function main() {
  try {
    const server = new CarbonSalesforceHTTPServer();
    const port = parseInt(process.env.HTTP_PORT || '3005', 10);
    
    await server.listen(port);
    
    console.log('🚀 Carbon Salesforce MCP HTTP Server Details:');
    console.log(`🎨 Server: Carbon Design System & Components`);
    console.log(`🌐 Health Check: http://localhost:${port}/health`);
    console.log(`🔧 MCP Endpoint: http://localhost:${port}/mcp`);
    console.log(`🔑 Authentication: Bearer ${process.env.MCP_API_KEY || 'default-key'}`);
    console.log(`⚡ Features:`);
    console.log(`   • File Operations (2 tools): Search Files, Get File Content`);
    console.log(`   • Directory Management (1 tool): List Directory Contents`);
    console.log(`   • Repository Info (1 tool): Get Repository Information`);
    console.log(`📈 Total Tools: 4 Carbon Design System tools`);

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down Carbon Salesforce HTTP Server...');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down Carbon Salesforce HTTP Server...');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start Carbon Salesforce HTTP Server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});