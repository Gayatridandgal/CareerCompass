import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Compass size={28} />
          <h1 className="text-2xl font-bold">CareerCompass</h1>
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/survey">Take Survey</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
