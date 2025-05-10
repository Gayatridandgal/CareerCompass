import { SurveyClientPage } from "@/components/survey/survey-client-page";

export const metadata = {
  title: "Career Survey | CareerCompass",
  description: "Tell us about yourself to get personalized career recommendations.",
};

export default function SurveyPage() {
  return (
    <div>
      <SurveyClientPage />
    </div>
  );
}
