import { useEffect, useRef, useState } from 'react';
import { X, Camera, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { activities } from '@/data/schoolData';

const categories = ['Semua', ...Array.from(new Set(activities.map((a) => a.category)))];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<typeof activities[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredActivities = selectedCategory === 'Semua'
    ? activities
    : activities.filter((a) => a.category === selectedCategory);

  const openLightbox = (activity: typeof activities[0], index: number) => {
    setSelectedImage(activity);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % filteredActivities.length
      : (currentImageIndex - 1 + filteredActivities.length) % filteredActivities.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredActivities[newIndex]);
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-slate-50 py-20 lg:py-28 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            <Camera className="w-4 h-4" />
            <span>Dokumentasi</span>
          </div>
          <h2 className="section-title text-slate-800">
            Galeri <span className="text-gradient-blue">Kegiatan</span>
          </h2>
          <p className="section-subtitle">
            Momen-momen berharga dan kegiatan seru anak-anak di PAUD Fajar Pagi 
            yang penuh warna dan keceriaan.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filteredActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onClick={() => openLightbox(activity, index)}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-block px-2 py-1 rounded-md bg-sky-500/80 text-white text-xs font-medium mb-2 w-fit">
                  {activity.category}
                </span>
                <h4 className="font-bold text-white text-sm line-clamp-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  {activity.title}
                </h4>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-slate-500 text-sm">
            Menampilkan {filteredActivities.length} dari {activities.length} kegiatan
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm"
            onClick={closeLightbox}
          />
          
          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-sm font-medium">
                  {selectedImage.category}
                </span>
                <span className="text-white/60 text-sm">
                  {currentImageIndex + 1} / {filteredActivities.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4">
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="max-w-4xl max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gradient-to-t from-slate-900 to-transparent">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {selectedImage.title}
              </h3>
              <p className="text-white/70 text-sm mb-3">{selectedImage.description}</p>
              <div className="flex items-center gap-4 text-white/50 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date().getFullYear()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  PAUD Fajar Pagi
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
