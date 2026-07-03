import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function WelcomeSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section id="welcome" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 4 + 2 + 's',
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Heart className="w-12 h-12 text-soft-pink mx-auto mb-6 animate-heart-beat" />
        <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-4">
          Welcome, My Love <span className="text-soft-pink">❤️</span>
        </h1>
        <p className="text-muted-foreground font-light text-lg max-w-md mx-auto">
          Every moment with you is a treasure I hold close to my heart.
        </p>
      </div>
    </section>
  );
}
