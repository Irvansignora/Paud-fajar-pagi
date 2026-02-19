import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Users, Star } from 'lucide-react';
import { staff } from '@/data/schoolData';

interface TeacherCardProps {
  name: string;
  position: string;
  isHighlighted?: boolean;
  delay?: number;
  isVisible: boolean;
}

function HijabAvatar({ name, isHighlighted = false }: { name: string; isHighlighted?: boolean }) {
  const initial = name.charAt(0).toUpperCase();
  const colors = [
    ['#60a5fa','#3b82f6'],['#f472b6','#ec4899'],['#34d399','#10b981'],
    ['#a78bfa','#8b5cf6'],['#fbbf24','#f59e0b'],['#fb923c','#f97316'],
  ];
  const idx = name.charCodeAt(0) % colors.length;
  const [light, dark] = colors[idx];
  return (
    <div className="relative h-64 overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <svg viewBox="0 0 200 220" width="180" height="200" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="100" cy="200" rx="70" ry="40" fill={dark} opacity="0.15"/>
        <path d="M30 220 Q30 160 100 155 Q170 160 170 220Z" fill={dark}/>
        {/* Hijab outer */}
        <ellipse cx="100" cy="95" rx="58" ry="62" fill={dark}/>
        {/* Face */}
        <ellipse cx="100" cy="90" rx="38" ry="42" fill="#FDDBB4"/>
        {/* Hijab inner / top */}
        <ellipse cx="100" cy="55" rx="42" ry="28" fill={light}/>
        {/* Hijab side drape left */}
        <path d="M42 90 Q30 120 35 155 Q60 145 100 155 L100 90Z" fill={light}/>
        {/* Hijab side drape right */}
        <path d="M158 90 Q170 120 165 155 Q140 145 100 155 L100 90Z" fill={light}/>
        {/* Hijab back overlap */}
        <path d="M55 78 Q100 60 145 78 Q145 50 100 42 Q55 50 55 78Z" fill={light}/>
        {/* Eyes */}
        <ellipse cx="86" cy="88" rx="5" ry="5.5" fill="#3d2b1f"/>
        <ellipse cx="114" cy="88" rx="5" ry="5.5" fill="#3d2b1f"/>
        <ellipse cx="87.5" cy="86.5" rx="1.5" ry="1.5" fill="white" opacity="0.6"/>
        <ellipse cx="115.5" cy="86.5" rx="1.5" ry="1.5" fill="white" opacity="0.6"/>
        {/* Eyebrows */}
        <path d="M80 80 Q86 77 92 80" stroke="#3d2b1f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M108 80 Q114 77 120 80" stroke="#3d2b1f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M97 97 Q100 102 103 97" stroke="#c8956b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Smile */}
        <path d="M88 108 Q100 116 112 108" stroke="#c0725a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Initial circle */}
        <circle cx="100" cy="175" r="16" fill="white" opacity="0.25"/>
        <text x="100" y="180" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">{initial}</text>
      </svg>
      <div className={`absolute inset-0 bg-gradient-to-t ${isHighlighted ? 'from-sky-900/30' : 'from-slate-900/20'} to-transparent`} />
    </div>
  );
}

function TeacherCard({ name, position, isHighlighted = false, delay = 0, isVisible }: TeacherCardProps) {
  return (
    <div
      className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 ${
          isHighlighted
            ? 'bg-gradient-to-br from-sky-500 to-sky-400 p-1 shadow-xl'
            : 'bg-white p-1 shadow-lg hover:shadow-xl'
        }`}
      >
        <div className={`relative rounded-[20px] overflow-hidden ${isHighlighted ? 'bg-white' : 'bg-slate-50'}`}>
          {/* Avatar */}
          <div className="relative">
            <HijabAvatar name={name} isHighlighted={isHighlighted} />
            {/* Badge for highlighted */}
            {isHighlighted && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Kepala Sekolah</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h4 className="font-bold text-slate-800 text-lg mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              {name}
            </h4>
            <p className={`text-sm font-medium ${isHighlighted ? 'text-sky-600' : 'text-slate-500'}`}>
              {position}
            </p>
            
            {/* Decorative */}
            <div className={`mt-4 w-12 h-1 rounded-full mx-auto ${isHighlighted ? 'bg-gradient-to-r from-sky-400 to-sky-500' : 'bg-slate-200'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Teachers() {
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
    <section id="teachers" ref={sectionRef} className="relative bg-white py-20 lg:py-28 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            <span>Tenaga Pendidik</span>
          </div>
          <h2 className="section-title text-slate-800">
            Guru & <span className="text-gradient-blue">Pengelola</span>
          </h2>
          <p className="section-subtitle">
            Tim pengajar profesional dan berpengalaman yang berdedikasi untuk memberikan 
            pendidikan terbaik bagi anak-anak tercinta.
          </p>
        </div>

        {/* Leadership Section */}
        <div className="mb-12">
          <div className={`flex items-center gap-2 mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Award className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-800 text-xl" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Pimpinan & Pengelola
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Manager */}
            <TeacherCard
              name={staff.manager.name}
              position={staff.manager.position}
              delay={200}
              isVisible={isVisible}
            />
            
            {/* Headmaster */}
            <TeacherCard
              name={staff.headmaster.name}
              position={staff.headmaster.position}
              isHighlighted={true}
              delay={300}
              isVisible={isVisible}
            />

            {/* Treasurer */}
            <TeacherCard
              name={staff.treasurer.name}
              position={staff.treasurer.position}
              delay={400}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* Teachers Section */}
        <div>
          <div className={`flex items-center gap-2 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <GraduationCap className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-800 text-xl" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Tenaga Pengajar
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.teachers.map((teacher, index) => (
              <TeacherCard
                key={teacher.name}
                name={teacher.name}
                position={teacher.position}
                delay={500 + index * 100}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className={`mt-16 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-3xl mx-auto text-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-sky-50 to-yellow-50">
            {/* Quote Marks */}
            <div className="absolute top-4 left-6 text-6xl text-sky-200 font-serif">"</div>
            <div className="absolute bottom-4 right-6 text-6xl text-sky-200 font-serif rotate-180">"</div>
            
            <p className="relative z-10 text-lg lg:text-xl text-slate-700 italic mb-6 leading-relaxed">
              Setiap anak adalah bintang yang bersinar dengan caranya sendiri. 
              Tugas kami sebagai pendidik adalah membantu mereka menemukan cahaya 
              tersebut dan membiarkannya bersinar terang.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center text-white font-bold">
                {staff.headmaster.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800">{staff.headmaster.name}</p>
                <p className="text-sm text-slate-500">{staff.headmaster.position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
