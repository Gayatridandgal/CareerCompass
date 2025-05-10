'use server';

/**
 * @fileOverview Visualizes the fit between a student's strengths and recommended career paths.
 *
 * - visualizeCareerFit - A function that handles the visualization process.
 * - VisualizeCareerFitInput - The input type for the visualizeCareerFit function.
 * - VisualizeCareerFitOutput - The return type for the visualizeCareerFit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizeCareerFitInputSchema = z.object({
  studentStrengths: z
    .array(z.string())
    .describe('List of strengths identified for the student.'),
  careerPaths: z
    .array(z.string())
    .describe('List of recommended career paths.'),
  careerCharacteristics: z
    .record(z.string(), z.array(z.string()))
    .describe(
      'A record of career paths and their associated characteristics (strengths needed).'
    ),
});
export type VisualizeCareerFitInput = z.infer<
  typeof VisualizeCareerFitInputSchema
>;

const VisualizeCareerFitOutputSchema = z.object({
  visualizations: z
    .array(z.string())
    .describe(
      'A list of visualizations (textual descriptions) showing how student strengths align with each career path.'
    ),
});
export type VisualizeCareerFitOutput = z.infer<
  typeof VisualizeCareerFitOutputSchema
>;

export async function visualizeCareerFit(
  input: VisualizeCareerFitInput
): Promise<VisualizeCareerFitOutput> {
  return visualizeCareerFitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visualizeCareerFitPrompt',
  input: {schema: VisualizeCareerFitInputSchema},
  output: {schema: VisualizeCareerFitOutputSchema},
  prompt: `You are an expert career advisor. You are provided with a student's strengths and a list of recommended career paths.  You also have a list of career characteristics, mapping each career to the strengths that are needed for that career.

  Student Strengths: {{studentStrengths}}
  Career Paths: {{careerPaths}}
  Career Characteristics: {{careerCharacteristics}}

  For each career path, analyze how the student's strengths align with the career's characteristics, and produce a short textual visualization describing the fit.  Output these visualizations in a numbered list.
  `,
});

const visualizeCareerFitFlow = ai.defineFlow(
  {
    name: 'visualizeCareerFitFlow',
    inputSchema: VisualizeCareerFitInputSchema,
    outputSchema: VisualizeCareerFitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
