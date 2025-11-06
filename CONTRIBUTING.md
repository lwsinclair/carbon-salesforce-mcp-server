# Contributing to Carbon for Salesforce MCP Server

Thank you for your interest in contributing to the Carbon for Salesforce MCP Server! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Contribution Requirements](#contribution-requirements)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How to Contribute

We accept the following types of contributions:

- Bug fixes
- New tools and features
- Documentation improvements
- Performance improvements
- Test coverage improvements
- Code quality improvements

## Contribution Requirements

All contributions must meet the following requirements to be accepted:

### 1. Code Quality Standards

- **TypeScript**: All code must be written in TypeScript with strict type checking enabled
- **ESLint**: Code must pass ESLint checks (run `npm run lint`)
- **No TypeScript errors**: Code must compile without errors (`npm run build`)
- **Formatting**: Code should follow consistent formatting (we use Prettier: `npm run format`)

### 2. Coding Standards

#### Code Style
- Use meaningful variable and function names
- Follow existing code patterns and architecture
- Add JSDoc comments for public functions and complex logic
- Use async/await instead of raw promises where possible
- Handle errors appropriately with try-catch blocks

#### Example Code Pattern
```typescript
/**
 * Retrieves file content from the Carbon for Salesforce repository
 * @param path - The file path relative to repository root
 * @returns The file content as a string
 * @throws Error if file is not found or API request fails
 */
async function getFileContent(path: string): Promise<string> {
  try {
    // Validate input
    if (!path || typeof path !== 'string') {
      throw new Error('Invalid file path provided');
    }

    // Make API request
    const response = await octokit.repos.getContent({
      owner: 'IBM-Sales-Enablement-Solutions',
      repo: 'carbon-for-salesforce',
      path: path,
    });

    // Process and return result
    if ('content' in response.data) {
      return Buffer.from(response.data.content, 'base64').toString('utf-8');
    }

    throw new Error('File content not available');
  } catch (error) {
    // Handle errors without exposing sensitive information
    throw new Error(`Failed to retrieve file: ${error.message}`);
  }
}
```

### 3. Security Requirements

- **No hardcoded credentials**: Use environment variables for all sensitive data
- **Input validation**: Validate and sanitize all user inputs
- **Error handling**: Don't expose sensitive information in error messages
- **Dependencies**: Keep dependencies up to date and audit regularly

#### Security Checklist
- [ ] No credentials in code
- [ ] All user inputs validated
- [ ] Error messages sanitized
- [ ] Dependencies audited (`npm audit`)
- [ ] GitHub tokens stored in environment variables only

### 4. Documentation Requirements

- Update README.md if adding new features
- Add JSDoc comments for new functions
- Update examples if changing tool interfaces
- Document environment variables required

### 5. Testing Requirements

While automated tests are being developed, please perform thorough manual testing:

#### Manual Testing Checklist
- [ ] Test with valid GitHub token
- [ ] Test with invalid/missing GitHub token
- [ ] Test each new tool with various inputs
- [ ] Test error handling with invalid inputs
- [ ] Test in both stdio and HTTP modes (if applicable)
- [ ] Verify no sensitive data in logs

#### Test in stdio mode:
```bash
npm run build
node dist/index.js
```

#### Test in HTTP mode:
```bash
export GITHUB_TOKEN="your-token"
export MCP_API_KEY="test-key"
npm run start:http

# Test with curl
curl -X POST http://localhost:3001/tools/list \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test-key"
```

## Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- GitHub Personal Access Token with `repo` scope
- Git

### Setup Steps

1. **Fork and Clone**
```bash
git clone https://github.com/IBM/carbon-salesforce-mcp-server.git
cd carbon-salesforce-mcp-server
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment**
```bash
# Create .env file (don't commit this!)
echo "GITHUB_TOKEN=your_github_token" > .env
```

4. **Build the Project**
```bash
npm run build
```

5. **Test Locally**
```bash
# stdio mode
node dist/index.js

# HTTP mode
npm run start:http
```

## Coding Standards

### TypeScript Guidelines

#### Type Safety
- Use explicit types for function parameters and return values
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes
- Enable strict mode in tsconfig.json

```typescript
// Good
interface FileInfo {
  path: string;
  content: string;
  size: number;
}

async function getFile(path: string): Promise<FileInfo> {
  // Implementation
}

// Bad
async function getFile(path: any): Promise<any> {
  // Implementation
}
```

#### Error Handling
- Always handle errors in async functions
- Use custom error types when appropriate
- Don't expose sensitive data in error messages

```typescript
// Good
try {
  const data = await fetchFromGitHub(path);
  return data;
} catch (error) {
  throw new Error(`Failed to fetch file: ${error.message}`);
}

// Bad
try {
  const data = await fetchFromGitHub(path);
  return data;
} catch (error) {
  throw error; // Might expose sensitive info
}
```

### GitHub API Best Practices

- Use the Octokit SDK for all GitHub API calls
- Implement proper rate limiting handling
- Cache responses when appropriate
- Handle pagination for large results

### MCP Server Guidelines

- Follow MCP protocol specifications
- Use proper tool schemas with clear descriptions
- Validate tool inputs before processing
- Return structured, consistent responses

## Pull Request Process

### Before Submitting

1. **Update your fork**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
   - Write clear, focused commits
   - Follow the coding standards above
   - Test thoroughly

4. **Commit with sign-off** (DCO requirement)
```bash
git add .
git commit -s -m "feat: add new feature description"
```

### Commit Message Format

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -s -m "feat(tools): add get_component_examples tool"
git commit -s -m "fix(http): resolve CORS issue in HTTP mode"
git commit -s -m "docs: update installation instructions"
```

### Pull Request Template

When creating a PR, include:

```markdown
## Description
Clear description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- List key changes
- One per line

## Testing
- [ ] Manual testing completed
- [ ] Tested in stdio mode
- [ ] Tested in HTTP mode (if applicable)
- [ ] No TypeScript errors
- [ ] ESLint passes

## Documentation
- [ ] README updated (if needed)
- [ ] JSDoc comments added
- [ ] Examples updated (if needed)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] No hardcoded credentials
- [ ] Commit messages follow convention
- [ ] DCO sign-off included

Signed-off-by: Your Name <your.email@example.com>
```

### PR Review Process

1. **Automated Checks**: PRs must pass all automated checks
2. **Code Review**: At least one maintainer must review and approve
3. **Testing**: Reviewers will test the changes
4. **Feedback**: Address any requested changes
5. **Merge**: Once approved, maintainers will merge the PR

## Reporting Issues

### Before Creating an Issue

- Check if the issue already exists
- Verify it's not a configuration problem
- Test with the latest version

### Issue Template

When creating an issue, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the problem
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**:
   - OS and version
   - Node.js version
   - Package version
   - MCP client (VS Code, Claude, etc.)
6. **GitHub Token Scope**: Confirm your token has `repo` scope
7. **Logs**: Relevant error messages or logs (remove sensitive data)
8. **Additional Context**: Any other relevant information

### Example Issue

```markdown
**Description**
The `get_file` tool fails when accessing files in subdirectories.

**Steps to Reproduce**
1. Configure MCP server with valid GitHub token
2. Call `get_file` with path `force-app/main/default/lwc/button/button.js`
3. Observe error

**Expected Behavior**
Should return the file content.

**Actual Behavior**
Returns error: "File not found"

**Environment**
- OS: macOS 14.0
- Node.js: v20.10.0
- Package: @kirtijha/carbon-salesforce-mcp-server@1.0.1
- Client: VS Code with MCP extension

**Logs**
```
Error: File not found: force-app/main/default/lwc/button/button.js
    at getFile (index.ts:123)
```

**Additional Context**
The file exists in the repository and can be accessed via GitHub web UI.
```

### Security Issues

**Do not open public issues for security vulnerabilities.**

Please report security issues privately to the maintainers. See [SECURITY.md](SECURITY.md) for details on how to report security vulnerabilities.

## Getting Help

- **Documentation**: Check the [README.md](README.md) and other documentation
- **Issues**: Search existing issues for similar problems
- **Discussions**: Use GitHub Discussions for questions and ideas

## Recognition

Contributors will be recognized in our release notes and repository. We appreciate all contributions, big and small!

## License

By contributing to Carbon for Salesforce MCP Server, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making Carbon for Salesforce MCP Server better! 🎉
