import React, { useState, useEffect, useRef } from 'react';
import { COMPLEX_INFO } from '../data/mockData';
import { SportType } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { 
  Clock, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Flame,
  Zap,
  CalendarCheck
} from 'lucide-react';

interface HeroProps {
  onQuickBook: (sport: SportType, date: string, time: string) => void;
  onOpenBirthdayQuote: () => void;
  onNavigateSection: (sectionId: string) => void;
}

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subtitle: string;
  badge: string;
  btnText: string;
  targetSection: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  onQuickBook, 
  onOpenBirthdayQuote,
  onNavigateSection 
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  // Dynamic slides cycling through Fútbol, Hockey, Cumpleaños, Turnos Nocturnos, Torneos y Escuelitas
  const heroSlides: HeroSlide[] = [
    { 
      id: 'slide-futbol-1', 
      image: './canchas/futbol1.jpg', 
      alt: 'Canchas de Fútbol 6 Complejo Arena',
      headlinePrefix: 'TODO EN UN',
      headlineHighlight: 'SOLO LUGAR',
      subtitle: 'El predio deportivo integral más completo de City Bell. Alquiler de canchas de fútbol, hockey y tenis.',
      badge: 'FÚTBOL 6 • HOCKEY • TENIS',
      btnText: 'Ver Horarios y Reservar',
      targetSection: 'canchas'
    },
    { 
      id: 'slide-hockey-1', 
      image: './canchas/hockey1.jpg', 
      alt: 'Canchas de Hockey Complejo Arena',
      headlinePrefix: 'DESCUBRÍ NUESTRO',
      headlineHighlight: 'PREDIO DEPORTIVO',
      subtitle: 'Canchas de césped sintético con medidas oficiales para entrenamientos, partidos y torneos.',
      badge: 'HOCKEY 7 Y HOCKEY 5',
      btnText: 'Reservar Cancha de Hockey',
      targetSection: 'canchas'
    },
    { 
      id: 'slide-cumple-1', 
      image: './cumples/cumple1.jpg', 
      alt: 'Cumpleaños y Festejos Complejo Arena',
      headlinePrefix: 'FESTEJÁ TU CUMPLE',
      headlineHighlight: 'EN UN LUGAR ÚNICO',
      subtitle: 'Animación con profes de educación física, inflables, cancha exclusiva y quincho con parrilla.',
      badge: 'CUMPLEAÑOS DEPORTIVOS',
      btnText: 'Cotizar Cumpleaños',
      targetSection: 'cumpleanos'
    },
    { 
      id: 'slide-futbol-2', 
      image: './canchas/futbol4.jpg', 
      alt: 'Fútbol Nocturno con Iluminación LED',
      headlinePrefix: 'VIVÍ LA PASIÓN DEL',
      headlineHighlight: 'TURNO NOCTURNO',
      subtitle: 'Iluminación LED estilo estadio hasta las 00:30 hs. Visibilidad perfecta para tus partidos nocturnos.',
      badge: 'LUCES LED ESTADIO',
      btnText: 'Reservar Turno Nocturno',
      targetSection: 'canchas'
    },
    { 
      id: 'slide-hockey-2', 
      image: './canchas/hockey2.jpg', 
      alt: 'Cancha de Césped Sintético Hockey',
      headlinePrefix: 'SUMATE A NUESTROS',
      headlineHighlight: 'TORNEOS & COPAS',
      subtitle: 'Competencias de fútbol y hockey con arbitraje oficial, planilleros y grandes premios.',
      badge: 'LIGAS & PREMIOS',
      btnText: 'Inscribir mi Equipo',
      targetSection: 'torneos'
    },
    { 
      id: 'slide-cumple-2', 
      image: './cumples/cumple2.jpg', 
      alt: 'Sector Quincho y Animación Deportiva',
      headlinePrefix: 'APRENDIZAJE & PASIÓN EN',
      headlineHighlight: 'ESCUELITAS DEPORTIVAS',
      subtitle: 'Formación de fútbol y hockey para chicos y jóvenes guiados por profesores especializados.',
      badge: 'CLASE DE PRUEBA GRATIS',
      btnText: 'Inscribir a Escuelita',
      targetSection: 'escuelitas'
    }
  ];

  // Auto-advance slides every 5.0s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Touch Swipe for mobile slide change
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 45) {
      // Swipe Left -> Next slide
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    } else if (diff < -45) {
      // Swipe Right -> Prev slide
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }
    touchStartXRef.current = null;
  };

  return (
    <section 
      id="hero-section" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[calc(100svh-60px)] lg:min-h-[760px] flex flex-col justify-between overflow-hidden border-b border-white/10"
    >
      {/* ========================================================================= */}
      {/* SINGLE FULL-BLEED BACKGROUND PHOTO WITH SMOOTH DISSOLVE & SLIGHT ZOOM */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-black">
        {heroSlides.map((slide, slideIdx) => {
          const isActive = currentSlide === slideIdx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] saturate-[1.12] transition-transform duration-[6500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Tramado deportivo sutil (Micro-mesh texture overlay) */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '6px 6px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0px, rgba(0, 0, 0, 0.8) 2px, transparent 2px, transparent 6px)`
          }}
        />

        {/* Disolución a negro suavizada en los extremos para resaltar más las fotos */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-black/65 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-56 bg-gradient-to-t from-black/85 via-[#1a2227]/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.72)_100%)] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* HERO CONTENT: SPACIOUS CENTERED MOBILE HERO / RICH DESKTOP SPREAD */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-6 sm:pb-8 flex-1 flex flex-col justify-between items-center w-full">
        
        {/* TOP SPACER (gives breathing room under the header) */}
        <div className="w-full hidden sm:block h-6 sm:h-12 lg:h-16" />

        {/* CENTERED HERO CONTENT (TITULO DINÁMICO, BAJADA Y CTA) */}
        <div 
          key={currentSlide}
          className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center items-center my-auto py-6 sm:py-2 select-none"
        >
          {/* Main Headline (Exact 2 Lines with Staggered Motion Blur) */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] uppercase mb-3 sm:mb-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            <span className="block text-white mb-0.5 sm:mb-1 animate-stagger-1">
              {heroSlides[currentSlide].headlinePrefix}
            </span>
            <span className="block text-[#c2f154] drop-shadow-[0_0_25px_rgba(194,241,84,0.35)] animate-stagger-2">
              {heroSlides[currentSlide].headlineHighlight}
            </span>
          </h1>

          {/* Subtitle / Bajada */}
          <p className="text-sm sm:text-lg lg:text-xl text-slate-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-2 animate-stagger-3">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Mobile Direct CTA Button */}
          <div className="mt-5 sm:hidden flex justify-center w-full px-4 animate-stagger-4">
            <button
              onClick={() => onNavigateSection(heroSlides[currentSlide].targetSection)}
              className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-[#c2f154] hover:bg-[#b2e342] text-slate-950 font-black text-sm uppercase tracking-wide shadow-2xl active:scale-95 transition-all cursor-pointer border border-[#c2f154] flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>{heroSlides[currentSlide].btnText}</span>
            </button>
          </div>

          {/* Desktop Features quick pill list */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs font-semibold text-slate-100 animate-stagger-4">
            <button
              onClick={() => onNavigateSection(heroSlides[currentSlide].targetSection)}
              className="px-5 py-2.5 rounded-full bg-[#c2f154] hover:bg-[#b2e342] text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-[#c2f154]"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>{heroSlides[currentSlide].btnText}</span>
            </button>
            <span className="flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-md">
              <Clock className="w-3.5 h-3.5 text-[#c2f154]" />
              <span>Abierto de 08:00 a 00:30 hs</span>
            </span>
            <span className="flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-md">
              <Zap className="w-3.5 h-3.5 text-[#c2f154]" />
              <span>Iluminación LED Estadio</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP ONLY: 4 PRIMARY CATEGORY CARDS (HIDDEN ON MOBILE TO FREE UP SPACE) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-4 gap-5 w-full my-6">
          
          {/* 1. ALQUILER DE CANCHAS (Lime subtle tint) */}
          <div
            id="hero-card-canchas"
            onClick={() => onNavigateSection('canchas')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-[#1d2d22]/95 via-[#202a30]/95 to-[#1a2227]/98 hover:from-[#263e2d] hover:to-[#222e36] border border-[#c2f154]/45 hover:border-[#c2f154] transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(194,241,84,0.08)] hover:shadow-[0_16px_40px_rgba(194,241,84,0.18)] flex flex-col justify-between cursor-pointer backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#c2f154]/20 text-[#c2f154] border border-[#c2f154]/30 text-[11px] font-black uppercase tracking-wide">
                  Reserva tu Turno
                </span>
              </div>

              <div className="flex justify-center items-center my-3 h-18">
                <CategoryIcon type="canchas" className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-heading font-black text-lg text-white group-hover:text-[#c2f154] transition-colors uppercase text-center mt-2 mb-2">
                ALQUILER DE CANCHAS
              </h3>

              <p className="text-xs text-slate-300 text-center leading-relaxed mb-4">
                Fútbol 6, Hockey 7, Hockey 5 y Tenis sintético. Reservá día y horario en segundos.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-[#c2f154] group-hover:text-white">
              <span>Ver Horarios Disponibles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. FESTEJÁ TU CUMPLE (Pink subtle tint) */}
          <div
            id="hero-card-cumpleanos"
            onClick={() => onNavigateSection('cumpleanos')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-[#331c2a]/95 via-[#202a30]/95 to-[#1a2227]/98 hover:from-[#422237] hover:to-[#222e36] border border-pink-500/40 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(236,72,153,0.08)] hover:shadow-[0_16px_40px_rgba(236,72,153,0.18)] flex flex-col justify-between cursor-pointer backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[11px] font-black uppercase tracking-wide">
                  Festejos y Cumples
                </span>
              </div>

              <div className="flex justify-center items-center my-3 h-18">
                <CategoryIcon type="cumpleanos" className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-heading font-black text-lg text-white group-hover:text-pink-300 transition-colors uppercase text-center mt-2 mb-2">
                FESTEJÁ TU CUMPLE
              </h3>

              <p className="text-xs text-slate-300 text-center leading-relaxed mb-4">
                Animación con profes de educación física, inflables, canchas exclusivas y quincho con parrilla.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-pink-400 group-hover:text-pink-300">
              <span>Cotizar Cumpleaños</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. TORNEOS (Gold/Amber subtle tint) */}
          <div
            id="hero-card-torneos"
            onClick={() => onNavigateSection('torneos')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-[#35291a]/95 via-[#202a30]/95 to-[#1a2227]/98 hover:from-[#46341f] hover:to-[#222e36] border border-amber-500/40 hover:border-amber-500 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(245,158,11,0.08)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.18)] flex flex-col justify-between cursor-pointer backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-black uppercase tracking-wide">
                  Ligas y Copas
                </span>
              </div>

              <div className="flex justify-center items-center my-3 h-18">
                <CategoryIcon type="torneos" className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-heading font-black text-lg text-white group-hover:text-amber-300 transition-colors uppercase text-center mt-2 mb-2">
                TORNEOS
              </h3>

              <p className="text-xs text-slate-300 text-center leading-relaxed mb-4">
                Torneos nocturnos y de fin de semana con arbitraje oficial, planilleros y premios en efectivo.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>Inscribir Equipo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. ESCUELITAS (Cyan subtle tint) */}
          <div
            id="hero-card-escuelitas"
            onClick={() => onNavigateSection('escuelitas')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-[#1a2e36]/95 via-[#202a30]/95 to-[#1a2227]/98 hover:from-[#213f4a] hover:to-[#222e36] border border-cyan-500/40 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_32px_rgba(6,182,212,0.08)] hover:shadow-[0_16px_40px_rgba(6,182,212,0.18)] flex flex-col justify-between cursor-pointer backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-black uppercase tracking-wide">
                  Formación y Clases
                </span>
              </div>

              <div className="flex justify-center items-center my-3 h-18">
                <CategoryIcon type="escuelitas" className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="font-heading font-black text-lg text-white group-hover:text-cyan-300 transition-colors uppercase text-center mt-2 mb-2">
                ESCUELITAS
              </h3>

              <p className="text-xs text-slate-300 text-center leading-relaxed mb-4">
                Escuelitas formativas de fútbol y hockey para chicos y jóvenes. Profesores especializados.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              <span>Clase de Prueba Gratis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* SLIDER INDICATOR DOTS & CONTROLS */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex gap-1.5 px-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-6 bg-[#c2f154]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Slide siguiente"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
