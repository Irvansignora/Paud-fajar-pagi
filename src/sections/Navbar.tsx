import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { schoolInfo } from '@/data/schoolData';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Profil', href: '#profile' },
  { name: 'Kelas', href: '#classes' },
  { name: 'Galeri', href: '#gallery' },
  { name: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
              <img
                src="/images/logo.jpeg"
                alt={schoolInfo.shortName}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1
                className={`font-bold text-sm md:text-base leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-slate-800' : 'text-white'
                }`}
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {schoolInfo.shortName}
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-slate-500' : 'text-white/80'
                }`}
              >
                {schoolInfo.tagline}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-slate-700 hover:text-sky-600 hover:bg-sky-50'
                    : 'text-white hover:text-white hover:bg-white/20'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-sky-500 to-sky-400 text-white"
            >
            <a 
              href="https://wa.me/6285688453690"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/20'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-400"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
