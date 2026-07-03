import { useState, useEffect } from 'react';
import { Clock, Heart } from 'lucide-react';

// Set target date - next anniversary or meeting (customize as needed)
const TARGET_DATE = new Date('2027-02-14T00:00:00');

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeRemaining(TARGET_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <section id="countdown" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Clock className="w-8 h-8 text-gold mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4">
          Until We Meet Again
        </h2>
        <p className="text-muted-foreground font-light mb-12">
          Every second brings us closer
        </p>

        <div className="flex justify-center gap-4 md:gap-8">
          {timeBlocks.map((block, index) => (
            <div key={index} className="glass rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] glow-gold">
              <div className="text-3xl md:text-5xl font-serif text-gold mb-1">
                {String(block.value).padStart(2, '0')}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {block.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
          <Heart className="w-4 h-4 text-soft-pink animate-heart-beat" />
          <span className="text-sm font-light">Counting every moment</span>
        </div>
      </div>
    </section>
  );
}
