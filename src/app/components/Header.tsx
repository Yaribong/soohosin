'use client'; // Add 'use client' for useState

import { useState } from 'react'; // Import useState and useEffect
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Import icons
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logButtonClick } from '@/lib/analytics';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: '사업소개', href: '#business' },
    { name: 'Q&A', href: '#qna' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/"
            onClick={() => logButtonClick('로고', '/')}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-primary">SooHoSin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isHomePage && navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="text-gray-500 hover:text-gray-900"
              >
                {link.name}
              </button>
            ))}
            <a 
              href="mailto:info@soohosin.com"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center"
            >
              수호신 투자문의
            </a>
          </nav>

          {/* Mobile Menu Button - Only show on home page */}
          {isHomePage ? (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          ) : (
            <div className="md:hidden">
              <a 
                href="mailto:info@soohosin.com"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                수호신 투자문의
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only show on home page */}
      {isHomePage && isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {link.name}
              </button>
            ))}
            <a
              href="mailto:info@soohosin.com"
              onClick={toggleMobileMenu}
              className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              수호신 투자문의
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
