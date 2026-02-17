'use server';
/**
 * @fileOverview This file provides an AI flow for community health mobilisers
 * to generate summaries and actionable insights from weekly performance reports.
 *
 * - getAiReportInsights - A function that processes weekly report data to generate insights.
 * - WeeklyReportInput - The input type for the getAiReportInsights function.
 * - WeeklyReportOutput - The return type for the getAiReportInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeeklyReportInputSchema = z.object({
  weeklyReportData: z
    .string()
    .describe('The raw text content of the weekly performance report.'),
  historicalContext: z
    .string()
    .optional()
    .describe(
      'Optional historical data or context from previous reports to aid in trend analysis.'
    ),
});
export type WeeklyReportInput = z.infer<typeof WeeklyReportInputSchema>;

const WeeklyReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the weekly performance report.'),
  keyTrends: z.array(z.string()).describe('Identified key trends in the report data.'),
  areasNeedingAttention: z
    .array(z.string())
    .describe('Specific areas highlighted in the report that require attention.'),
  actionableInsights: z
    .array(z.string())
    .describe('Actionable recommendations based on the report data and identified trends.'),
});
export type WeeklyReportOutput = z.infer<typeof WeeklyReportOutputSchema>;

export async function getAiReportInsights(
  input: WeeklyReportInput
): Promise<WeeklyReportOutput> {
  return communityMobiliserAiReportInsightsFlow(input);
}

const communityMobiliserAiReportInsightsPrompt = ai.definePrompt({
  name: 'communityMobiliserAiReportInsightsPrompt',
  input: {schema: WeeklyReportInputSchema},
  output: {schema: WeeklyReportOutputSchema},
  prompt: `You are an expert data analyst specializing in community health outreach performance reports.
Your task is to analyze the provided weekly performance report data and extract key information.

First, provide a concise summary of the entire report.
Then, identify and list any significant key trends observed in the data.
Next, pinpoint and list specific areas that clearly need attention based on the report's findings.
Finally, generate actionable insights and recommendations that a Community Health Mobiliser can use to make informed operational decisions and improve outcomes.

Weekly Performance Report Data:
"""
{{{weeklyReportData}}}
"""

{{#if historicalContext}}
Historical Context:
"""
{{{historicalContext}}}
"""
{{/if}}

Please ensure your response is structured exactly as per the specified JSON schema for summary, keyTrends, areasNeedingAttention, and actionableInsights.
`,
});

const communityMobiliserAiReportInsightsFlow = ai.defineFlow(
  {
    name: 'communityMobiliserAiReportInsightsFlow',
    inputSchema: WeeklyReportInputSchema,
    outputSchema: WeeklyReportOutputSchema,
  },
  async (input) => {
    const {output} = await communityMobiliserAiReportInsightsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate insights from the report.');
    }
    return output;
  }
);
