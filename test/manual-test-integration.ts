//manual-test-integration.ts

import { PromptAnalyticsTracker } from '../src/prompt-analytics-tracker';
import { PromptAnalyticsError } from '../src/prompt-analytics-error';

async function manualIntegrationTest() {
  const PROJECT_TOKEN =
    'f073bd9f6a186298cb16ed968d88d24ede4a811ed4e7e29ec75f451cb3117c78';
  const DASHBOARD_URL = 'http://app.pypeai.com/api/analytics';

  const tracker = new PromptAnalyticsTracker(PROJECT_TOKEN, true, DASHBOARD_URL);

  const input_msg = `
    {https://storage.googleapis.com/data-scaling/without-rag-final-wireframe/input/Image%2012-without-rag-basic-prompt.jpg +

You are a critic UX Designer and Product Designer. Based on the image of a UI screen and your task is to analyze the screen image and give a primary purpose, user actions and info display about the UI screen. The information should include the primary purpose of the screen, user actions that can be performed on the screen, and specific information that should be displayed on the screen in a visual order.

You will get this from the user: Image of UI screen

Output Requirements:

Based on the above context, generate the following details about the given screen: Primary Purpose: What is the main purpose of this screen? User Actions: What actions should users be able to perform on this screen? (Write this in order to elements in screen) Information Display: What specific information should be displayed on this screen? (Write this in order with user actions)

You can have more than three User Actions and Information Display if required; Create a list by completely analysing the screen.

IMPORTANT: You can use exact phrases and text from the image screen to describe User Actions and Information Display but add them like an example, keep the description generalised to the explain what user can do on these type of screens. Example: Do not output "Tabs to switch between 'Work' and 'About' sections", instead you must output: "Tabs to switch between sections".

Provide the output in the following <JSON> format:

{ "primaryPurpose": "Brief description of the main purpose of the screen", "userActions": [ "Action 1", "Action 2", "Action 3" ], "informationDisplay": [ "Information 1", "Information 2", "Information 3" ] }

Example Context:

Example Input for a UI Image of Settings & Preferences screen of a Shopping app with image

Example Output :

{ "primaryPurpose": "Provide users an interface to manage their account and app settings within a shopping application.", "userActions": [ "Navigate back to the previous screen", "Navigate to different settings categories", "View and Modify Settings", "Log out of the app" ], "informationDisplay": [ "User profile details", "Payment settings", "Communication preferences", "In-store offer settings", "Login settings", "Legal information", "Log Out Option" ] }

Use the provided context and examples to generate a relevant and detailed response for the specified Image of the UI screen.}
`;

  const messages = [input_msg];

  const response_content = `
  {
"response": [
  {
    "component_type": "markdown",
    "data": "### Test Automation Plan Example\n\nIn this exercise, you will create a basic structure of a test automation plan using Python. Imagine you are working on a project where you need to automate the testing of a web application. Your task is to outline the key components of the test automation plan in code.\n\n**Key Components to Include:**\n1. **Objectives**: Define the goals of your test automation.\n2. **Scope**: Specify what will be automated and what will not.\n3. **Timeline**: Outline the schedule for the automation tasks.\n4. **Tools**: List the tools and technologies you will use.\n5. **Resources**: Identify the team members and their roles.\n\nUse the following template to get started:"
  },
  {
    "component_type": "code_editor",
    "url":"https://pypeai.com/",
    "data": {
      "question": "Create a basic structure of a test automation plan in Python. Include objectives, scope, timeline, tools, and resources.",
      "language": "python",
      "default": "class TestAutomationPlan:\n    def __init__(self):\n        self.objectives = []\n        self.scope = []\n        self.timeline = {}\n        self.tools = []\n        self.resources = {}\n\n    def add_objective(self, objective):\n        self.objectives.append(objective)\n\n    def add_scope(self, item):\n        self.scope.append(item)\n\n    def set_timeline(self, phase, duration):\n        self.timeline[phase] = duration\n\n    def add_tool(self, tool):\n        self.tools.append(tool)\n\n    def add_resource(self, role, person):\n        self.resources[role] = person\n\n# Example usage\nplan = TestAutomationPlan()\nplan.add_objective('Increase test coverage')\nplan.add_scope('Automate login tests')\nplan.set_timeline('Phase 1', '2 weeks')\nplan.add_tool('Selenium')\nplan.add_resource('QA Engineer', 'John Doe')\nprint(plan.objectives)\nprint(plan.scope)\nprint(plan.timeline)\nprint(plan.tools)\nprint(plan.resources)",
      "output": "['Increase test coverage']\n['Automate login tests']\n{'Phase 1': '2 weeks'}\n['Selenium']\n{'QA Engineer': 'John Doe'}"
    }
  },
  {
    "component_type": "markdown",
    "data": "📺 **Resource:** [Showcasing Projects in Selenium Automation Testing Interviews](https://www.youtube.com/watch?v=x9vAgJSq2O0)\n\n**Relevant Timestamps:**\n- 00:00 - Introduction\n- 02:15 - Importance of Understanding the Framework\n- 05:30 - Presenting Your Experience Effectively\n- 08:45 - Tools and Technologies\n\nThis video will help you understand how to present your test automation plan and experience effectively during interviews."
  }
]
}
  `;

  const workflow_name = 'preplaced';
  const properties = {
    prompt: JSON.stringify(messages),
    output: response_content,
    processingTime: 0.5,
    functionName: 'Slide Creation',
    tags: ['new'],
    attributes: {
      user_category_12: 'www.pypeai.com',
      experience_12: '0',
      goal: ['Graduated, www.pypeai.com'],
      targetCompanies: ['Consultation Firms'],
      targetDomains: ['Frontend Developer', 'Backend'],
    },
  };

  try {
    const id = await tracker.track(workflow_name, properties);
    console.log('Prompt Id:', id);
    // If no exception is raised, the test passes
    process.exit(0);
  } catch (e) {
    console.error(`Detailed error: ${e}`);
    process.exit(1);
  }
}

// Run the test
(async () => {
  try {
    await manualIntegrationTest();
  } catch (error) {
    console.error('Error in manual integration test:', error);
    process.exit(1);
  }
})();
