/**
 * Formats text for better readability in MCP responses
 */
export function formatResponse(content: string): string {
  return content.trim().replace(/\n\s+/g, '\n');
}

/**
 * Creates a code block with syntax highlighting hint
 */
export function formatCodeBlock(code: string, language: string = 'javascript'): string {
  return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}

/**
 * Formats a list of items with bullet points
 */
export function formatList(items: string[], ordered: boolean = false): string {
  return items
    .map((item, index) => {
      const bullet = ordered ? `${index + 1}.` : '•';
      return `${bullet} ${item}`;
    })
    .join('\n');
}

/**
 * Creates a section header
 */
export function formatHeader(title: string, level: number = 2): string {
  const hashes = '#'.repeat(level);
  return `${hashes} ${title}\n`;
}

/**
 * Formats component properties as a table
 */
export function formatPropertiesTable(properties: Array<{
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
}>): string {
  const headers = '| Property | Type | Required | Default | Description |';
  const separator = '|----------|------|----------|---------|-------------|';
  
  const rows = properties.map(prop => {
    const defaultValue = prop.default !== undefined ? `\`${prop.default}\`` : '-';
    const required = prop.required ? '✓' : '-';
    return `| \`${prop.name}\` | \`${prop.type}\` | ${required} | ${defaultValue} | ${prop.description} |`;
  });
  
  return [headers, separator, ...rows].join('\n');
}

/**
 * Creates a comparison table for before/after code
 */
export function formatComparison(before: string, after: string, language: string = 'javascript'): string {
  return `
**Before:**
\`\`\`${language}
${before.trim()}
\`\`\`

**After:**
\`\`\`${language}
${after.trim()}
\`\`\`
`;
}

/**
 * Formats accessibility information
 */
export function formatAccessibilityInfo(info: {
  wcagLevel: string;
  keyboardSupport: string[];
  screenReaderSupport: string;
  colorContrast: boolean;
  focusManagement: string;
}): string {
  return `
**WCAG Compliance:** ${info.wcagLevel}
**Keyboard Support:** ${info.keyboardSupport.join(', ')}
**Screen Reader:** ${info.screenReaderSupport}
**Color Contrast:** ${info.colorContrast ? '✓ Compliant' : '⚠ Needs attention'}
**Focus Management:** ${info.focusManagement}
`;
}

/**
 * Creates a warning or info callout
 */
export function formatCallout(message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info'): string {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅'
  };
  
  return `${icons[type]} **${type.toUpperCase()}:** ${message}`;
}

/**
 * Validates component name format
 */
export function isValidComponentName(name: string): boolean {
  // Carbon components start with 'carbon' or 'dotcom'
  return /^(carbon|dotcom)[A-Z][a-zA-Z]*$/.test(name);
}

/**
 * Normalizes component name to proper format
 */
export function normalizeComponentName(name: string): string {
  // Remove prefixes and normalize casing
  const cleaned = name.replace(/^(carbon|dotcom)[-_]?/i, '');
  const pascalCase = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  
  // Determine prefix based on context
  const prefix = name.toLowerCase().includes('dotcom') ? 'dotcom' : 'carbon';
  
  return `${prefix}${pascalCase}`;
}

/**
 * Extracts component category from name
 */
export function getComponentCategory(name: string): string {
  const categoryMap: Record<string, string> = {
    // Form components
    'Button': 'form',
    'TextInput': 'form',
    'TextArea': 'form',
    'Dropdown': 'form',
    'Checkbox': 'form',
    'Toggle': 'form',
    'FileUploader': 'form',
    
    // Navigation
    'Header': 'navigation',
    'Breadcrumb': 'navigation',
    'Tab': 'navigation',
    'Link': 'navigation',
    
    // Data display
    'DataTable': 'data',
    'Tile': 'data',
    'Card': 'data',
    'Accordion': 'data',
    
    // Layout
    'Grid': 'layout',
    'Column': 'layout',
    'Modal': 'layout',
    'Layer': 'layout',
    
    // Feedback
    'Notification': 'feedback',
    'Loading': 'feedback',
    'Tooltip': 'feedback'
  };
  
  for (const [component, category] of Object.entries(categoryMap)) {
    if (name.includes(component)) {
      return category;
    }
  }
  
  return 'core';
}