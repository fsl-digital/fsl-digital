import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLabels = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/project', label: 'Project' },
    { href: '/team', label: 'Team' },
    { href: '/corpus', label: 'Corpus' },
    { href: '/news', label: 'News/Events' },
    { href: '/publications', label: 'Publications' },
  ],
  de: [
    { href: '/', label: 'Startseite' },
    { href: '/project', label: 'Projekt' },
    { href: '/team', label: 'Team' },
    { href: '/corpus', label: 'Korpus' },
    { href: '/news', label: 'Neuigkeiten/Veranstaltungen' },
    { href: '/publications', label: 'Publikation' },
  ],
};

const Header = ({ lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 border-b fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/FSL-WBM_klein.svg" alt="FSL Logo" className="max-h-20 w-auto" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLabels[lang].map((item) => (
            <Link key={item.href} to={item.href} className="nav-link">{item.label}</Link>
          ))}
        </nav>

        {/* Language selector */}
        <div className="hidden lg:flex items-center">
          <button
            className={`text-sm ${lang === "en" ? "text-primary font-bold" : "text-gray-600"} hover:text-gray-900`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <span className="mx-2 text-gray-300">|</span>
          <button
            className={`text-sm ${lang === "de" ? "text-primary font-bold" : "text-gray-600"} hover:text-gray-900`}
            onClick={() => setLang("de")}
          >
            DE
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-lg">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLabels[lang].map((item) => (
              <Link key={item.href} to={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
            ))}
            <div className="flex items-center pt-2">
              <button
                className={`text-sm ${lang === "en" ? "text-primary font-bold" : "text-gray-600"} hover:text-gray-900`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <span className="mx-2 text-gray-300">|</span>
              <button
                className={`text-sm ${lang === "de" ? "text-primary font-bold" : "text-gray-600"} hover:text-gray-900`}
                onClick={() => setLang("de")}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
