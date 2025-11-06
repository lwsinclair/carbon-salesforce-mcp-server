# Carbon for Salesforce MCP Server

[![npm version](https://badge.fury.io/js/%40kirtijha%2Fcarbon-salesforce-mcp-server.svg)](https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server)
[![npm downloads](https://img.shields.io/npm/dm/@kirtijha/carbon-salesforce-mcp-server.svg)](https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server)

A Model Context Protocol (MCP) server that provides direct access to the Carbon for Salesforce repository on IBM GitHub Enterprise. This server enables AI assistants to retrieve source code, explore the repository structure, and access implementation details for Carbon Design System components in Salesforce Lightning Web Components.

## 🔗 Links

- **GitHub**: [https://github.ibm.com/kirtijha/carbon-salesforce-mcp-server](https://github.ibm.com/kirtijha/carbon-salesforce-mcp-server)
- **NPM**: [https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server](https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server)

## 📦 Installation

### Using npx (Recommended - No Installation Required)

The easiest way to use the server is with `npx`:

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "npx",
      "args": ["-y", "@kirtijha/carbon-salesforce-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Global Installation

```bash
npm install -g @kirtijha/carbon-salesforce-mcp-server
```

Then configure:

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "carbon-salesforce-mcp",
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### HTTP Server Mode

Run as a standalone HTTP server:

```bash
# Set environment variables
export GITHUB_TOKEN="your-github-token"
export MCP_API_KEY="your-secure-api-key"
export PORT=3000

# Using npx
npx -y @kirtijha/carbon-salesforce-mcp-server --http

# Or if installed globally
carbon-salesforce-http
```

### Local Development

For contributing or local development:

```bash
# Clone the repository
git clone https://github.ibm.com/kirtijha/carbon-salesforce-mcp-server.git
cd carbon-salesforce-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## 🔑 GitHub Token Setup

Create a GitHub Personal Access Token from IBM GitHub Enterprise:

1. Go to https://github.ibm.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (for private repositories) or `public_repo` (for public repositories)
4. Copy the generated token

## ⚡ Quick Start

## 📚 Configuration Examples

### Using npx (Recommended)

<details open>
<summary><b>🔵 IBM Bob IDE</b></summary>

**Global Configuration** (`~/Library/Application Support/Bob-IDE/User/globalStorage/ibm.bob-code/settings/mcp_settings.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "npx",
      "args": ["-y", "@kirtijha/carbon-salesforce-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**Project Configuration** (`<project>/.Bob/mcp.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "npx",
      "args": ["-y", "@kirtijha/carbon-salesforce-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>🟣 Claude Desktop</b></summary>

Add to your `claude_desktop_config.json` (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "npx",
      "args": ["-y", "@kirtijha/carbon-salesforce-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>� GitHub Copilot Chat (VS Code)</b></summary>

**Project Configuration** (`<project>/.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "npx",
      "args": ["-y", "@kirtijha/carbon-salesforce-mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

</details>

### Using Local Installation

If you've cloned the repository locally:

<details>
<summary><b>�🔵 IBM Bob IDE (Local)</b></summary>

### Configuration

Add to your IBM Bob IDE configuration file:

**Global Configuration** (`~/Library/Application Support/Bob-IDE/User/globalStorage/ibm.bob-code/settings/mcp_settings.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "node",
      "args": ["/absolute/path/to/carbon-salesforce-mcp-server/dist/index.js"],
      "env": {
        "IBM_GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**Project Configuration** (`<project>/.Bob/mcp.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "node",
      "args": ["/absolute/path/to/carbon-salesforce-mcp-server/dist/index.js"],
      "env": {
        "IBM_GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

> **Note**: Replace `/absolute/path/to/` with the actual path where you cloned the repository.

</details>

<details>
<summary><b>🟣 Claude Desktop</b></summary>

### Configuration

Add to your `claude_desktop_config.json` (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "node",
      "args": ["/absolute/path/to/carbon-salesforce-mcp-server/dist/index.js"],
      "env": {
        "IBM_GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

> **Note**: Replace `/absolute/path/to/` with the actual path where you cloned the repository.

</details>

<details>
<summary><b>🤖 GitHub Copilot Chat (VS Code)</b></summary>

### Configuration

**User-wide Configuration** (`~/.config/Code/User/settings.json`):

```json
{
  "mcp.servers": {
    "carbon-salesforce": {
      "command": "node",
      "args": ["/absolute/path/to/carbon-salesforce-mcp-server/dist/index.js"],
      "env": {
        "IBM_GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**Project Configuration** (`<project>/.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "command": "node",
      "args": ["/absolute/path/to/carbon-salesforce-mcp-server/dist/index.js"],
      "env": {
        "IBM_GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

> **Note**: Replace `/absolute/path/to/` with the actual path where you cloned the repository.

</details>

---

## 🌐 Remote Deployment (Optional)

For teams that prefer remote deployment, the server also supports HTTP-based execution.

### HTTP Server Mode

Start the HTTP server:

```bash
npm run start:http
```

The server will be available at:

- **Health Check**: http://localhost:3005/health
- **Tools List**: http://localhost:3005/tools
- **Tool Execution**: http://localhost:3005/tools/call (POST)

### Remote Configuration

#### Claude Desktop

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3005"
      },
      "headers": {
        "Authorization": "Bearer carbon-server-key"
      }
    }
  }
}
```

#### IBM Bob IDE

**Global Configuration** (`~/Library/Application Support/Bob-IDE/User/globalStorage/ibm.bob-code/settings/mcp_settings.json`):

```json
{
  "mcpServers": {
    "carbon-salesforce": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3005"
      },
      "headers": {
        "Authorization": "Bearer carbon-server-key"
      }
    }
  }
}
```

#### GitHub Copilot Chat (VS Code)

```json
{
  "mcp.servers": {
    "carbon-salesforce": {
      "transport": {
        "type": "http",
        "url": "http://localhost:3005"
      },
      "headers": {
        "Authorization": "Bearer carbon-server-key"
      }
    }
  }
}
```

### Environment Variables

```bash
# IBM GitHub Enterprise Authentication
IBM_GITHUB_TOKEN=your_github_token_here

# HTTP Server Configuration
PORT=3005
API_KEY=carbon-server-key

# Optional: GitHub Enterprise Settings
GITHUB_BASE_URL=https://github.ibm.com/api/v3
REPO_OWNER=carbon-for-salesforce
REPO_NAME=carbon-for-salesforce
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3005
CMD ["npm", "run", "start:http"]
```

```bash
docker build -t carbon-salesforce-mcp-server .
docker run -p 3005:3005 \
  -e IBM_GITHUB_TOKEN=your-token \
  carbon-salesforce-mcp-server
```

### Production Deployment

```bash
# Using PM2 for process management
npm install pm2 -g
pm2 start "npm run start:http" --name carbon-salesforce-mcp
pm2 save
pm2 startup
```

---

## 🎯 What This Server Provides

This MCP server connects to the IBM GitHub Enterprise Carbon for Salesforce repository to provide real-time access to:

- **Component Source Code**: Access complete implementations of Carbon Design System components
- **Repository Structure**: Navigate and explore the entire project organization
- **Code Examples**: Find real-world usage patterns and implementations
- **Documentation**: Retrieve README files, comments, and inline documentation
- **Configuration Files**: Access build configs, package definitions, and project settings

The server acts as a bridge between AI assistants and the Carbon for Salesforce codebase, enabling intelligent code assistance, implementation guidance, and development support.

## ✨ Key Features

### Repository Access Tools

- **🔍 File Search**: Search across all files using GitHub's powerful search capabilities
- **📄 File Retrieval**: Get complete content of any file in the repository
- **📁 Directory Browsing**: Explore folder structures and file listings
- **ℹ️ Repository Metadata**: Access repository statistics and information

### Direct GitHub Integration

- **⚡ Real-time Data**: Always up-to-date with the latest repository state
- **🏢 Enterprise Access**: Connects to IBM's internal GitHub Enterprise instance
- **🔒 Secure**: Uses GitHub Personal Access Tokens for authentication
- **📦 Comprehensive Coverage**: Access to all files and documentation

## 🔧 Available Tools (4 Total)

The server provides 4 specialized tools for interacting with the Carbon for Salesforce repository:

### `carbon_search_files`

**Search for files** across the entire Carbon for Salesforce repository using GitHub's search functionality.

**Parameters**:

- `query` (required): Search terms - supports file names, code content, paths
  - Examples: `"button"`, `"carbon lwc"`, `"filename:button.js"`, `"class carbonButton"`
- `maxResults` (optional): Maximum results to return (default: 10, max: 100)

**Returns**: Complete GitHub search results including:

- File paths and names
- Content snippets showing matches
- Repository metadata (SHA, URLs, sizes)
- Match scores and relevance

**Example Use Cases**:

```javascript
// Find all button-related components
carbon_search_files({ query: "button", maxResults: 5 });

// Search for specific file types
carbon_search_files({ query: "extension:js carbonButton" });

// Find files in specific directories
carbon_search_files({ query: "path:lwc/ carbonIcon" });
```

---

### `carbon_get_file`

**Retrieve complete content** of any specific file from the repository.

**Parameters**:

- `path` (required): Full file path in repository
  - Example: `"force-app/main/default/lwc/carbonButton/carbonButton.js"`

**Returns**: Complete file data including:

- Raw file content (base64 encoded for binary files)
- File metadata (size, SHA, encoding)
- Download URLs and git references
- Last modified information

**Example Use Cases**:

```javascript
// Get a Lightning Web Component
carbon_get_file({
  path: "force-app/main/default/lwc/carbonButton/carbonButton.js",
});

// Retrieve component HTML template
carbon_get_file({
  path: "force-app/main/default/lwc/carbonButton/carbonButton.html",
});

// Get configuration files
carbon_get_file({ path: "package.json" });
```

---

### `carbon_list_directory`

**Browse directory contents** to explore the repository structure.

**Parameters**:

- `path` (optional): Directory path to list (default: `""` for root)
  - Example: `"force-app/main/default/lwc"`

**Returns**: Array of directory contents with:

- File and folder names
- Types (file or directory)
- Sizes and metadata
- Full paths for nested access

**Example Use Cases**:

```javascript
// List all Lightning Web Components
carbon_list_directory({ path: "force-app/main/default/lwc" });

// Browse root directory
carbon_list_directory({ path: "" });

// Explore static resources
carbon_list_directory({ path: "force-app/main/default/staticresources" });
```

---

### `carbon_get_repository_info`

**Get repository metadata** and overall statistics.

**Parameters**: None required

**Returns**: Complete repository information including:

- Repository description and purpose
- Programming languages used
- Repository size and statistics
- Creation and last updated dates
- Stars, forks, and watchers count
- Default branch information

**Example Use Cases**:

```javascript
// Get overview of the repository
carbon_get_repository_info();
```

---

## 💡 Example Queries & Use Cases

### Component Discovery

```javascript
// Find all Carbon button components
carbon_search_files({ query: "carbonButton", maxResults: 10 });

// Locate icon implementations
carbon_search_files({ query: "carbonIcon path:lwc/" });
```

### Code Analysis

```javascript
// Examine button component implementation
carbon_get_file({
  path: "force-app/main/default/lwc/carbonButton/carbonButton.js",
});

// Review component styling
carbon_get_file({
  path: "force-app/main/default/lwc/carbonButton/carbonButton.css",
});
```

### Pattern Research

```javascript
// Explore all LWC components
carbon_list_directory({ path: "force-app/main/default/lwc" });

// Find test patterns
carbon_search_files({ query: "test.js" });
```

### Documentation Access

```javascript
// Get project README
carbon_get_file({ path: "README.md" });

// Find documentation files
carbon_search_files({ query: "extension:md documentation" });
```

### Architecture Understanding

```javascript
// Get repository overview
carbon_get_repository_info();

// Browse project structure
carbon_list_directory({ path: "" });

// Explore configuration
carbon_get_file({ path: "sfdx-project.json" });
```

---

## 📁 Repository Structure

The Carbon for Salesforce repository typically contains:

```
carbon-for-salesforce/
├── force-app/
│   └── main/
│       └── default/
│           ├── lwc/                    # Lightning Web Components
│           │   ├── carbonButton/       # Button component
│           │   ├── carbonIcon/         # Icon component
│           │   └── ...                 # Other components
│           ├── staticresources/        # Static resources
│           └── aura/                   # Aura components (if any)
├── docs/                               # Documentation
├── examples/                           # Usage examples
├── .storybook/                         # Storybook configuration
├── stories/                            # Component stories
├── package.json                        # NPM dependencies
├── sfdx-project.json                   # Salesforce DX config
└── README.md                           # Project documentation
```

---

## 🚀 Common Use Cases

This MCP server is particularly useful for:

1. **🔍 Component Discovery**: Find existing Carbon components and their implementations
2. **📊 Code Analysis**: Examine how specific features are implemented in detail
3. **📚 Pattern Research**: Identify common patterns, best practices, and architectural decisions
4. **📖 Documentation Access**: Retrieve README files, inline comments, and documentation
5. **🏗️ Architecture Understanding**: Explore the overall structure and organization
6. **💻 Implementation Examples**: Find real-world usage examples and code patterns
7. **🔧 Configuration Review**: Access build configs, package definitions, and project settings
8. **🧪 Test Pattern Analysis**: Study how components are tested and validated

---

## 🛠️ Development

### Building the Project

```bash
npm run build     # Compile TypeScript to JavaScript
npm run watch     # Watch mode for active development
npm run dev       # Build and start the server immediately
```

### Project Structure

```
carbon-salesforce-mcp-server/
├── src/
│   ├── index.ts                    # Main server entry point
│   ├── tools/                      # MCP tool implementations
│   │   ├── getFile.ts             # File content retrieval
│   │   ├── listDirectory.ts       # Directory browsing
│   │   ├── searchFiles.ts         # Repository search
│   │   └── getRepositoryInfo.ts   # Repository metadata
│   ├── types/                      # TypeScript type definitions
│   └── utils/                      # Utility functions and helpers
├── dist/                           # Compiled JavaScript output
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

### GitHub Enterprise Configuration

- **Base URL**: `https://github.ibm.com/api/v3`
- **Repository**: `carbon-for-salesforce/carbon-for-salesforce`
- **Authentication**: GitHub Personal Access Token (PAT)
- **Required Permissions**: Repository read access (`repo` or `public_repo` scope)

---

## 📝 License

MIT License

---

## 🔗 Links

- **Repository**: https://github.ibm.com/kirtijha/carbon-salesforce-mcp-server
- **Carbon for Salesforce**: https://github.ibm.com/carbon-for-salesforce/carbon-for-salesforce
- **Model Context Protocol**: https://modelcontextprotocol.io

---

## 🤝 Contributing

This server is designed to support Carbon for Salesforce development teams. Contributions, feedback, and suggestions are welcome!

```

## License

MIT License
```
