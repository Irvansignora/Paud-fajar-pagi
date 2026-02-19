import { useEffect, useRef, useState } from 'react';
import { Target, Eye, BookOpen, Award, MapPin } from 'lucide-react';
import { schoolInfo, features, stats } from '@/data/schoolData';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeOut * end));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Profile() {
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
    <section id="profile" ref={sectionRef} className="relative bg-white py-20 lg:py-28">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Tentang Kami</span>
          </div>
          <h2 className="section-title text-slate-800">
            Profil <span className="text-gradient-blue">{schoolInfo.shortName}</span>
          </h2>
          <p className="section-subtitle">
            Mengenal lebih dekat sekolah PAUD yang berkomitmen mencetak generasi 
            Indonesia yang sehat, cerdas, dan ceria sejak tahun {schoolInfo.established}.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Image */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/foto6.jpeg"
                  alt="PAUD Fajar Pagi"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Terakreditasi</p>
                    <p className="text-sm text-slate-500">Kualitas Terjamin</p>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full opacity-30 blur-xl" />
            </div>
          </div>

          {/* Right - Content */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Pendidikan Anak Usia Dini Berkualitas
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {schoolInfo.shortName} adalah lembaga pendidikan anak usia dini yang berdiri sejak tahun {schoolInfo.established}. 
              Kami berkomitmen untuk memberikan pendidikan terbaik bagi anak-anak Indonesia dengan pendekatan 
              pembelajaran yang menyenangkan dan sesuai dengan perkembangan anak.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Dengan visi menciptakan generasi yang <strong className="text-sky-600">sehat</strong>,{' '}
              <strong className="text-sky-600">cerdas</strong>, dan <strong className="text-sky-600">ceria</strong>, 
              kami terus berinovasi dalam metode pembelajaran untuk memastikan setiap anak mendapatkan 
              fondasi pendidikan yang kuat sebelum memasuki jenjang sekolah dasar.
            </p>

            {/* Vision & Mission */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Visi</h4>
                  <p className="text-sm text-slate-600">
                    Menjadi lembaga pendidikan anak usia dini yang unggul dalam mencetak generasi 
                    sehat, cerdas, dan ceria berlandaskan iman dan taqwa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-yellow-50 hover:bg-yellow-100 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Misi</h4>
                  <p className="text-sm text-slate-600">
                    1. Memberikan pendidikan berkualitas sesuai kurikulum PAUD nasional<br />
                    2. Mengembangkan potensi anak secara optimal melalui bermain<br />
                    3. Membentuk karakter dan akhlak mulia sejak dini<br />
                    4. Melibatkan orang tua dalam proses pendidikan anak
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-3xl bg-white border-2 border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 gradient-${feature.color}`}>
                {feature.icon}
              </div>
              <h4 className="font-bold text-slate-800 mb-2 text-lg">{feature.title}</h4>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400" />
          <div className="relative p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl lg:text-5xl mb-2">{stat.icon}</div>
                  <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.label === 'Tahun Berdiri' ? (
                      stat.value
                    ) : (
                      <Counter end={parseInt(stat.value)} />
                    )}
                  </p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700">
            <MapPin className="w-5 h-5 text-sky-500" />
            <span className="font-medium">{schoolInfo.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
