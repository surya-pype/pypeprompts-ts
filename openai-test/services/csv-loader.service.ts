// openai-test/services/csv-loader.service.ts
import axios from 'axios';
import Papa from 'papaparse';

export interface MetricSample {
  index: number;
  metricName: string;
  score: number;
  reason: string;
  direction: string;
  metricMean: number;
}

export class CSVLoader {
  static async loadFromURL(csvUrl: string): Promise<MetricSample[]> {
    try {
      // Fetch the CSV content using axios
      const response = await axios.get(csvUrl);

      // Parse the CSV using Papaparse
      const results = Papa.parse(response.data, {
        header: true,
        dynamicTyping: true,
      });

      // Transform data to match MetricSample interface
      return (results.data as any[]).map((row, index) => ({
        index: index + 1,
        metricName: row['metricName'] || 'Unknown Metric',
        score: row['score'] || 0,
        reason: row['reason'] || '',
        direction: row['direction'] || 'higher',
        metricMean: this.calculateMean(results.data),
      }));
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }

  private static calculateMean(data: any[]): number {
    const scores = data
      .map((row) => row.score)
      .filter((score) => typeof score === 'number');

    return scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;
  }
}
