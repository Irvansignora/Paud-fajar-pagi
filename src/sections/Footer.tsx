import { Heart, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const quickLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Profil', href: '#profile' },
  { name: 'Kelas', href: '#classes' },
  { name: 'Galeri', href: '#gallery' },
  { name: 'Kontak', href: '#contact' },
];

const programs = [
  { name: 'Kelas Bulan (5-6 Tahun)', href: '#classes' },
  { name: 'Kelas Bintang (4-5 Tahun)', href: '#classes' },
  { name: 'Kegiatan Ekstrakurikuler', href: '#gallery' },
  { name: 'Study Tour', href: '#gallery' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      {/* Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white p-1">
                  <img
                    src="/images/logo.jpeg"
                    alt={schoolInfo.shortName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    {schoolInfo.shortName}
                  </h3>
                  <p className="text-slate-400 text-xs">{schoolInfo.tagline}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Lembaga pendidikan anak usia dini yang berkomitmen mencetak generasi 
                Indonesia yang sehat, cerdas, dan ceria sejak tahun {schoolInfo.established}.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Dibuat dengan</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>untuk pendidikan</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Tautan Cepat
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Program Kami
              </h4>
              <ul className="space-y-3">
                {programs.map((program) => (
                  <li key={program.name}>
                    <a
                      href={program.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(program.href);
                      }}
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      {program.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Hubungi Kami
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">{schoolInfo.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm">Hubungi untuk info</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm">bkbpaudfajarpagi1@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} {schoolInfo.shortName}. Hak Cipta Dilindungi.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                  Syarat & Ketentuan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
