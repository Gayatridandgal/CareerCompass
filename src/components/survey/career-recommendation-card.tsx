import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RecommendCareersOutput } from "@/ai/flows/recommend-careers";
import { Briefcase, CheckCircle, TrendingUp } from "lucide-react";

type CareerData = RecommendCareersOutput[0];

interface CareerRecommendationCardProps {
  career: CareerData;
}

export function CareerRecommendationCard({ career }: CareerRecommendationCardProps) {
  const fitScoreColor = career.fitScore > 75 ? "bg-green-500" : career.fitScore > 50 ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl text-primary">{career.careerName}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">{career.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              Fit Score:
            </h4>
            <span className={`font-bold text-sm ${career.fitScore > 75 ? "text-green-600" : career.fitScore > 50 ? "text-yellow-600" : "text-red-600"}`}>
              {career.fitScore}%
            </span>
          </div>
          <Progress value={career.fitScore} aria-label={`Fit score for ${career.careerName} is ${career.fitScore}%`} className="h-3 [&>div]:bg-accent" />
        </div>
        <div>
          <h4 className="text-sm font-semibold flex items-center gap-1 mb-1">
            <CheckCircle className="h-4 w-4 text-accent" />
            Strengths Alignment:
          </h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{career.strengthsAlignment}</p>
        </div>
      </CardContent>
    </Card>
  );
}
