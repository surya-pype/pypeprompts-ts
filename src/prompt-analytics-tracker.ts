import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsItem, Properties } from './types';
import { config } from './config';
import { PromptAnalyticsError } from './prompt-analytics-error';

export class PromptAnalyticsTracker {
  private instanceId: string;
  private projectToken: string;
  private dashboardUrl: string;
  private promptVersionUrl: string;
  private enabled: boolean;

  constructor(projectToken: string, enabled: boolean = true, customDashboardUrl?: string) {
    if (!projectToken) {
      throw new PromptAnalyticsError('project_token is required');
    }

    this.instanceId = uuidv4();
    this.projectToken = projectToken;
    this.dashboardUrl = customDashboardUrl || config.DEFAULT_DASHBOARD_URL;
    this.promptVersionUrl = config.DEFAULT_PROMPT_VERSIONS_URL;
    this.enabled = enabled;
  }

  async track(workflowName: string, properties: Properties): Promise<string> {
    if (!this.enabled) {
      console.log('Analytics tracker is disabled. Skipping data submission.');
      return '';
    }

    try {
      const analyticsItem = this.createAnalyticsItem(workflowName, properties);
      await this.sendAnalytics(analyticsItem);
      return analyticsItem.promptId;
    } catch (error) {
      console.error(`Error in track method: ${error}`);
      throw new PromptAnalyticsError(`Failed to track analytics: ${error}`);
    }
  }

  private createAnalyticsItem(
    workflowName: string,
    properties: Properties
  ): AnalyticsItem {
    if (!workflowName) {
      throw new PromptAnalyticsError('workflow_name is required');
    }

    const prompt = properties.prompt || '';
    const output = properties.output || '';
    let attributes = properties.attributes;

    // Convert sets to arrays if needed
    if (attributes) {
      attributes = this.convertSetsToArrays(attributes);
    }

    return {
      instanceId: this.instanceId,
      promptId: uuidv4(),
      name: workflowName,
      processingTime: properties.processingTime || 0.0,
      input: prompt,
      inputLength: prompt.length,
      output: output,
      outputLength: output.length,
      functionName: properties.functionName || workflowName,
      tags: properties.tags || [],
      attributes,
    };
  }

  private convertSetsToArrays(obj: any): any {
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(this.convertSetsToArrays);
      }

      const newObj: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value instanceof Set) {
          newObj[key] = Array.from(value);
        } else {
          newObj[key] = this.convertSetsToArrays(value);
        }
      }
      return newObj;
    }
    return obj;
  }

  private async sendAnalytics(analytics: AnalyticsItem): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.projectToken}`,
    };

    try {
      const config: AxiosRequestConfig = {
        headers,
        method: 'post',
        url: this.dashboardUrl,
        data: analytics,
      };

      const response = await axios(config);
      console.log('Analytics data submitted successfully', response.data);
    } catch (error) {
      console.error('Failed to submit analytics data', error);
      throw new PromptAnalyticsError(
        `Failed to submit analytics data: ${error}`
      );
    }
  }

  // Additional methods can be added as needed
}
