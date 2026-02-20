'use server';
/**
 * @fileOverview An AI assistant that generates culturally sensitive and personalized health education talking points or interactive questions for Community-Based Microplanners.
 *
 * - generateHealthEducationContent - A function that handles the generation process.
 * - GenerateHealthEducationInput - The input type for the generateHealthEducationContent function.
 * - GenerateHealthEducationOutput - The return type for the generateHealthEducationContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHealthEducationInputSchema = z.object({
  riskProfile: z
    .string()
    .describe(
      `The risk profile of the Key Population member, e.g., "high risk due to substance use and multiple partners."`
    ),
  needs: z
    .string()
    .describe(
      `Specific health education needs of the Key Population member, e.g., "condom negotiation skills, STI prevention, mental health support."`
    ),
  kpDemographics: z
    .string()
    .describe(
      `Demographic information for cultural sensitivity, e.g., "25-year-old male, identifies as LGBTQ+, speaks Swahili, lives in an urban setting."`
    ),
});
export type GenerateHealthEducationInput = z.infer<
  typeof GenerateHealthEducationInputSchema
>;

const GenerateHealthEducationOutputSchema = z.object({
  educationPoints: z
    .array(z.string())
    .describe(
      `An array of culturally sensitive and personalized health education talking points or interactive questions.`
    ),
});
export type GenerateHealthEducationOutput = z.infer<
  typeof GenerateHealthEducationOutputSchema
>;

export async function generateHealthEducationContent(
  input: GenerateHealthEducationInput
): Promise<GenerateHealthEducationOutput> {
  return generateHealthEducationContentFlow(input);
}

const healthEducationPrompt = ai.definePrompt({
  name: 'healthEducationPrompt',
  input: {schema: GenerateHealthEducationInputSchema},
  output: {schema: GenerateHealthEducationOutputSchema},
  prompt: `You are an AI assistant specialized in generating culturally sensitive and personalized health education content for Key Population members.
Your goal is to provide talking points or interactive questions that a Community-Based Microplanner can use to deliver effective and engaging health education sessions in the field.

Consider the following information about the Key Population member:
Demographics: {{{kpDemographics}}}
Risk Profile: {{{riskProfile}}}
Specific Needs: {{{needs}}}

Generate a list of at least 5 to 7 talking points or interactive questions. Each point should be:
- Culturally sensitive to the provided demographics.
- Personalized to their risk profile and specific needs.
- Easy to understand and engaging for a field session.
- Focused on practical advice and actionable steps.

Your response should be a JSON object with a single key 'educationPoints' which is an array of strings, where each string is a talking point or interactive question.`,
});

const generateHealthEducationContentFlow = ai.defineFlow(
  {
    name: 'generateHealthEducationContentFlow',
    inputSchema: GenerateHealthEducationInputSchema,
    outputSchema: GenerateHealthEducationOutputSchema,
  },
  async (input) => {
    const {output} = await healthEducationPrompt(input);
    return output!;
  }
);
