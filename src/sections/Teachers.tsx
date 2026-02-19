import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Users, Star } from 'lucide-react';
import { staff } from '@/data/schoolData';

interface TeacherCardProps {
  name: string;
  position: string;
  image: string;
  isHighlighted?: boolean;
  delay?: number;
  isVisible: boolean;
}

function TeacherCard({ name, position, image, isHighlighted = false, delay = 0, isVisible }: TeacherCardProps) {
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
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${isHighlighted ? 'from-sky-900/50' : 'from-slate-900/40'} to-transparent`} />
            
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

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Manager */}
            <TeacherCard
              name={staff.manager.name}
              position={staff.manager.position}
              image={staff.manager.image}
              delay={200}
              isVisible={isVisible}
            />
            
            {/* Headmaster */}
            <TeacherCard
              name={staff.headmaster.name}
              position={staff.headmaster.position}
              image={staff.headmaster.image}
              isHighlighted={true}
              delay={300}
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
                image={teacher.image}
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
