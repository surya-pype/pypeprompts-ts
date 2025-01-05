export class PromptAnalyticsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PromptAnalyticsError';
  }
}
