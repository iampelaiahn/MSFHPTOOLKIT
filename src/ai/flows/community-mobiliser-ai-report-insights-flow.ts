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
  communityData: z
    .object({
      peopleTested: z
        .number()
        .describe('Number of people tested by Community Microplanners.'),
      hivstKitsDistributed: z
        .number()
        .describe(
          'Number of HIVST kits distributed by Community Microplanners.'
        ),
      referralsMade: z
        .number()
        .describe('Number of referrals made by Community Microplanners.'),
    })
    .describe('Data from Community Microplanner activities.'),
  facilityData: z
    .object({
      referralsReconciled: z
        .number()
        .describe('Number of referrals reconciled at the facility.'),
    })
    .describe('Data from Facility Microplanner activities.'),
  inventoryData: z
    .object({
      hivstKitsDispensed: z
        .number()
        .describe(
          'Total number of HIVST kits dispensed from inventory to microplanners.'
        ),
    })
    .describe('Data from the inventory system.'),
  geospatialData: z
    .object({
      hotspotCoverage: z
        .string()
        .describe('The percentage of hotspot coverage, e.g., "88%".'),
    })
    .describe('Geospatial data.'),
});
export type WeeklyReportInput = z.infer<typeof WeeklyReportInputSchema>;

const WeeklyReportOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, data-driven summary of the weekly performance.'
    ),
  dataDiscrepancies: z
    .array(z.string())
    .describe(
      'A list of any identified data mismatches or discrepancies that require investigation.'
    ),
  keyMetrics: z
    .array(
      z.object({
        metric: z.string().describe('The name of the metric.'),
        value: z.string().describe('The value of the metric.'),
        insight: z
          .string()
          .optional()
          .describe('A brief insight or trend related to the metric.'),
      })
    )
    .describe('A list of key performance metrics.'),
  actionableInsights: z
    .array(z.string())
    .describe(
      'A list of actionable recommendations to improve performance based on the analysis.'
    ),
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
  prompt: `You are an expert data analyst for a community health organization.
Your task is to analyze the provided weekly data from different sources to generate an integrated performance report.

**Input Data:**
- People Tested (Community): {{{communityData.peopleTested}}}
- HIVST Kits Distributed (Community): {{{communityData.hivstKitsDistributed}}}
- Referrals Made (Community): {{{communityData.referralsMade}}}
- Referrals Reconciled (Facility): {{{facilityData.referralsReconciled}}}
- HIVST Kits Dispensed (Inventory): {{{inventoryData.hivstKitsDispensed}}}
- Hotspot Coverage: {{{geospatialData.hotspotCoverage}}}

**Analysis Steps:**
1.  **Cross-Check for Discrepancies:**
    *   Compare 'People Tested (Community)' with 'HIVST Kits Dispensed (Inventory)'. If they are not equal, add a detailed message to the \`dataDiscrepancies\` array explaining the mismatch (e.g., "Mismatch found: 200 people reported tested, but 215 HIVST kits were dispensed from inventory.").
    *   Calculate the linkage rate: (Referrals Reconciled / Referrals Made).

2.  **Synthesize Key Metrics:**
    *   Populate the \`keyMetrics\` array with the provided data points.
    *   Also include a calculated "Linkage Rate" metric, formatted as a percentage. For the value, use the format "X / Y (Z%)".

3.  **Generate Summary & Insights:**
    *   Write a concise \`summary\` of the week's performance, highlighting both achievements and challenges based on all the data.
    *   Based on all the data, generate a list of 2-3 concrete \`actionableInsights\`. If the linkage rate is below 75%, one insight must be about improving it. If there's a kit discrepancy, an insight must be about investigating it.

Generate a JSON response according to the output schema. Ensure all fields in the output schema are populated.`,
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
