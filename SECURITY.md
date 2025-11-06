# Security Policy

## Reporting Security Vulnerabilities

The Carbon for Salesforce MCP Server team takes security issues seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities privately using one of the following methods:

#### Method 1: GitHub Security Advisories (Recommended)

Report security vulnerabilities privately through GitHub Security Advisories:

**[Report a vulnerability](https://github.com/IBM/carbon-salesforce-mcp-server/security/advisories/new)**

This is the preferred method as it allows us to collaborate on the fix privately before public disclosure.

#### Method 2: Direct Email

If you prefer not to use GitHub Security Advisories, you can email the maintainers directly at:

- **Email**: kirtijha@in.ibm.com
- **Subject Line**: [SECURITY] Carbon Salesforce MCP - [Brief Description]

### What to Include in Your Report

Please include as much of the following information as possible:

1. **Type of vulnerability** (e.g., information disclosure, authentication bypass, token exposure, etc.)
2. **Full paths of affected source file(s)** or location of the affected code
3. **The location of the affected code** (tag/branch/commit or direct URL)
4. **Step-by-step instructions to reproduce the issue**
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact assessment** - what an attacker could potentially achieve
7. **Suggested remediation** (if you have ideas)

### What to Expect

After you submit a vulnerability report, you can expect:

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within **48 hours**
2. **Assessment**: We will confirm the vulnerability and determine its severity within **5 business days**
3. **Fix Development**: We will work on a fix and may reach out to you for additional information
4. **Coordinated Disclosure**: We will coordinate with you on the public disclosure timing
5. **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous)

### Security Update Process

1. **Private Fix**: Security vulnerabilities are fixed privately in a security patch
2. **Testing**: The fix is thoroughly tested to ensure it resolves the issue
3. **CVE Assignment**: If applicable, we will request a CVE identifier
4. **Release**: A new version is released with the security fix
5. **Security Advisory**: A security advisory is published with details about:
   - The vulnerability (CVE ID if applicable)
   - Affected versions
   - Fixed versions
   - Severity rating (using CVSS scores)
   - Mitigation steps for users who cannot immediately upgrade
   - Credit to the reporter (if they wish to be credited)
6. **Notification**: Users are notified through:
   - GitHub Security Advisories
   - Release notes (CHANGELOG.md)
   - NPM package update

### Supported Versions

We currently support security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

We recommend always using the latest version of the Carbon for Salesforce MCP Server.

## Security Best Practices for Users

When using the Carbon for Salesforce MCP Server, please follow these security best practices:

### GitHub Token Security

**Critical**: This server requires a GitHub Personal Access Token to function.

#### Token Management
- **Never hardcode tokens** in your code or configuration files
- Use **environment variables** for token storage
- Store tokens in secure secret management systems (e.g., AWS Secrets Manager, Azure Key Vault, HashiCorp Vault)
- **Rotate tokens regularly** (recommended: every 90 days)
- Use tokens with **minimum required scopes** (`repo` scope for private repos, or `public_repo` for public repos only)

#### Token Best Practices
```bash
# Good - Environment variable
export GITHUB_TOKEN="ghp_..."

# Bad - Hardcoded in config
{
  "env": {
    "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"  // ❌ Never do this
  }
}
```

#### Creating Secure Tokens
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select minimum required scopes:
   - `repo` (if accessing private repositories)
   - `public_repo` (if accessing only public repositories)
4. Set expiration date (recommended: 90 days maximum)
5. Store token securely in environment variable or secret manager

### API Key Security (HTTP Mode)

If running the server in HTTP mode:

- Use **strong, randomly generated API keys** (minimum 32 characters)
- Store API keys securely (never commit to version control)
- Rotate API keys periodically
- Use different API keys for different environments
- Implement API key rotation strategy

```bash
# Generate strong API key
export MCP_API_KEY=$(openssl rand -base64 32)
```

### Network Security

When running in HTTP mode:

- Use **HTTPS/TLS encryption** in production
- Deploy behind a reverse proxy (e.g., nginx, Apache) with SSL termination
- Implement **rate limiting** to prevent abuse
- Use firewall rules to restrict access to authorized IP addresses
- Consider using VPN or private network for internal deployments

### Dependency Management

- Keep the Carbon for Salesforce MCP Server updated to the latest version
- Regularly update Node.js to a supported LTS version
- Monitor security advisories for dependencies
- Run `npm audit` regularly to check for vulnerabilities

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitoring and Logging

- Enable logging in production environments
- Monitor for unusual activity or error patterns
- Sanitize logs to prevent leaking sensitive information (tokens, API keys)
- Set up alerts for authentication failures
- Review logs regularly for suspicious access patterns

### Repository Access

Be aware that:
- The server has access to all repositories your GitHub token can access
- Grant token access only to necessary repositories
- Use fine-grained personal access tokens when possible
- Review token permissions regularly

## Security Features

This project implements the following security features:

- **Environment-based authentication**: No hardcoded credentials in source code (v1.0.1+)
- **Input validation**: All user inputs are validated and sanitized
- **Error handling**: Errors do not expose sensitive information (tokens, internal paths)
- **Secure dependencies**: Regular dependency updates and security audits
- **TypeScript**: Type safety helps prevent certain classes of vulnerabilities
- **API key authentication**: Optional authentication for HTTP mode
- **Rate limiting ready**: Can be implemented via reverse proxy

## Known Security Considerations

### GitHub API Access

This server requires GitHub API access. Be aware that:

- The server can access any repository your GitHub token has access to
- Repository content is fetched in real-time (not cached)
- All API requests are subject to GitHub rate limits
- GitHub audit logs will show API activity from your token

### Token Exposure Risk (Fixed in v1.0.1)

**⚠️ Historical Issue**: Version 1.0.0 contained hardcoded GitHub tokens in source code.

**✅ Fixed in v1.0.1**: All hardcoded tokens removed. Authentication now exclusively via environment variables.

**Action Required**: If you used v1.0.0:
1. Upgrade to v1.0.1 or later
2. Revoke any GitHub tokens that were exposed
3. Generate new tokens and store them in environment variables

### Data Handling

This server interacts with GitHub repository data. Be aware that:

- All data accessed through the server comes from GitHub's API
- The server does not store or cache repository data
- File content is decoded from base64 (GitHub API format) and returned as plain text
- No data is persisted locally

## Disclosure Policy

We follow a **coordinated disclosure** policy:

- **Private reporting period**: 90 days from initial report (may be extended by mutual agreement)
- **Public disclosure**: After a fix is released and users have had time to upgrade (typically 7-14 days)
- **Early disclosure**: May occur if the vulnerability is being actively exploited
- **Credit**: We will credit security researchers in security advisories (unless they prefer anonymity)

## Out of Scope

The following are generally considered out of scope for security reports:

- Denial of Service (DoS) attacks requiring excessive resources
- Social engineering attacks
- Security issues in third-party dependencies (report those upstream)
- Security issues in GitHub itself (report to GitHub)
- Issues requiring physical access to a user's device
- Vulnerabilities in outdated/unsupported versions (< 1.0.0)

However, if you believe you've found a significant security issue even in these categories, please report it anyway and let us assess it.

## Security Incident Response

In the event of a security incident:

1. **Immediate Response**: Assess the severity and scope
2. **Containment**: Take immediate steps to limit exposure
3. **Investigation**: Determine root cause and affected versions
4. **Remediation**: Develop and test fix
5. **Communication**: Notify affected users through security advisory
6. **Post-Incident**: Review and improve security practices

## Bug Bounty Program

We do not currently offer a bug bounty program. However, we deeply appreciate security research and will:

- Publicly acknowledge your contribution (if desired)
- Credit you in security advisories and release notes
- Provide a detailed response to your report
- Work with you on coordinated disclosure

## Questions?

If you have questions about this security policy, please:
- Open a GitHub Discussion (for general security questions)
- Contact the maintainers directly (for sensitive inquiries)

## Version History

- **v1.0.1** (2025-11-06): Removed hardcoded GitHub tokens (security fix)
- **v1.0.0** (2025-11-06): Initial release

---

**Last Updated**: November 6, 2025

Thank you for helping keep Carbon for Salesforce MCP Server and its users safe! 🔒
