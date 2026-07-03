import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function InteractiveHeartSection() {
  const [clicked, setClicked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = () => {
    setClicked(true);

    // Generate floating hearts
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -200 - 50,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 3000);

    // Reset clicked state
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <section className="py-24 px-6 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/2 to-transparent" />

      <div className="relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-gold mb-12">
          A Heart for You
        </h2>

        <div className="relative inline-block">
          {/* Floating hearts */}
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute top-1/2 left-1/2 animate-float-up pointer-events-none"
              style={{
                transform: `translate(${heart.x}px, ${heart.y}px)`,
              }}
            >
              <Heart className="w-6 h-6 text-soft-pink fill-soft-pink/50" />
            </div>
          ))}

          {/* Main heart */}
          <button
            onClick={handleClick}
            className="relative group"
          >
            <Heart
              className={`w-32 h-32 md:w-40 md:h-40 transition-all duration-300 ${
                clicked
                  ? 'text-soft-pink fill-soft-pink scale-110'
                  : 'text-soft-pink/60 hover:text-soft-pink hover:fill-soft-pink/30 hover:scale-105'
              }`}
            />
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
              clicked ? 'bg-pink-500/10 scale-150 opacity-0' : ''
            }`} />
          </button>
        </div>

        {/* Message */}
        <div
          className={`mt-8 transition-all duration-500 ${
            clicked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl font-serif text-soft-pink">
            I Love You <span className="text-red-400">❤️</span>
          </p>
        </div>

        <p className="mt-6 text-sm text-muted-foreground font-light">
          Click the heart
        </p>
      </div>
    </section>
  );
}
