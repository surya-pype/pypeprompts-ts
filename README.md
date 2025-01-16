# Prompt Analytics Tracker

A lightweight analytics tracker specifically designed for monitoring and analyzing AI model prompts and responses.

## Getting Started

### Get Your Token

1. Visit [app.pypeai.com](https://app.pypeai.com)
2. Create an account or sign in
3. Create a new project
4. Click on "Start Tracking" to get your project token
5. Copy your tracker token

### Installation

```bash
npm install pypeprompts-ts
```

## Quick Start

```javascript
import { PromptAnalyticsTracker } from 'pypeprompts-ts';

// Initialize the tracker with your token
const tracker = new PromptAnalyticsTracker('YOUR_TRACKER_TOKEN');

// Basic tracking
tracker.track('my-project', {
  prompt: 'What is the weather like?',
  output: 'The weather is sunny'
});
```

## Advanced Usage

### Tracking with Tags and Attributes

```javascript
const tracker = new PromptAnalyticsTracker('YOUR_TRACKER_TOKEN');

// Define tags for better categorization
const tags = ['gpt-4', 'weather-app'];

// Define additional attributes
const attributes = {
  model: 'gpt-4',
  createdAt: Date.now(),
  range: 'daily',
  metricName: 'weather-queries'
};

// Track with all parameters
tracker.track('weather-project', {
  prompt: JSON.stringify(yourPromptObject),
  output: JSON.stringify(modelResponse),
  tags,
  attributes
});
```

## API Reference

### PromptAnalyticsTracker

#### Constructor

```javascript
const tracker = new PromptAnalyticsTracker(token)
```

- `token` (string, required): Your analytics tracker authentication token

#### Methods

##### track(projectName, options)

Records a prompt and its corresponding output along with metadata.

Parameters:
- `projectName` (string, required): Name of your project
- `options` (object, required):
  - `prompt` (string, required): The prompt sent to the model
  - `output` (string, required): The model's response
  - `tags` (array, optional): Array of strings for categorizing the tracking event
  - `attributes` (object, optional): Additional metadata about the tracking event
    - `model` (string, optional): The model identifier
    - `createdAt` (number, optional): Timestamp of the event
    - `range` (string, optional): Time range identifier
    - `metricName` (string, optional): Name of the metric being tracked

## Error Handling

The tracker will throw errors in the following cases:
- Invalid token
- Missing required parameters
- Network connectivity issues

```javascript
try {
  await tracker.track('project', {...});
} catch (error) {
  console.error('Tracking failed:', error.message);
}
```

## Best Practices

1. Always stringify complex prompt and output objects before tracking
2. Use consistent project names and tags for better analytics
3. Include relevant attributes for detailed analysis
4. Implement proper error handling

## Legal

© Pype AI. All rights reserved.

This package is provided as a client library to connect to Pype AI's analytics service. Usage of this package is subject to Pype AI's terms of service. For more information, visit [app.pypeai.com](https://app.pypeai.com).