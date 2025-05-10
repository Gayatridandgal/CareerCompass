"use server";

import { recommendCareers, type RecommendCareersInput, type RecommendCareersOutput } from "@/ai/flows/recommend-careers";

export async function submitSurveyAction(input: RecommendCareersInput): Promise<{ data: RecommendCareersOutput | null; error: string | null }> {
  try {
    // Validate input here if necessary, though react-hook-form + zod handles client-side
    const recommendations = await recommendCareers(input);
    if (!recommendations || recommendations.length === 0) {
      return { data: null, error: "No career recommendations could be generated based on your input. Try being more specific." };
    }
    return { data: recommendations, error: null };
  } catch (e) {
    console.error("Error recommending careers:", e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred while processing your request.";
    return { data: null, error: `Failed to get recommendations: ${errorMessage}` };
  }
}
