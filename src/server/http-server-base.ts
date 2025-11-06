/**
 * Base HTTP Server for Carbon Salesforce MCP Server
 * Implements MCP JSON-RPC protocol over HTTP
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export abstract class BaseHTTPServer {
  protected app: express.Application;
  protected tools: Tool[] = [];

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    
    // Authentication middleware
    this.app.use('/mcp', (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      const apiKey = process.env.MCP_API_KEY || 'default-key';
      
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== apiKey) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      next();
    });
  }

  private setupRoutes() {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({ 
        status: 'healthy', 
        server: 'carbon-salesforce-mcp-server',
        tools: this.tools.length,
        timestamp: new Date().toISOString()
      });
    });

    // MCP JSON-RPC endpoints
    this.app.get('/mcp', this.handleMCPRequest.bind(this));
    this.app.post('/mcp', this.handleMCPRequest.bind(this));
  }

  private async handleMCPRequest(req: Request, res: Response) {
    try {
      const method = req.method === 'GET' ? req.query.method as string : req.body?.method;
      const params = req.method === 'GET' ? req.query.params : req.body?.params;
      const id = req.method === 'GET' ? req.query.id : req.body?.id;

      let result;

      switch (method) {
        case 'initialize':
          result = {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {}
            },
            serverInfo: {
              name: "carbon-salesforce-mcp-server",
              version: "1.0.0"
            }
          };
          break;

        case 'tools/list':
          result = { tools: this.tools };
          break;

        case 'tools/call':
          if (!params || typeof params !== 'object' || !('name' in params)) {
            throw new Error('Invalid tool call parameters');
          }
          result = await this.handleToolCall(params.name as string, params.arguments || {});
          break;

        case 'logging/setLevel':
          // Accept logging level changes but don't actually implement logging
          result = {};
          break;

        default:
          throw new Error(`Unknown method: ${method}`);
      }

      res.json({
        jsonrpc: "2.0",
        id: id || null,
        result
      });

    } catch (error) {
      console.error('MCP request error:', error);
      res.status(500).json({
        jsonrpc: "2.0",
        id: req.body?.id || null,
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal error'
        }
      });
    }
  }

  protected abstract handleToolCall(name: string, args: any): Promise<any>;

  public setTools(tools: Tool[]) {
    this.tools = tools;
  }

  public listen(port: number) {
    return new Promise<void>((resolve) => {
      this.app.listen(port, () => {
        console.log(`Carbon Salesforce MCP Server listening on port ${port}`);
        console.log(`Available tools: ${this.tools.length}`);
        resolve();
      });
    });
  }
}