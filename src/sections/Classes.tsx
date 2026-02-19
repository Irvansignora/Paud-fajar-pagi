import { useEffect, useRef, useState } from 'react';
import { Check, Users, Calendar, Clock, BookOpen } from 'lucide-react';
import { classes } from '@/data/schoolData';

const colorMap: Record<string, { bg: string; border: string; icon: string; button: string }> = {
  blue: {
    bg: 'from-sky-500 to-sky-400',
    border: 'border-sky-200',
    icon: 'bg-sky-100 text-sky-600',
    button: 'bg-sky-500 hover:bg-sky-600',
  },
  yellow: {
    bg: 'from-yellow-500 to-yellow-400',
    border: 'border-yellow-200',
    icon: 'bg-yellow-100 text-yellow-600',
    button: 'bg-yellow-500 hover:bg-yellow-600',
  },
  green: {
    bg: 'from-green-500 to-green-400',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    button: 'bg-green-500 hover:bg-green-600',
  },
  pink: {
    bg: 'from-pink-500 to-pink-400',
    border: 'border-pink-200',
    icon: 'bg-pink-100 text-pink-600',
    button: 'bg-pink-500 hover:bg-pink-600',
  },
  purple: {
    bg: 'from-purple-500 to-purple-400',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    button: 'bg-purple-500 hover:bg-purple-600',
  },
  orange: {
    bg: 'from-orange-500 to-orange-400',
    border: 'border-orange-200',
    icon: 'bg-orange-100 text-orange-600',
    button: 'bg-orange-500 hover:bg-orange-600',
  },
};

export default function Classes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="classes" ref={sectionRef} className="relative bg-slate-50 py-20 lg:py-28 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute top-40 left-10 w-20 h-20 bg-sky-200 rounded-full opacity-30 blur-xl" />
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-30 blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-20 blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Program Kelas</span>
          </div>
          <h2 className="section-title text-slate-800">
            Pilihan <span className="text-gradient-blue">Kelas</span> Kami
          </h2>
          <p className="section-subtitle">
            Kami menyediakan dua kelas yang disesuaikan dengan usia dan perkembangan anak, 
            dengan metode pembelajaran yang menyenangkan dan efektif.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {classes.map((cls, index) => {
            const colors = colorMap[cls.color] || colorMap.blue;
            return (
              <div
                key={cls.name}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Header */}
                <div className={`relative p-8 bg-gradient-to-br ${colors.bg}`}>
                  <div className="absolute top-4 right-4 text-6xl opacity-20">
                    {cls.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                      <Users className="w-4 h-4" />
                      <span>Usia {cls.ageRange}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {cls.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      Program pembelajaran untuk anak usia {cls.ageRange}
                    </p>
                  </div>

                  {/* Wave Bottom */}
                  <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 400 50"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 50V20C100 50 150 0 200 20C250 40 300 50 400 20V50H0Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="p-8 pt-4">
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {cls.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <p className="font-semibold text-slate-800 mb-3">Materi Pembelajaran:</p>
                    {cls.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${colors.icon}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.icon}`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Hari</p>
                        <p className="font-semibold text-slate-800 text-sm">Senin - Jumat</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.icon}`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Waktu</p>
                        <p className="font-semibold text-slate-800 text-sm">07.30 - 10.00</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg ${colors.button}`}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center text-3xl">
              🎁
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-slate-800 text-lg">Gratis Pendaftaran!</h4>
              <p className="text-slate-600 text-sm">
                Dapatkan potongan biaya pendaftaran untuk pendaftaran awal tahun ajaran baru.
              </p>
            </div>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-400 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Info Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
