import { useState } from 'react';
import { Gift, Heart, Sparkles, X } from 'lucide-react';

export default function SurpriseSection() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number; color: string }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleOpen = () => {
    setOpened(true);

    // Generate confetti
    const colors = ['#FFD700', '#ec7096', '#ffffff', '#FFA500', '#ff6b9d', '#ffd700'];
    const newConfetti = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);

    // Generate sparkles
    const newSparkles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i + 100,
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }));
    setSparkles(newSparkles);

    // Clean up after animation
    setTimeout(() => {
      setConfetti([]);
      setSparkles([]);
    }, 4000);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-gold mb-12">
          A Surprise for You
        </h2>

        {!opened ? (
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass glow-gold hover:bg-white/10 transition-all duration-500 transform hover:scale-105"
          >
            <Gift className="w-6 h-6 text-gold group-hover:animate-pulse-glow" />
            <span className="text-gold font-medium text-lg">Open Your Surprise</span>
            <Sparkles className="w-5 h-5 text-gold/60" />
          </button>
        ) : (
          <div className="relative">
            {/* Confetti */}
            {confetti.map((c) => (
              <div
                key={c.id}
                className="absolute top-0 animate-confetti pointer-events-none"
                style={{
                  left: c.x + '%',
                  animationDelay: c.delay + 's',
                }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: c.color }}
                />
              </div>
            ))}

            {/* Sparkles */}
            {sparkles.map((s) => (
              <div
                key={s.id}
                className="absolute top-1/2 left-1/2 animate-sparkle pointer-events-none"
                style={{
                  transform: `translate(${s.x}px, ${s.y}px)`,
                  animationDelay: Math.random() * 1 + 's',
                }}
              >
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
            ))}

            {/* Surprise message */}
            <div className="glass-strong rounded-2xl p-8 glow-pink animate-in zoom-in-95 duration-500">
              <Heart className="w-12 h-12 text-soft-pink mx-auto mb-4 animate-heart-beat fill-soft-pink/30" />
              <h3 className="text-2xl font-serif text-gold mb-4">
                You Are My Everything
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                In a world full of temporary things, you are my forever. 
                Every day with you is a gift I never take for granted. 
                You are the reason I believe in love, and I will spend 
                every day making sure you know how special you are to me.
              </p>
              <p className="text-soft-pink font-serif text-lg italic">
                I love you more than words could ever say ❤️
              </p>

              <button
                onClick={() => setOpened(false)}
                className="mt-6 text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                Close & Open Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
