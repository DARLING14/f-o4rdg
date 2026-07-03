import { Heart } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="py-16 px-6 text-center relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="relative z-10">
        <Heart className="w-6 h-6 text-soft-pink mx-auto mb-4 animate-heart-beat" />
        <p className="text-xl md:text-2xl font-serif text-gold/80 max-w-md mx-auto">
          Forever begins every day with you.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-8 h-px bg-primary/30" />
          <span className="text-xs text-muted-foreground/50">♥</span>
          <div className="w-8 h-px bg-primary/30" />
        </div>
      </div>
    </footer>
  );
}
