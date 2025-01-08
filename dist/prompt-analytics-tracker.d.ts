import { Properties } from './types';
export declare class PromptAnalyticsTracker {
    private instanceId;
    private projectToken;
    private dashboardUrl;
    private promptVersionUrl;
    private enabled;
    constructor(projectToken: string, enabled?: boolean, customDashboardUrl?: string);
    track(workflowName: string, properties: Properties): Promise<string>;
    private createAnalyticsItem;
    private convertSetsToArrays;
    private sendAnalytics;
}
