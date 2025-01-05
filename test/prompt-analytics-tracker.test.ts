import axios from 'axios';
import { PromptAnalyticsTracker } from '../src/prompt-analytics-tracker';
import { PromptAnalyticsError } from '../src/prompt-analytics-error';

jest.mock('axios');
const mockedAxios: any = axios as jest.Mocked<typeof axios>;

describe('PromptAnalyticsTracker', () => {
  const PROJECT_TOKEN = 'test_project_token';
  const DASHBOARD_URL = 'http://localhost:3000/api/analytics';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize tracker successfully', () => {
    const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);

    expect(tracker).toBeDefined();
    expect(tracker['projectToken']).toBe(PROJECT_TOKEN);
    expect(tracker['enabled']).toBe(true);
  });

  test('should throw error for empty project token', () => {
    expect(() => {
      new PromptAnalyticsTracker('');
    }).toThrow(PromptAnalyticsError);
  });

  test('should track analytics successfully', async () => {
    const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);

    const mockResponse = { status: 200, data: { success: true } };
    mockedAxios.mockResolvedValue(mockResponse);

    const properties = {
      prompt: 'Test prompt',
      output: 'Test output',
      processingTime: 0.5,
      functionName: 'Test Function',
      tags: ['test'],
      attributes: { test_key: 'test_value' },
    };

    const promptId = await tracker.track('test_workflow', properties);

    expect(promptId).toBeTruthy();
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'post',
        url: DASHBOARD_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PROJECT_TOKEN}`,
        },
        data: expect.objectContaining({
          name: 'test_workflow',
          input: properties.prompt,
          output: properties.output,
        }),
      })
    );
  });

  test('should handle tracking when disabled', async () => {
    const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, false);

    const properties = {
      prompt: 'Test prompt',
      output: 'Test output',
    };

    const result = await tracker.track('test_workflow', properties);

    expect(result).toBe('');
    expect(mockedAxios).not.toHaveBeenCalled();
  });

  test('should convert set attributes to arrays', async () => {
    const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);

    mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });

    const properties = {
      prompt: 'Test prompt',
      output: 'Test output',
      attributes: {
        setKey: new Set([1, 2, 3]),
        nestedObj: { innerSet: new Set(['a', 'b']) },
      },
    };

    await tracker.track('test_workflow', properties);

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          attributes: {
            setKey: [1, 2, 3],
            nestedObj: { innerSet: ['a', 'b'] },
          },
        }),
      })
    );
  });
});
