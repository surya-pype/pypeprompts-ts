import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// openai-test/csv-test-openai.ts
import { CSVLoader } from './services/csv-loader.service';
import { OpenAITestResultsService } from './services/openai-test-results.service';

async function manualTestOpenAI() {

    // Load CSV data from Google Sheets
    // Data must look like this:
    // index | metricName | score | reason | direction | metricMean
    // 1     |'roadmapcrt'| 65.23 |'reason'| higher    | 85.12

  const csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRFP6rTwmqMT1eBgDEAOTDOlWUaFetHfR1zhrK0V397w1stMvsrfVJaDGWIxRePFJ8cnNO_ITJB38Q/pub?gid=1726924128&single=true&output=csv';

  // Explicit null check
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const projectToken = process.env.PROJECT_TOKEN;

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  if (!projectToken) {
    throw new Error('PROJECT_TOKEN is not set in environment variables');
  }

  try {
    const metricSamples = await CSVLoader.loadFromURL(csvUrl);

    const testResultsService = new OpenAITestResultsService(
      openaiApiKey,
      projectToken
    );

    const result = await testResultsService.classifyAllTests(metricSamples);

    console.log('Analysis Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run the test
(async () => {
  await manualTestOpenAI();
})();
