import axios from 'axios';
import { PromptAnalyticsTracker } from '../src/prompt-analytics-tracker';
import { PromptAnalyticsError } from '../src/prompt-analytics-error';
import { config } from '../src/config';

jest.mock('axios');
const mockedAxios: any = axios as jest.Mocked<typeof axios>;

describe('PromptAnalyticsTracker', () => {
  const PROJECT_TOKEN = 'test_project_token';
  const LOCALHOST_URL = 'http://localhost:3000/api/analytics';
  const PROD_URL = 'https://app.pypeai.com/api/analytics';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('should initialize tracker successfully with default settings', () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
  
      expect(tracker).toBeDefined();
      expect(tracker['projectToken']).toBe(PROJECT_TOKEN);
      expect(tracker['enabled']).toBe(true);
      expect(tracker['dashboardUrl']).toBe(config.DEFAULT_DASHBOARD_URL);
    });
  
    test('should initialize tracker with custom URL', () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, true, LOCALHOST_URL);
  
      expect(tracker['dashboardUrl']).toBe(LOCALHOST_URL);
    });
  
    test('should throw error for empty project token', () => {
      expect(() => {
        new PromptAnalyticsTracker('');
      }).toThrow(PromptAnalyticsError);
    });
  
    test('should initialize tracker in disabled state', () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, false);
  
      expect(tracker['enabled']).toBe(false);
    });
  });

  describe('URL Configuration', () => {
    test('should use default URL when no custom URL provided', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });

      await tracker.track('test_workflow', { prompt: 'test' });

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: config.DEFAULT_DASHBOARD_URL
        })
      );
    });

    test('should use custom localhost URL when provided', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, true, LOCALHOST_URL);
      mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });

      await tracker.track('test_workflow', { prompt: 'test' });

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: LOCALHOST_URL
        })
      );
    });

    test('should use custom production URL when provided', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, true, PROD_URL);
      mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });

      await tracker.track('test_workflow', { prompt: 'test' });

      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: PROD_URL
        })
      );
    });
  });

  describe('Track Method', () => {
    test('should track analytics successfully with minimal properties', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      const mockResponse = { status: 200, data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);
  
      const properties = {
        prompt: 'Test prompt',
        output: 'Test output'
      };
  
      const promptId = await tracker.track('test_workflow', properties);
  
      expect(promptId).toBeTruthy();
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post',
          url: config.DEFAULT_DASHBOARD_URL,
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

    test('should track analytics with all properties', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });
  
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
          data: expect.objectContaining({
            processingTime: properties.processingTime,
            functionName: properties.functionName,
            tags: properties.tags,
            attributes: properties.attributes,
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
  
    test('should throw error for missing workflow name', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
  
      await expect(tracker.track('', { prompt: 'test' }))
        .rejects
        .toThrow(PromptAnalyticsError);
    });
  });

  describe('Data Transformation', () => {
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
  
    test('should handle empty attributes', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      mockedAxios.mockResolvedValue({ status: 200, data: { success: true } });
  
      const properties = {
        prompt: 'Test prompt',
        output: 'Test output',
      };
  
      await tracker.track('test_workflow', properties);
  
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.not.objectContaining({
            attributes: expect.any(Object),
          }),
        })
      );
    });
  });

  describe('Error Handling', () => {
    test('should handle network errors', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      const networkError = new Error('Network Error');
      mockedAxios.mockRejectedValue(networkError);
  
      await expect(tracker.track('test_workflow', { prompt: 'test' }))
        .rejects
        .toThrow(PromptAnalyticsError);
    });
  
    test('should handle API errors', async () => {
      const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN);
      mockedAxios.mockRejectedValue({ 
        response: { 
          status: 400, 
          data: { error: 'Bad Request' } 
        } 
      });
  
      await expect(tracker.track('test_workflow', { prompt: 'test' }))
        .rejects
        .toThrow(PromptAnalyticsError);
    });
  });
});