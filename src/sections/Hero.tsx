import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Star, Heart } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const parallaxElements = heroRef.current.querySelectorAll('.parallax');
        parallaxElements.forEach((el, index) => {
          const speed = 0.5 + index * 0.1;
          (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-300" />

      {/* Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="parallax absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="parallax absolute top-40 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-float stagger-2" />
        <div className="parallax absolute bottom-40 left-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl animate-float stagger-3" />
        <div className="parallax absolute bottom-20 right-1/3 w-16 h-16 bg-green-300/20 rounded-full blur-lg animate-float stagger-1" />

        {/* Stars */}
        <Star className="parallax absolute top-32 left-1/4 w-6 h-6 text-yellow-300 animate-pulse-slow" />
        <Star className="parallax absolute top-48 right-1/3 w-4 h-4 text-yellow-300 animate-pulse-slow stagger-2" />
        <Star className="parallax absolute bottom-1/3 left-16 w-5 h-5 text-yellow-300 animate-pulse-slow stagger-1" />

        {/* Hearts */}
        <Heart className="parallax absolute top-1/4 right-16 w-5 h-5 text-pink-300 fill-pink-300 animate-bounce-slow" />
        <Heart className="parallax absolute bottom-1/3 right-1/4 w-4 h-4 text-pink-300 fill-pink-300 animate-bounce-slow stagger-2" />

        {/* Sparkles */}
        <Sparkles className="parallax absolute top-1/3 left-20 w-6 h-6 text-white/60 animate-spin-slow" />
        <Sparkles className="parallax absolute bottom-1/4 right-32 w-5 h-5 text-white/60 animate-spin-slow stagger-3" />

        {/* Wave Pattern Bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100C240 180 480 20 720 100C960 180 1200 20 1440 100V200H0V100Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M0 140C240 200 480 60 720 140C960 200 1200 60 1440 140V200H0V140Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                <span>Sejak Tahun {schoolInfo.established}</span>
              </div>

              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                Selamat Datang di{' '}
                <span className="text-yellow-300">{schoolInfo.shortName}</span>
              </h1>

              {/* Tagline */}
              <p
                className="text-xl sm:text-2xl text-white/90 font-semibold mb-2"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {schoolInfo.tagline}
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Tempat tumbuh kembang anak-anak Indonesia menjadi generasi yang{' '}
                <span className="font-semibold text-yellow-300">sehat</span>,{' '}
                <span className="font-semibold text-yellow-300">cerdas</span>, dan{' '}
                <span className="font-semibold text-yellow-300">ceria</span>. 
                Dengan pendidikan berkualitas dan lingkungan yang menyenangkan.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('#profile')}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sky-600 bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Kenali Kami
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('#classes')}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white border-2 border-white/50 transition-all duration-300 hover:bg-white/10 hover:border-white"
                >
                  Lihat Kelas
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-yellow-300">{schoolInfo.totalStudents}+</p>
                  <p className="text-sm text-white/80">Siswa Aktif</p>
                </div>
                <div className="w-px h-12 bg-white/30 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-yellow-300">{new Date().getFullYear() - schoolInfo.established}+</p>
                  <p className="text-sm text-white/80">Tahun Pengalaman</p>
                </div>
                <div className="w-px h-12 bg-white/30 hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-yellow-300">{schoolInfo.totalClasses}</p>
                  <p className="text-sm text-white/80">Kelas Tersedia</p>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/images/foto3.jpeg"
                    alt="PAUD Fajar Pagi"
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                </div>

                {/* Floating Card 1 */}
                <div className="absolute -top-6 -left-6 z-20 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-2xl">
                      🎓
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Wisuda</p>
                      <p className="text-sm text-slate-500">2024-2025</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -bottom-4 -right-4 z-20 bg-white rounded-2xl p-4 shadow-xl animate-float stagger-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-2xl">
                      🌟
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Berkualitas</p>
                      <p className="text-sm text-slate-500">Terakreditasi</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 right-10 w-16 h-16 bg-yellow-300 rounded-full opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-10 -left-8 w-12 h-12 bg-pink-300 rounded-full opacity-60 animate-pulse-slow stagger-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 sm:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.86,75.74,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
