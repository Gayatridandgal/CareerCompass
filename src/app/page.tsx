import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl overflow-hidden">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src="https://picsum.photos/800/600"
            alt="Students planning their future"
            layout="fill"
            objectFit="cover"
            data-ai-hint="students future"
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-4xl font-bold text-primary">Welcome to CareerCompass</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Discover your ideal career path with our AI-powered guidance.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-foreground/80 mb-6">
            Unsure about your future career? CareerCompass analyzes your interests, skills, and academic preferences to suggest personalized career options, helping you navigate the path to a fulfilling profession.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
            <Link href="/survey">
              Find Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
