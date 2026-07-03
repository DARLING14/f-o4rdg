import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Music, Volume2, VolumeX, Play, Pause, LogOut } from 'lucide-react';
import WelcomeSection from '@/components/sections/WelcomeSection';
import TimelineSection from '@/components/sections/TimelineSection';
import GallerySection from '@/components/sections/GallerySection';
import LoveLettersSection from '@/components/sections/LoveLettersSection';
import CountdownSection from '@/components/sections/CountdownSection';
import MemoryWallSection from '@/components/sections/MemoryWallSection';
import InteractiveHeartSection from '@/components/sections/InteractiveHeartSection';
import SurpriseSection from '@/components/sections/SurpriseSection';
import FooterSection from '@/components/sections/FooterSection';

// Royalty-free romantic piano music (CC0 / public domain)
const MUSIC_URL =
  'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3';

export default function MainPage() {
  const { logout } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('error', () => {
      console.warn('Audio failed to load');
      setAudioLoaded(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && audioLoaded) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audioLoaded]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
      setIsMuted(false);
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating navigation */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 transition-all duration-500 ${
          showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <a href="#welcome" className="text-xs text-muted-foreground hover:text-gold transition-colors">Welcome</a>
          <a href="#story" className="text-xs text-muted-foreground hover:text-gold transition-colors">Story</a>
          <a href="#gallery" className="text-xs text-muted-foreground hover:text-gold transition-colors">Gallery</a>
          <a href="#letters" className="text-xs text-muted-foreground hover:text-gold transition-colors">Letters</a>
          <a href="#countdown" className="text-xs text-muted-foreground hover:text-gold transition-colors">Countdown</a>
          <a href="#memories" className="text-xs text-muted-foreground hover:text-gold transition-colors">Memories</a>
          <button onClick={logout} className="text-xs text-muted-foreground hover:text-red-400 transition-colors ml-2">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Floating music player */}
      <div className="fixed bottom-6 right-6 z-50 glass rounded-full p-3 flex items-center gap-3 glow-gold">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-gold" />
          ) : (
            <Play className="w-3.5 h-3.5 text-gold ml-0.5" />
          )}
        </button>
        <button
          onClick={toggleMute}
          className="text-muted-foreground hover:text-gold transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 accent-yellow-500 cursor-pointer"
        />
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-gold animate-pulse' : 'text-gold/50'}`} />
      </div>

      {/* Sections */}
      <WelcomeSection />
      <TimelineSection />
      <GallerySection />
      <LoveLettersSection />
      <CountdownSection />
      <MemoryWallSection />
      <InteractiveHeartSection />
      <SurpriseSection />
      <FooterSection />
    </div>
  );
}
