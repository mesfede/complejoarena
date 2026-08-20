import React, { useState, useEffect } from 'react';
import { COMPLEX_INFO } from '../data/mockData';
import { Booking } from '../types';
import { ArenaLogo } from './ArenaLogo';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Menu, 
  X, 
  User, 
  Shield, 
  Trophy, 
  Utensils, 
  GraduationCap, 
  Cake, 
  ArrowRight,
  Camera
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMyBookings: () => void;
  onOpenAdmin: () => void;
  userBookings: Booking[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMyBookings,
  onOpenAdmin,
  userBookings,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'canchas', label: 'Canchas', icon: Calendar },
    { id: 'cumpleanos', label: 'Cumpleaños', icon: Cake },
    { id: 'torneos', label: 'Torneos', icon: Trophy },
    { id: 'escuelitas', label: 'Escuelitas', icon: GraduationCap },
    { id: 'buffet', label: 'Buffet', icon: Utensils },
    { id: 'contacto', label: 'Ubicación', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = window.innerWidth < 1024 ? 64 : 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 text-slate-900 shadow-sm relative ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md py-2 sm:py-3 shadow-md border-b border-slate-200/50' 
          : 'bg-white py-3.5 sm:py-4'
      }`}
    >
      {/* 2 Líneas finitas superiores en gris y blanco (simulando al logo) */}
      <div className="absolute top-0 inset-x-0 flex flex-col pointer-events-none">
        <div className="h-[1.5px] bg-slate-400/80 w-full" />
        <div className="h-[2px] bg-white w-full" />
        <div className="h-[1px] bg-slate-200 w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* Mobile: Logo slightly offset from left margin / Desktop: Standard padding */}
        <div className="flex-1 lg:flex-initial flex items-center justify-start pl-1 sm:pl-0">
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center group focus:outline-none transition-transform active:scale-95 cursor-pointer py-0.5"
            aria-label="Ir al inicio"
          >
            <ArenaLogo size="lg" className="scale-105 sm:scale-100 drop-shadow-sm" />
          </button>
        </div>

        {/* Simplified Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#2a343d] text-white shadow-sm' 
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#c2f154]' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User & Action CTA Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* My bookings pill (Now visible on BOTH Mobile & Desktop) */}
          <button
            id="my-bookings-nav-btn"
            onClick={onOpenMyBookings}
            className="relative flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-[11px] sm:text-xs">Mis Turnos</span>
            {userBookings.length > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#c2f154] text-slate-950 font-black text-[9px] sm:text-[10px] flex items-center justify-center -mr-1 shadow-sm">
                {userBookings.length}
              </span>
            )}
          </button>

          {/* Reservar Cancha CTA Button (Desktop only, avoiding mobile duplicate) */}
          <button
            id="cta-reserve-navbar"
            onClick={() => handleNavClick('canchas')}
            className="hidden md:flex px-5 py-2.5 rounded-full bg-[#c2f154] hover:bg-[#b2e342] text-slate-950 font-black text-xs uppercase tracking-wider items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Reservar Cancha</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu hamburger button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 active:scale-95"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 2 Líneas finitas inferiores en gris y blanco (simulando al logo) */}
      <div className="absolute bottom-0 inset-x-0 flex flex-col pointer-events-none">
        <div className="h-[1px] bg-slate-200 w-full" />
        <div className="h-[2px] bg-white w-full" />
        <div className="h-[1.5px] bg-slate-400/80 w-full" />
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold text-left transition-colors ${
                    isActive ? 'bg-[#2a343d] text-white' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#c2f154]" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 py-2"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Mis Reservas ({userBookings.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
