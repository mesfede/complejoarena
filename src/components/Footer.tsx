import React from 'react';
import { COMPLEX_INFO } from '../data/mockData';
import { ArenaLogo } from './ArenaLogo';
import { Instagram, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2a343d] border-t border-slate-700 py-10 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand and info with official circular logo */}
        <div className="flex items-center gap-3">
          <ArenaLogo size="sm" />
          <div>
            <span className="font-heading font-black text-base text-white uppercase tracking-tight">
              COMPLEJO <span className="text-[#c2f154]">ARENA</span>
            </span>
            <p className="text-[11px] text-slate-300">Calle 21 A e/ 464 y 465, City Bell, Buenos Aires</p>
          </div>
        </div>

        {/* 4 Ejes and Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-slate-200">
          <a href="#canchas" className="hover:text-[#c2f154] transition-colors font-medium">Alquiler Canchas</a>
          <a href="#cumpleanos" className="hover:text-[#c2f154] transition-colors font-medium">Cumpleaños</a>
          <a href="#torneos" className="hover:text-[#c2f154] transition-colors font-medium">Torneos</a>
          <a href="#escuelitas" className="hover:text-[#c2f154] transition-colors font-medium">Escuelitas</a>
          <a href="#buffet" className="hover:text-[#c2f154] transition-colors font-medium">Buffet</a>
          <a href="#contacto" className="hover:text-[#c2f154] transition-colors font-medium">Ubicación</a>
        </div>

        {/* Social & rights */}
        <div className="flex items-center gap-4 text-slate-300">
          <a href={COMPLEX_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors" title="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={`https://wa.me/${COMPLEX_INFO.whatsapp1}`} target="_blank" rel="noreferrer" className="hover:text-[#c2f154] transition-colors" title="WhatsApp">
            <Phone className="w-4 h-4" />
          </a>
          <span>© {new Date().getFullYear()} Complejo Arena City Bell</span>
        </div>

      </div>
    </footer>
  );
};
