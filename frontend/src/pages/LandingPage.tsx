import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Logout button */}
      <button
        onClick={logout}
        className="absolute top-6 right-6 z-50 px-4 py-2 text-xs text-muted-foreground hover:text-gold border border-white/10 rounded-full glass transition-all duration-300 hover:border-primary/30"
      >
        Logout
      </button>

      {/* Star field */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-soft-pink opacity-15 animate-float"
            style={{
              top: Math.random() * 80 + 10 + '%',
              left: Math.random() * 80 + 10 + '%',
              animationDelay: Math.random() * 6 + 's',
              animationDuration: Math.random() * 5 + 5 + 's',
              fontSize: Math.random() * 24 + 14 + 'px',
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/30 animate-float"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              animationDuration: Math.random() * 6 + 6 + 's',
            }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[100px]" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Sparkle icon */}
        <div className="mb-6 flex justify-center">
          <Sparkles className="w-8 h-8 text-gold animate-pulse-glow" />
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-serif text-gold mb-6 tracking-tight">
          Our Story
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto mb-12 leading-relaxed">
          Distance means so little when someone means so much.
        </p>

        {/* Enter button */}
        <button
          onClick={() => navigate('/welcome')}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass glow-gold hover:bg-white/10 transition-all duration-500 transform hover:scale-105"
        >
          <Heart className="w-5 h-5 text-gold group-hover:animate-heart-beat" />
          <span className="text-gold font-medium tracking-wide">Enter</span>
          <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>
    </div>
  );
}
