import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { id: 1, alt: 'Memory 1', gradient: 'from-pink-500/20 to-purple-500/20' },
  { id: 2, alt: 'Memory 2', gradient: 'from-gold/20 to-orange-500/20' },
  { id: 3, alt: 'Memory 3', gradient: 'from-blue-500/20 to-cyan-500/20' },
  { id: 4, alt: 'Memory 4', gradient: 'from-rose-500/20 to-pink-500/20' },
  { id: 5, alt: 'Memory 5', gradient: 'from-amber-500/20 to-yellow-500/20' },
  { id: 6, alt: 'Memory 6', gradient: 'from-violet-500/20 to-indigo-500/20' },
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gold mb-4">
          Our Moments
        </h2>
        <p className="text-center text-muted-foreground font-light mb-16 max-w-md mx-auto">
          Every photo tells a story of us
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer glass"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} group-hover:opacity-80 transition-opacity duration-300`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity">♥</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-white/80">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-300">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="w-full max-w-2xl aspect-square mx-16 rounded-2xl overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${galleryImages[currentIndex].gradient} flex items-center justify-center`}>
                <span className="text-8xl opacity-40">♥</span>
              </div>
            </div>

            <button
              onClick={() => navigate(1)}
              className="absolute right-6 text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-6 text-center text-white/60 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
