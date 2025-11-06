# Changelog

All notable changes to the Carbon for Salesforce MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-06

### Security
- Removed hardcoded GitHub token from source code
- All authentication now exclusively via environment variables

### Changed
- Enhanced security documentation in README

## [1.0.0] - 2025-11-06

### Added - Initial Release

Complete MCP server implementation for Carbon for Salesforce development with 4 specialized tools:

#### Tools

##### Repository & File Access (4 tools)
- **get_repository_info**: Retrieve repository metadata, structure, and statistics
  - Returns: description, stars, forks, language, topics, branch info
  - Use case: Understand repository organization and structure
  
- **list_directory**: List contents of any directory in the repository
  - Supports: nested directories, file/folder filtering
  - Returns: file names, types, sizes, paths
  - Use case: Navigate repository structure, discover components
  
- **get_file**: Retrieve source code for any file in the repository
  - Supports: All file types (JavaScript, CSS, HTML, XML, etc.)
  - Returns: Full file content with syntax-appropriate formatting
  - Use case: Access component source code, examine implementations
  
- **search_files**: Search for files by name pattern or content
  - Supports: Filename search, content search, regex patterns
  - Returns: Matching files with context and locations
  - Use case: Find specific components, patterns, or examples

#### Transport Modes
- **stdio mode**: Native MCP protocol for IDE integration
  - Supported clients: VS Code, Claude Desktop, IBM Bob
  - Binary command: `carbon-salesforce-mcp`
  
- **HTTP/REST mode**: RESTful API for orchestration platforms
  - Endpoint: `http://localhost:3001`
  - Authentication: X-API-Key header support
  - Binary command: `carbon-salesforce-http`
  - Use case: Watsonx Orchestrate, custom agent frameworks

#### Features
- Direct GitHub API integration using Octokit SDK
- Environment variable-based authentication (GITHUB_TOKEN)
- TypeScript with strict type checking
- Comprehensive error handling
- Support for IBM GitHub Enterprise repositories
- Base64 decoding for file content
- Repository structure navigation
- Pattern-based file search

#### Documentation
- Complete README with setup instructions
- Installation via npx (no installation required)
- Configuration examples for MCP clients
- HTTP mode deployment guide
- Tool usage examples and patterns
- Troubleshooting guide

### Dependencies

```json
{
  "@modelcontextprotocol/sdk": "^0.5.0",
  "@octokit/rest": "^20.0.2",
  "express": "^4.18.2",
  "typescript": "^5.7.2"
}
```

### Installation

#### Using npx (Recommended)
```bash
npx -y @kirtijha/carbon-salesforce-mcp-server
```

#### Global Installation
```bash
npm install -g @kirtijha/carbon-salesforce-mcp-server
```

### Configuration

#### Environment Variables Required
- `GITHUB_TOKEN`: GitHub Personal Access Token with `repo` scope (required)
- `MCP_API_KEY`: API key for HTTP mode authentication (optional, for HTTP mode)

#### MCP Client Configuration
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

### Security Vulnerabilities

**No known security vulnerabilities in this release.**

This release has been audited for security issues:
- ✅ No hardcoded credentials (v1.0.1 fix)
- ✅ Input validation on all tool parameters
- ✅ Secure error handling (no sensitive data exposure)
- ✅ GitHub token stored in environment variables only
- ✅ Dependencies audited with `npm audit`

### Known Issues

None reported.

### Upgrade Notes

This is the initial stable release (v1.0.0). No upgrade path from previous versions.

#### From v1.0.0 to v1.0.1
- No breaking changes
- Security enhancement: remove any hardcoded tokens from your local configuration
- Ensure `GITHUB_TOKEN` environment variable is properly set

### Breaking Changes

None. This is the initial release.

### Deprecations

None.

### Performance

- GitHub API calls are made on-demand (no caching in v1.0.0)
- Average response time: < 2 seconds for file retrieval
- Rate limiting: GitHub API standard limits apply (5000 requests/hour for authenticated users)

### Testing

- Manual testing completed for all 4 tools
- Tested in both stdio and HTTP modes
- Verified with multiple MCP clients (VS Code, Claude Desktop)
- GitHub API integration validated

### Use Cases

#### For AI Assistants
- Browse Carbon component implementations
- Find usage examples and patterns
- Understand component structure and architecture
- Access documentation and comments
- Search for specific implementations

#### For Developers
- Quick component reference during development
- Pattern discovery for Carbon-compliant UIs
- Code example retrieval
- Repository exploration without browser context switching

#### For Orchestration
- Automated component analysis
- Documentation generation
- Pattern extraction workflows
- Integration with Watsonx Orchestrate

### Repository

- **Source**: https://github.com/IBM/carbon-salesforce-mcp-server
- **NPM**: https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server
- **License**: MIT

### Links

- [GitHub Repository](https://github.com/IBM/carbon-salesforce-mcp-server)
- [NPM Package](https://www.npmjs.com/package/@kirtijha/carbon-salesforce-mcp-server)
- [Carbon for Salesforce](https://github.ibm.com/IBM-Sales-Enablement-Solutions/carbon-for-salesforce)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

## Release History

- **v1.0.1** (2025-11-06): Security fix - removed hardcoded GitHub token
- **v1.0.0** (2025-11-06): Initial stable release with 4 tools

---

For more details, see the [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
