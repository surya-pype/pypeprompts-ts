export function createMetricAnalysisPrompt(inputData: any[]): string {
    const metricName = inputData[0].metricName;
    const direction = inputData[0].direction;
    
    return `
    You are an AI assistant analyzing qualitative metrics to identify key issues affecting scores for metric: ${metricName}
    Direction: ${direction} (higher scores better when "higher", lower scores better when "lower")

    Input data: ${JSON.stringify(inputData, null, 2)}

    Analysis steps:
    1. Skip entries where:
     - 'reason' field has missing data usually denoted by phrases like 'no input provided' or 'output is empty'
     - 'reason' field where reason is positive and does not indicate any issues

    2. Focus on items:
     - Below threshold for "higher" direction 
     - Above threshold for "lower" direction
     - Group by common root causes
     - Break down issues only when patterns are clear

    3. Generate insights:
     - Combine highly related issues into main categories
     - Break down categories only when distinct patterns emerge
     - Keep descriptions specific yet concise
     - Include counts matching uniqueIds list

    Output Format:
    {
      "uniqueIds": [analyzed indexes],
      "summary": "Concise summary with main issues. Break down only if clear separate patterns exist"
    }

    Rules:
    - Summary under 50 words
    - Prioritize combining related issues
    - Break down only for clear patterns
    - Focus on problems
    - Match counts to uniqueIds
    - Use exact keywords
    - Consider "however"/"but" clauses
    - Return only JSON
    `;


}
