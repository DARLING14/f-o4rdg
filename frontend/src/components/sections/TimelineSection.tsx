import { useEffect, useRef, useState } from 'react';
import { Heart, Star, MessageCircle, Plane } from 'lucide-react';

const timelineEvents = [
  {
    date: 'The Beginning',
    title: 'The Day We First Met',
    description: 'A chance encounter that changed everything. From the first message, I knew you were special.',
    icon: Heart,
    color: 'text-soft-pink',
  },
  {
    date: 'First Conversations',
    title: 'Late Night Talks',
    description: 'Hours turned into minutes as we shared our dreams, fears, and everything in between.',
    icon: MessageCircle,
    color: 'text-gold',
  },
  {
    date: 'Growing Closer',
    title: 'When I Knew',
    description: 'The moment I realized you were more than just someone special — you were my person.',
    icon: Star,
    color: 'text-soft-pink',
  },
  {
    date: 'Our Future',
    title: 'Dreams Together',
    description: 'Every plan we make, every dream we share, brings us closer to forever.',
    icon: Plane,
    color: 'text-gold',
  },
];

export default function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="py-24 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gold mb-16">
          Our Story
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />

          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-index={index}
                className={`relative flex items-start mb-16 last:mb-0 transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-gold z-10" />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <Icon className={`w-4 h-4 ${event.color}`} />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-gold transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
