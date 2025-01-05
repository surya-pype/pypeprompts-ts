export interface TestSample {
  index: number;
  metricName: string;
  score: number;
  reason: string;
  direction: string;
  metricMean: number;
}

export const samples: TestSample[] = [
  {
    index: 24,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 86.33275855015108,
    reason:
      'The output provides a relevant analogy related to the Indian context and addresses the slide description well. However, it does not fully adhere to the instruction of keeping the text under 100 words and lacks the expected format for a coding example.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 25,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 88.19757797596935,
    reason:
      'The output correctly provides a concise explanation of the useEffect Hook, matches the specified slide title and type, and follows the markdown format. It also uses an analogy relevant to the Indian context. However, it slightly exceeds the 100-word limit in the markdown data.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 28,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 91.66547809863171,
    reason:
      'The actual output contains a single `code_editor` component with a correctly structured `question`, matches the slide information with the correct `language`, has a proper `default` code skeleton, and the expected `output` aligns with the task requirements.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 29,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 86.7615398853883,
    reason:
      'The actual output contains a corresponding answer for the fill-in-the-blanks exercise as specified in the input. However, it does not explicitly mention the required component of type fill_in_the_blanks as per the special instructions, which slightly deviates from the expected format.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 32,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 85.47078760353418,
    reason:
      'The actual output includes a fill-in-the-blank question that corresponds to the input slide description. However, the output contains four correct options instead of the specified one correct option, which slightly deviates from the instructions.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 34,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 51.290111506956826,
    reason:
      "The actual output contains two MCQ components while the slide information specifies only one MCQ. Additionally, while both components are related to the general topic of versioning and deprecation, they do not align with the specific context of the 'Versioning and Deprecation Quiz' slide as outlined in the user's lesson agenda.",
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 36,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 92.77136905861121,
    reason:
      'The actual output contains a corresponding answer for the slide, matches the slide type and description, has no extra or missing answers, and follows the specified format including a single markdown component.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 37,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 92.02506387045227,
    reason:
      'The output contains a single markdown component with the correct theory content about the importance of A/B Testing in microservices, matching the input requirements without any extra or missing answers.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 38,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 84.89038422377334,
    reason:
      'The actual output covers the slide title and description effectively, but it contains 5 points instead of the specified maximum of 4 and does not strictly adhere to the 15-line limit.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 42,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 85.45487877299959,
    reason:
      'All blanks in the input have corresponding answers in the actualOutput, with the answers correctly matched to their respective blanks. There are no extra or missing answers, and the format aligns with the expected output format.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 51,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 92.80895507857593,
    reason:
      'The response contains a well-structured markdown component that aligns with the slide title and description. It uses an analogy relevant to the Indian context and maintains a concise format. However, while the content is within the word limit, it could have explicitly included a single question as per the instructions.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 53,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 88.91694158692151,
    reason:
      'The output correctly provides a concise overview of strategic communication in the context of technical debt, using an analogy relevant to the Indian audience, and adheres to the markdown format as specified.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 54,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 92.94464252249283,
    reason:
      'The actual output contains a well-structured markdown response that addresses the slide title and description accurately. It uses an analogy relevant to the Indian context and adheres to the instruction of keeping the content concise. However, it could have included a single question or provided a coding example, which would have improved adherence to all outlined criteria.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 61,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 90.3520704381488,
    reason:
      'The response contains the correct slide format as required, uses an analogy relevant to the Indian context, and provides a concise explanation with a coding example. However, it includes a longer markdown text than the specified limit of 100 words.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 62,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 87.76374454213982,
    reason:
      'All blanks in the input have corresponding answers in the actualOutput, which are correctly matched. There are no extra or missing answers, and the format aligns with the expected output format.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 63,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 90.68402418415798,
    reason:
      'The output correctly addresses the slide title and description, aligns with the expected format, and uses an analogy relevant to the Indian context, fulfilling all specified criteria.',
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
  {
    index: 64,
    metricName: 'Fill in the Blanks Answer Key Check',
    score: 91.05243218325164,
    reason:
      "The actual output contains a corresponding answer for the slide titled 'Common Error Handling Strategies' and it is correctly matched to the slide type 'Theory'. All formatting instructions are followed, including using a single markdown component, providing a concise example in JavaScript, and using relevant analogies for an Indian context.",
    direction: 'higher',
    metricMean: 93.08251856385664,
  },
];
