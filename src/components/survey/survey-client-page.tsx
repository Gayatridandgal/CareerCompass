"use client";

import { useState } from "react";
import { SurveyForm } from "./survey-form";
import { CareerRecommendationCard } from "./career-recommendation-card";
import { submitSurveyAction } from "@/app/actions";
import type { SurveyFormValues } from "@/lib/types";
import type { RecommendCareersOutput } from "@/ai/flows/recommend-careers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart, Loader2, AlertTriangle, ThumbsUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SurveyClientPageState {
  recommendations: RecommendCareersOutput | null;
  isLoading: boolean;
  error: string | null;
}

export function SurveyClientPage() {
  const [state, setState] = useState<SurveyClientPageState>({
    recommendations: null,
    isLoading: false,
    error: null,
  });

  const handleFormSubmit = async (values: SurveyFormValues) => {
    setState({ recommendations: null, isLoading: true, error: null });
    const result = await submitSurveyAction(values);
    setState({
      recommendations: result.data,
      isLoading: false,
      error: result.error,
    });
  };

  return (
    <div className="space-y-12 flex flex-col items-center">
      <SurveyForm onSubmit={handleFormSubmit} isLoading={state.isLoading} />

      {state.isLoading && (
        <div className="w-full max-w-2xl space-y-6 mt-8">
          <Alert className="flex items-center">
            <Loader2 className="h-5 w-5 animate-spin mr-3 text-primary" />
            <div>
              <AlertTitle className="font-semibold">Generating Recommendations...</AlertTitle>
              <AlertDescription>Our AI is analyzing your profile. Please wait a moment.</AlertDescription>
            </div>
          </Alert>
          {[...Array(3)].map((_, i) => (
             <Card className="w-full shadow-lg" key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
                 <div className="space-y-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {state.error && !state.isLoading && (
        <Alert variant="destructive" className="w-full max-w-2xl mt-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.recommendations && !state.isLoading && !state.error && (
        <div className="w-full max-w-3xl mt-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <BarChart size={28} /> Your Recommended Career Paths
            </h2>
            <p className="text-muted-foreground mt-1">
              Based on your input, here are some career paths you might find fulfilling.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {state.recommendations.map((career, index) => (
              <CareerRecommendationCard key={index} career={career} />
            ))}
          </div>
           <Alert variant="default" className="bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
            <ThumbsUp className="h-5 w-5 text-green-500 dark:text-green-400" />
            <AlertTitle className="font-semibold">Explore Further!</AlertTitle>
            <AlertDescription>
              These are AI-generated suggestions. We encourage you to research these options further and speak with professionals in these fields.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
