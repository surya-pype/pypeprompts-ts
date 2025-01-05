export interface Attributes {
  [key: string]: any;
}

export interface Properties {
  prompt?: string;
  output?: string;
  processingTime?: number;
  functionName?: string;
  tags?: string[];
  attributes?: Attributes;
}

export interface AnalyticsItem {
  instanceId: string;
  promptId: string;
  name: string;
  processingTime: number;
  input: string;
  inputLength: number;
  output: string;
  outputLength: number;
  functionName: string;
  tags: string[];
  attributes?: Attributes;
}
