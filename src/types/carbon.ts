export interface CarbonComponent {
  name: string;
  category: 'core' | 'dotcom' | 'layout' | 'data' | 'navigation' | 'form' | 'feedback';
  description: string;
  properties: CarbonComponentProperty[];
  events: CarbonComponentEvent[];
  slots: CarbonComponentSlot[];
  examples: CarbonComponentExample[];
  accessibility: AccessibilityInfo;
  migration?: MigrationInfo;
}

export interface CarbonComponentProperty {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description: string;
  options?: string[];
}

export interface CarbonComponentEvent {
  name: string;
  description: string;
  payload?: any;
}

export interface CarbonComponentSlot {
  name: string;
  description: string;
  required: boolean;
}

export interface CarbonComponentExample {
  title: string;
  description: string;
  code: {
    html: string;
    javascript: string;
    css?: string;
  };
  preview?: string;
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA';
  keyboardSupport: string[];
  screenReaderSupport: string;
  colorContrast: boolean;
  focusManagement: string;
}

export interface MigrationInfo {
  from: string[];
  complexity: 'low' | 'medium' | 'high';
  steps: MigrationStep[];
  codeChanges: CodeChange[];
  commonIssues: string[];
}

export interface MigrationStep {
  step: number;
  title: string;
  description: string;
  code?: {
    before: string;
    after: string;
  };
}

export interface CodeChange {
  type: 'property' | 'event' | 'markup' | 'styling' | 'import';
  from: string;
  to: string;
  reason: string;
}

export interface ThemeConfiguration {
  name: string;
  description: string;
  cssVariables: CSSVariable[];
  setupSteps: string[];
  examples: ThemeExample[];
}

export interface CSSVariable {
  name: string;
  value: string;
  description: string;
  category: 'color' | 'spacing' | 'typography' | 'motion' | 'layout';
}

export interface ThemeExample {
  title: string;
  description: string;
  code: string;
}

export interface BestPractice {
  category: string;
  title: string;
  description: string;
  doExample?: string;
  dontExample?: string;
  reasoning: string;
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  causes: string[];
  solutions: Solution[];
  relatedComponents: string[];
}

export interface Solution {
  title: string;
  description: string;
  code?: string;
  steps: string[];
}

export interface PerformanceTip {
  category: 'rendering' | 'bundling' | 'accessibility' | 'network' | 'memory';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  implementation: string;
  codeExample?: string;
}

export interface DesignPattern {
  name: string;
  category: string;
  description: string;
  whenToUse: string;
  implementation: PatternImplementation;
  variations: PatternVariation[];
}

export interface PatternImplementation {
  html: string;
  javascript: string;
  css?: string;
  metadata: string;
}

export interface PatternVariation {
  name: string;
  description: string;
  changes: string[];
  code: PatternImplementation;
}