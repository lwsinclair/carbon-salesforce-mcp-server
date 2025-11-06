export interface ToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  [k: string]: unknown;
}

export interface ComponentDetailsArgs {
  componentName: string;
  includeExamples?: boolean;
  includeAccessibility?: boolean;
}

export interface ComponentExamplesArgs {
  componentName: string;
  exampleType?: 'basic' | 'advanced' | 'interactive' | 'all';
  framework?: 'lwc' | 'vanilla';
}

export interface MigrationGuideArgs {
  fromComponent: string;
  toComponent?: string;
  migrationComplexity?: 'low' | 'medium' | 'high' | 'all';
}

export interface ComponentMappingArgs {
  elementType: string;
  context?: 'form' | 'navigation' | 'data-display' | 'layout' | 'feedback';
}

export interface BestPracticesArgs {
  category?: 'implementation' | 'accessibility' | 'performance' | 'theming' | 'all';
  componentName?: string;
}

export interface ThemeSetupArgs {
  themeType?: 'light' | 'dark' | 'custom' | 'all';
  platform?: 'experience-cloud' | 'lightning-app' | 'community';
}

export interface AccessibilityGuideArgs {
  componentName?: string;
  wcagLevel?: 'A' | 'AA' | 'AAA';
  focus?: 'keyboard' | 'screen-reader' | 'color-contrast' | 'all';
}

export interface TroubleshootingArgs {
  issue?: string;
  componentName?: string;
  errorType?: 'styling' | 'functionality' | 'performance' | 'accessibility';
}

export interface PerformanceTipsArgs {
  category?: 'rendering' | 'bundling' | 'accessibility' | 'network' | 'memory' | 'all';
  priority?: 'low' | 'medium' | 'high';
}

export interface PatternLibraryArgs {
  patternType?: 'layout' | 'navigation' | 'form' | 'data-display' | 'interaction';
  complexity?: 'simple' | 'intermediate' | 'advanced';
}