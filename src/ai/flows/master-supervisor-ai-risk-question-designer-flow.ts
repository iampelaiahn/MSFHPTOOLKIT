'use server';
/**
 * @fileOverview This file implements a Genkit flow that helps Master Supervisors design custom risk assessment questions
 * and generate corresponding logical formulas based on a natural language description of a risk factor.
 *
 * - masterSupervisorAiRiskQuestionDesigner - A function that handles the AI-powered question and formula generation.
 * - MasterSupervisorAiRiskQuestionDesignerInput - The input type for the function.
 * - MasterSupervisorAiRiskQuestionDesignerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MasterSupervisorAiRiskQuestionDesignerInputSchema = z
  .string()
  .describe('A natural language description of the risk factor.');
export type MasterSupervisorAiRiskQuestionDesignerInput = z.infer<
  typeof MasterSupervisorAiRiskQuestionDesignerInputSchema
>;

const MasterSupervisorAiRiskQuestionDesignerOutputSchema = z.object({
  question: z
    .string()
    .describe('The generated concise risk assessment question.'),
  formula: z
    .string()
    .describe('The generated Excel-like logical formula for the risk assessment.'),
});
export type MasterSupervisorAiRiskQuestionDesignerOutput = z.infer<
  typeof MasterSupervisorAiRiskQuestionDesignerOutputSchema
>;

export async function masterSupervisorAiRiskQuestionDesigner(
  input: MasterSupervisorAiRiskQuestionDesignerInput
): Promise<MasterSupervisorAiRiskQuestionDesignerOutput> {
  return masterSupervisorAiRiskQuestionDesignerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'masterSupervisorAiRiskQuestionDesignerPrompt',
  input: {schema: MasterSupervisorAiRiskQuestionDesignerInputSchema},
  output: {schema: MasterSupervisorAiRiskQuestionDesignerOutputSchema},
  prompt: `You are an AI assistant designed to help Master Supervisors create custom risk assessment questions and their corresponding logical formulas. The formulas should be in an Excel-like syntax, suitable for a dynamic form builder, using clear and descriptive variable names.

Given a natural language description of a risk factor, generate a concise risk assessment question and an Excel-like logical formula to assess this risk. The formula should output a boolean (TRUE/FALSE) based on the risk condition.

Example:
Description: 'Risk factor if a person consumes alcohol more than 3 times a week.'
Question: 'How many times per week do you consume alcohol?'
Formula: 'IF(AlcoholConsumptionPerWeek > 3, TRUE, FALSE)'

Example:
Description: 'Risk if the client is under 18 years old and consent was not obtained.'
Question: 'Please confirm the client\'s age and if consent was obtained.'
Formula: 'IF(AND(Age < 18, ConsentObtained = FALSE), TRUE, FALSE)'

Example:
Description: 'Risk factor if BMI is over 25.'
Question: 'What is the client\'s Body Mass Index (BMI)?'
Formula: 'IF(BMI > 25, TRUE, FALSE)'

Description: '{{{description}}}'
`,
});

const masterSupervisorAiRiskQuestionDesignerFlow = ai.defineFlow(
  {
    name: 'masterSupervisorAiRiskQuestionDesignerFlow',
    inputSchema: MasterSupervisorAiRiskQuestionDesignerInputSchema,
    outputSchema: MasterSupervisorAiRiskQuestionDesignerOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
