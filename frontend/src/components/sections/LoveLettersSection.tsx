import { useState } from 'react';
import { Mail, X } from 'lucide-react';

const letters = [
  {
    id: 1,
    title: 'My First Letter to You',
    preview: 'From the moment I met you...',
    content: 'From the moment I met you, my world changed in ways I never imagined possible. You brought color to my days and warmth to my nights. Every conversation with you feels like coming home, and every silence between us is comfortable and full of love. You are my favorite hello and my hardest goodbye.',
    date: 'With all my love',
  },
  {
    id: 2,
    title: 'On Distance',
    preview: 'The miles between us...',
    content: 'The miles between us are just numbers. They cannot measure the depth of what I feel for you. Every morning I wake up knowing that somewhere in this world, you exist, and that makes everything beautiful. Distance is temporary, but what we have is forever. I carry you in my heart wherever I go.',
    date: 'Always yours',
  },
  {
    id: 3,
    title: 'My Promise',
    preview: 'I promise you...',
    content: 'I promise you all the tomorrows I have. I promise to love you on your best days and hold you on your worst. I promise that no matter how far apart we are, my heart will always find its way to yours. You are my today and all of my tomorrows. This is my forever promise to you.',
    date: 'Forever and always',
  },
];

export default function LoveLettersSection() {
  const [openLetter, setOpenLetter] = useState<number | null>(null);

  return (
    <section id="letters" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/2 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gold mb-4">
          Love Letters
        </h2>
        <p className="text-center text-muted-foreground font-light mb-16 max-w-md mx-auto">
          Words from my heart to yours
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => setOpenLetter(letter.id)}
              className="glass rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02] hover:glow-pink"
            >
              <Mail className="w-8 h-8 text-soft-pink mb-4 group-hover:animate-pulse-glow" />
              <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-gold transition-colors">
                {letter.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light italic">
                {letter.preview}
              </p>
            </div>
          ))}
        </div>

        {/* Letter Modal */}
        {openLetter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpenLetter(null)} />
            <div className="relative glass-strong rounded-2xl p-8 max-w-lg w-full glow-pink animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setOpenLetter(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {letters.filter((l) => l.id === openLetter).map((letter) => (
                <div key={letter.id}>
                  <Mail className="w-10 h-10 text-soft-pink mb-4" />
                  <h3 className="text-2xl font-serif text-gold mb-4">{letter.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    {letter.content}
                  </p>
                  <p className="text-sm text-soft-pink italic font-serif">{letter.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
