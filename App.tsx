
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import MatrixRain from './components/MatrixRain';
import Home from './components/Home';
import AiTools from './components/AiTools';
import { Language } from './types';
import { Linkedin, Facebook, Globe } from 'lucide-react';

// Component to handle scrolling on route/hash change
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there is a hash, try to scroll to it
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure rendering
      }
    } else if (pathname === '/' || pathname === '/ai-tools') {
      // If route changed but no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const NavItem: React.FC<{ href: string, label: string, isActive?: boolean }> = ({ href, label, isActive }) => {
  const isExternal = href.startsWith('http');
  const className = `hover:text-white transition-colors relative overflow-hidden group cursor-pointer ${isActive ? 'text-white' : 'text-green-500'}`;

  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span className="relative z-10">/ {label}</span>
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </a>
    );
  }

 // For BrowserRouter, linking to an anchor on the home page uses hash
  // We support: '/ai-tools' OR '/#skills' (which goes to home then scrolls to skills)
  
  return (
    <Link 
      to={href}
      className={className}
    >
      <span className="relative z-10">/ {label}</span>
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
    </Link>
  );
};

const AppContent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'jp' : 'en');
  };

  const getNavHref = (item: string) => {
    if (item === 'ai-tools') return '/ai-tools';
    // For BrowserRouter, hash links for home page sections
    return `/#${item}`;
  };

  if (!mounted) return null;

  const NAV_ITEMS = [
    { id: 'profile', en: 'PROFILE', jp: 'プロフィール' },
    { id: 'skills', en: 'SKILLS', jp: 'スキル' },
    { id: 'projects', en: 'PROJECTS', jp: 'プロジェクト' },
    { id: 'ai-tools', en: 'AI TOOLS', jp: 'AIツール' },
    { id: 'uplink', en: 'UPLINK', jp: '通信' }
  ];

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative overflow-x-hidden selection:bg-green-900 selection:text-white">
      <ScrollHandler />
      <MatrixRain />
      
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 border-b border-green-900/50 backdrop-blur-sm' : 'bg-transparent'} px-6 py-4`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-retro font-bold text-white tracking-widest hover:animate-pulse cursor-pointer no-underline">
            Evan Alferez<span className="text-green-500">_</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-bold">
              {NAV_ITEMS.map((item) => (
                <NavItem 
                  key={item.id}
                  href={getNavHref(item.id)}
                  label={lang === 'en' ? item.en : item.jp}
                  isActive={location.pathname === '/ai-tools' && item.id === 'ai-tools'}
                />
              ))}
            </div>
            
            <div className="hidden md:block h-4 w-px bg-green-900/50"></div>

            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-bold border border-green-900/50 px-2 py-1 rounded hover:border-green-500 hover:bg-green-900/20 transition-all"
            >
              <Globe className="w-3 h-3" />
              <span>
                <span className={lang === 'en' ? 'text-white' : 'text-green-800'}>EN</span>
                <span className="text-green-800 mx-1">/</span>
                <span className={lang === 'jp' ? 'text-white' : 'text-green-800'}>JP</span>
              </span>
            </button>

            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/evanalferez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-white hover:shadow-[0_0_10px_#0f0] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/evan.alferez/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-white hover:shadow-[0_0_10px_#0f0] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/ai-tools" element={<AiTools lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-green-900/50 py-8 text-center text-green-800 text-xs bg-black/80 relative z-10">
        <p>EVAN_ALFEREZ_PORTFOLIO_SYSTEM &copy; {new Date().getFullYear()}</p>
        <p>{lang === 'en' ? 'NO COOKIES. NO TRACKERS. JUST PURE REACT AND BLOOD.' : 'クッキーなし。追跡なし。コードのみ。'}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
