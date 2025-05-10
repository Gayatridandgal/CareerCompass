import { z } from 'zod';

export const surveyFormSchema = z.object({
  interests: z.string().min(10, { message: "Please describe your interests in at least 10 characters." }),
  subjects: z.string().min(5, { message: "Please list your favorite subjects (at least 5 characters)." }),
  strengths: z.string().min(10, { message: "Please describe your strengths in at least 10 characters." }),
});

export type SurveyFormValues = z.infer<typeof surveyFormSchema>;
