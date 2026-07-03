import { useState } from 'react';
import { Heart, Star, Camera, MapPin, X, Calendar, Quote } from 'lucide-react';

const memories = [
  {
    type: 'message',
    content: 'You make my heart smile every day 💕',
    detail: 'Every single day, no matter what happens, you find a way to make my heart smile. Your love is the sunshine that brightens even my darkest days. I am so grateful for every moment we share together.',
    date: 'Always',
    color: 'from-pink-500/10 to-rose-500/10',
    accent: 'text-pink-400',
  },
  {
    type: 'photo',
    content: 'Our first video call',
    detail: 'I still remember the nervous excitement of that first video call. Seeing your face light up on my screen for the very first time — my heart skipped a beat. That moment changed everything.',
    date: 'The beginning',
    icon: Camera,
    color: 'from-gold/10 to-amber-500/10',
    accent: 'text-amber-400',
  },
  {
    type: 'message',
    content: 'I fall in love with you more each day ✨',
    detail: 'They say love fades with time, but with you it only grows stronger. Every new thing I learn about you, every shared laugh, every quiet moment — I fall deeper and deeper in love.',
    date: 'Every day',
    color: 'from-violet-500/10 to-purple-500/10',
    accent: 'text-violet-400',
  },
  {
    type: 'place',
    content: 'The café where we first met',
    detail: 'That little café with the warm lights and the smell of fresh coffee — it will always hold a special place in my heart. It\'s where our story began, where our eyes first met across the room.',
    date: 'Where it all started',
    icon: MapPin,
    color: 'from-blue-500/10 to-cyan-500/10',
    accent: 'text-cyan-400',
  },
  {
    type: 'message',
    content: 'You are my favorite notification 📱',
    detail: 'In a world full of noise and endless notifications, yours are the only ones that make my heart race. Every message from you is a little love letter that I carry with me all day.',
    date: 'All the time',
    color: 'from-rose-500/10 to-pink-500/10',
    accent: 'text-rose-400',
  },
  {
    type: 'memory',
    content: 'Late night calls that felt like minutes',
    detail: 'Those late night calls that stretched into the early hours of the morning — time always flew when I was talking to you. We could talk about everything and nothing, and it would still be the best part of my day.',
    date: '2 AM conversations',
    icon: Star,
    color: 'from-amber-500/10 to-yellow-500/10',
    accent: 'text-yellow-400',
  },
  {
    type: 'message',
    content: 'Home is wherever you are 🏠',
    detail: 'I used to think home was a place, but then I met you. Now I know that home isn\'t four walls and a roof — it\'s the feeling I get when I\'m with you. You are my home, no matter where we are.',
    date: 'Forever',
    color: 'from-emerald-500/10 to-green-500/10',
    accent: 'text-emerald-400',
  },
  {
    type: 'photo',
    content: 'The sunset we watched together',
    detail: 'That sunset painted the sky in shades of gold and pink, but all I could look at was you. The way the light caught your eyes, the way you smiled — that was the most beautiful thing I\'ve ever seen.',
    date: 'Golden hour',
    icon: Camera,
    color: 'from-orange-500/10 to-red-500/10',
    accent: 'text-orange-400',
  },
  {
    type: 'message',
    content: 'My favorite hello, my hardest goodbye 💫',
    detail: 'Every time we say hello, my world lights up. And every time we say goodbye, a piece of my heart goes with you. But I wouldn\'t trade a single moment — because loving you is worth every goodbye.',
    date: 'Always & forever',
    color: 'from-indigo-500/10 to-blue-500/10',
    accent: 'text-indigo-400',
  },
];

export default function MemoryWallSection() {
  const [openMemory, setOpenMemory] = useState<number | null>(null);

  return (
    <section id="memories" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gold mb-4">
          Memory Wall
        </h2>
        <p className="text-center text-muted-foreground font-light mb-16 max-w-md mx-auto">
          Little pieces of us, scattered like stars — tap to relive each one
        </p>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {memories.map((memory, index) => {
            const Icon = memory.icon || Heart;
            return (
              <div
                key={index}
                onClick={() => setOpenMemory(index)}
                className={`break-inside-avoid glass rounded-xl p-5 bg-gradient-to-br ${memory.color} hover:scale-[1.02] transition-all duration-300 cursor-pointer group hover:glow-gold`}
              >
                <Icon className={`w-5 h-5 ${memory.accent} mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-sm text-foreground/80 font-light leading-relaxed">
                  {memory.content}
                </p>
                <p className="text-xs text-muted-foreground/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to read more →
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Memory Detail Modal */}
      {openMemory !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpenMemory(null)}
          />
          <div className="relative glass-strong rounded-2xl p-8 max-w-lg w-full glow-gold animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setOpenMemory(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {memories.filter((_, i) => i === openMemory).map((memory, index) => {
              const Icon = memory.icon || Heart;
              return (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${memory.color} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${memory.accent}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${memory.accent} uppercase tracking-wider`}>
                        {memory.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {memory.date}
                      </div>
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-gold/30 mb-3" />

                  <h3 className="text-xl font-serif text-gold mb-4">
                    {memory.content}
                  </h3>

                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    {memory.detail}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <Heart className="w-4 h-4 text-soft-pink" />
                    <span className="text-xs text-soft-pink font-light italic">
                      With all my love
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
