import OpenAI from 'openai';
import { PromptAnalyticsTracker } from '../../src/prompt-analytics-tracker';
import { createMetricAnalysisPrompt } from '../prompt/insightPrompt';


export class OpenAITestResultsService {
  private openai: OpenAI;
  private tracker: PromptAnalyticsTracker;

  constructor(apiKey: string, projectToken: string) {
    this.openai = new OpenAI({ apiKey });
    this.tracker = new PromptAnalyticsTracker(projectToken);
  }

  async classifyAllTests(inputData: any[]): Promise<any> {
    const prompt = createMetricAnalysisPrompt(inputData);
    
    // GPT model and parameters to use
    const GPTModel = 'gpt-4o-mini';
    const temperature = 0.01;
    
    const serviceName = 'insightsGenerator';
    const tags = [serviceName, 'gpt-4o-mini'];
    const custAttributes = {
      model: GPTModel,
      version: '1.1',
    };

    const startTime = Date.now();

    try {
      const response = await this.openai.chat.completions.create({
        model: GPTModel,
        temperature: temperature,
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: JSON.stringify(inputData) },
        ],
      });

      const processingTime = (Date.now() - startTime) / 1000;
      const responseContent: any = response.choices[0].message.content;
      const classification = JSON.parse(responseContent) as any;

      // Track the analytics
      await this.tracker.track(serviceName, {
        prompt: JSON.stringify(inputData),
        output: responseContent,
        processingTime,
        tags: tags,
        attributes: custAttributes,
      });

      return classification;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}
