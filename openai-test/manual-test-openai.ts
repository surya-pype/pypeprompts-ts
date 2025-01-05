import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { samples } from './test-data/samples';
import { OpenAITestResultsService } from './services/openai-test-results.service';

async function manualTestOpenAI() {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const projectToken = process.env.PROJECT_TOKEN;

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  if (!projectToken) {
    throw new Error('PROJECT_TOKEN is not set in environment variables');
  }

  const testResultsService = new OpenAITestResultsService(
    openaiApiKey,
    projectToken
  );

  const result = await testResultsService.classifyAllTests(samples);

  console.log('Analysis Result:', JSON.stringify(result, null, 2));

  return result;
}

// Run the test
(async () => {
  try {
    await manualTestOpenAI();
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
})();
