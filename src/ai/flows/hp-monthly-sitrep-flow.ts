'use server';
/**
 * @fileOverview This file provides an AI flow for generating a
 * Health Promotion (HP) Monthly Medical Situation Report (SitRep).
 *
 * - generateHpMonthlySitRep - A function that processes monthly data to generate the report.
 * - HP_MonthlySitRepInput - The input type for the generateHpMonthlySitRep function.
 * - HP_MonthlySitRepOutput - The return type for the generateHpMonthlySitRep function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Based on the user's JSON schema for data retrieval
const HP_MonthlySitRepInputSchema = z.object({
  report_metadata: z.object({
    title: z.string(),
    project: z.string(),
    department: z.string(),
    period: z.string(),
  }),
  data: z.object({
    in_facility_metrics: z.object({
      total_reached: z.number().describe("Target: 1912"),
      group_sessions_count: z.number(),
      reach_by_category: z.object({
        SW: z.number(),
        General_Adolescents: z.number(),
        LGBTIQ: z.number(),
        Drug_Users: z.number(),
      }),
    }),
    out_of_facility_metrics: z.object({
      total_reached_out_of_facility: z.number().describe("Total: 1685"),
      reach_by_method: z.object({
        DHP: z.number(),
        Face_to_face: z.number(),
        Outreach: z.number(),
        Group_sessions: z.number(),
      }),
    }),
    health_services_cascade: z.object({
      HIVST_offered: z.number(),
      HIVST_reactive: z.number(),
      HIVST_linkage_to_prevention: z.number(),
      Pregnancy_tests_total: z.number(),
      Pregnancy_tests_positive: z.number(),
      Referrals: z.object({
        ANC: z.number(),
        FP: z.number(),
      }),
    }),
    less_medicalized_model: z.object({
      condom_programming_reach: z.number().describe("Quantity: 520"),
      ECP_reach: z.number().describe("Quantity: 7"),
      menstrual_health_commodities_reach: z.number().describe("Quantity: 179"),
      commemorated_events_list: z.array(z.string()).describe("Events like Ward 7 and collaboration with GALZ."),
    }),
  }),
});
export type HP_MonthlySitRepInput = z.infer<typeof HP_MonthlySitRepInputSchema>;


const HP_MonthlySitRepOutputSchema = z.object({
    inFacility: z.object({
        totalReached: z.number(),
        target: z.number(),
        groupSessions: z.number(),
        reachSW: z.number(),
        reachDrugUsers: z.number(),
    }),
    outOfFacility: z.object({
        summary: z.string().describe("A summary of the 1685 adolescents reached."),
        reachMeansChartData: z.array(z.object({
            name: z.string(),
            value: z.number()
        })).describe("Data for a bar graph representing Reach Means (DHP, Face-to-Face, Dialogue/Group Sessions)."),
        linkageToCareTable: z.array(z.object({
            indicator: z.string(),
            result: z.string(),
        })).describe("A table for HIVST and Pregnancy test results and linkage.")
    }),
    lessMedicalizedModel: z.object({
        condomsDistributed: z.number(),
        ecpDistributed: z.number(),
        menstrualHygieneDistributed: z.number(),
        outreachEvents: z.array(z.string()),
    }),
    operationalSummary: z.object({
        challengesTable: z.array(z.object({
            challenge: z.string(),
            action: z.string(),
        })).describe("A table of challenges and actions taken."),
        nextMonthPlans: z.array(z.string()),
    }),
});
export type HP_MonthlySitRepOutput = z.infer<typeof HP_MonthlySitRepOutputSchema>;


export async function generateHpMonthlySitRep(
  input: HP_MonthlySitRepInput
): Promise<HP_MonthlySitRepOutput> {
  return hpMonthlySitRepFlow(input);
}

const sitrepPrompt = ai.definePrompt({
  name: 'hpMonthlySitRepPrompt',
  input: {schema: HP_MonthlySitRepInputSchema},
  output: {schema: HP_MonthlySitRepOutputSchema},
  prompt: `You are generating the {{{report_metadata.period}}} Health Promotion SitReport for the {{{report_metadata.project}}}.

CONTEXT:
- In-Facility Target Reach: 1912
- Out-of-Facility Total Reached: 1685

INPUT DATA:
- In-Facility Reached: {{{data.in_facility_metrics.total_reached}}}
- In-Facility Group Sessions: {{{data.in_facility_metrics.group_sessions_count}}}
- In-Facility SW Reached: {{{data.in_facility_metrics.reach_by_category.SW}}}
- In-Facility Drug Users Reached: {{{data.in_facility_metrics.reach_by_category.Drug_Users}}}

- Out-of-Facility Reach (DHP): {{{data.out_of_facility_metrics.reach_by_method.DHP}}}
- Out-of-Facility Reach (Face-to-face): {{{data.out_of_facility_metrics.reach_by_method.Face_to_face}}}
- Out-of-Facility Reach (Group Sessions): {{{data.out_of_facility_metrics.reach_by_method.Group_sessions}}}

- HIVST Offered: {{{data.health_services_cascade.HIVST_offered}}}
- HIVST Reactive: {{{data.health_services_cascade.HIVST_reactive}}}
- HIVST Linkage: {{{data.health_services_cascade.HIVST_linkage_to_prevention}}}
- Pregnancy Tests: {{{data.health_services_cascade.Pregnancy_tests_total}}}
- Pregnancy Tests Positive: {{{data.health_services_cascade.Pregnancy_tests_positive}}}
- ANC Referrals: {{{data.health_services_cascade.Referrals.ANC}}}
- FP Referrals: {{{data.health_services_cascade.Referrals.FP}}}

- Condoms: {{{data.less_medicalized_model.condom_programming_reach}}}
- ECP: {{{data.less_medicalized_model.ECP_reach}}}
- Menstrual Hygiene: {{{data.less_medicalized_model.menstrual_health_commodities_reach}}}
- Events: {{{data.less_medicalized_model.commemorated_events_list}}}

TASK: Generate the report content based on the following steps.

Step 1: In-Facility Data
- Set 'totalReached' to {{{data.in_facility_metrics.total_reached}}}.
- Set 'target' to 1912.
- Set 'groupSessions' to {{{data.in_facility_metrics.group_sessions_count}}}.
- Set 'reachSW' to {{{data.in_facility_metrics.reach_by_category.SW}}}.
- Set 'reachDrugUsers' to {{{data.in_facility_metrics.reach_by_category.Drug_Users}}}.

Step 2: Out-of-Facility Data
- Write a brief 'summary' about reaching 1685 adolescents.
- For 'reachMeansChartData', create an array of objects for a bar chart with names 'DHP', 'Face-to-Face', and 'Group Sessions', and their corresponding values.
- For 'linkageToCareTable', create an array of objects representing a table. It should include rows for: 'HIVST Offered', 'HIVST Reactive (%)', 'Linkage to Prevention Services', 'Pregnancy Tests Done', 'Pregnancy Tests Positive', 'Linkage to ANC', and 'Linkage to FP'. Calculate the reactive percentage.

Step 3: Less Medicalized Model
- Set 'condomsDistributed' to {{{data.less_medicalized_model.condom_programming_reach}}}.
- Set 'ecpDistributed' to {{{data.less_medicalized_model.ECP_reach}}}.
- Set 'menstrualHygieneDistributed' to {{{data.less_medicalized_model.menstrual_health_commodities_reach}}}.
- List the 'outreachEvents' from the input.

Step 4: Operational Summary
- For 'challengesTable', create an entry noting the 'shortage of female-inclusive activities' and the action 'Invest in sewing, netball, and Zumba'.
- For 'nextMonthPlans', list 'Ward 4 Maulana Outreach', 'Menstrual Hygiene in schools', and 'Hotspot Mapping'.

Generate a JSON response according to the output schema.
`,
});

const hpMonthlySitRepFlow = ai.defineFlow(
  {
    name: 'hpMonthlySitRepFlow',
    inputSchema: HP_MonthlySitRepInputSchema,
    outputSchema: HP_MonthlySitRepOutputSchema,
  },
  async (input) => {
    const {output} = await sitrepPrompt(input);
    if (!output) {
      throw new Error('Failed to generate insights from the report.');
    }
    return output;
  }
);
