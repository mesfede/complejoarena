import React, { useState, useEffect } from 'react';
import { BIRTHDAY_PACKAGES, BIRTHDAY_EXTRAS, COMPLEX_INFO } from '../data/mockData';
import { BirthdayPackage } from '../types';
import confetti from 'canvas-confetti';
import { 
  Cake, 
  Check, 
  Plus, 
  Minus, 
  Send, 
  Users, 
  Calendar, 
  Clock, 
  Flame, 
  Trophy, 
  ShieldCheck, 
  Phone,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const BirthdaySection: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<BirthdayPackage>(BIRTHDAY_PACKAGES[1]);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(8);
  const [kidsCount, setKidsCount] = useState(20);
  const [adultsCount, setAdultsCount] = useState(15);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('17:00 a 20:00 hs');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['inflable']);
  const [selectedSports, setSelectedSports] = useState<string[]>(['Fútbol 6', 'Juegos Recreativos']);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Birthday Photos Slide state
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const birthdaySlides = [
    {
      img: "./cumples/cumple1.jpg",
      title: "Animación Deportiva & Profesores",
      tag: "Fútbol y Juegos Recreativos",
      description: "Coordinación permanente con profesores de Educación Física para torneos, penales, partidos y juegos guiados en cancha."
    },
    {
      img: "./cumples/cumple2.jpg",
      title: "Inflables Deportivos Gigantes",
      tag: "Diversión y Saltos",
      description: "Circuitos y castillos inflables sobre césped sintético para que los chicos jueguen y se diviertan con total seguridad."
    },
    {
      img: "./cumples/cumple3.jpg",
      title: "Canchas de Césped Sintético Exclusivas",
      tag: "Fútbol y Hockey",
      description: "Predio cerrado con iluminación LED y redes perimetrales para jugar partidos inolvidables."
    },
    {
      img: "./cumples/cumple4.jpg",
      title: "Festejos Familiares y Tercer Tiempo",
      tag: "Momentos Inolvidables",
      description: "Espacio amplio para festejar con amigos, entrega de medallas y diplomas para el cumpleañero/a y sus invitados."
    },
    {
      img: "./cumples/cumple5.jpg",
      title: "Quincho Techado & Sector Parrilla",
      tag: "Para Padres y Familias",
      description: "Salón equipado con mesas, bancos, parrilla encendida, heladeras y freezer para compartir un gran asado."
    },
    {
      img: "./cumples/cumple6.jpg",
      title: "Catering, Bebidas y Mesa Dulce",
      tag: "Servicio Integral",
      description: "Snacks, gaseosas de primeras marcas, menú infantil y todo listo para el momento de la torta y velitas."
    }
  ];

  // Auto advance slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % birthdaySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [birthdaySlides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? birthdaySlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % birthdaySlides.length);
  };

  // Extras calculation
  const extrasTotal = selectedExtras.reduce((acc, extraId) => {
    const item = BIRTHDAY_EXTRAS.find((e) => e.id === extraId);
    if (!item) return acc;
    if (extraId === 'hamburguesas') {
      return acc + item.price * kidsCount;
    }
    return acc + item.price;
  }, 0);

  // Kids above minimum calculation
  const extraKidsCount = Math.max(0, kidsCount - selectedPackage.minKids);
  const extraKidsPrice = extraKidsCount * 4500;

  const totalEstimate = selectedPackage.basePrice + extrasTotal + extraKidsPrice;
  const depositRequired = Math.round(totalEstimate * 0.3);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSport = (sport: string) => {
    setSelectedSports((prev) => 
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
  };

  const getWhatsAppMessage = () => {
    const text = `¡Hola Complejo Arena! 🎉 Quiero cotizar / reservar un Cumpleaños Deportivo:
🎂 *Cumpleañero/a:* ${childName || 'A definir'} (${childAge} años)
📦 *Paquete:* ${selectedPackage.name}
👥 *Invitados:* ${kidsCount} chicos y ~${adultsCount} adultos
📅 *Fecha Estimada:* ${selectedDate || 'A coordinar'}
⏰ *Turno:* ${timeSlot}
⚽ *Deportes elegidos:* ${selectedSports.join(', ')}
✨ *Adicionales:* ${selectedExtras.map(id => BIRTHDAY_EXTRAS.find(e => e.id === id)?.name).join(', ') || 'Ninguno'}
💰 *Presupuesto Estimado:* $${totalEstimate.toLocaleString('es-AR')}
👤 *Contacto:* ${parentName || 'Papá/Mamá'} (${parentPhone || ''})

¿Tienen disponibilidad para esta fecha? ¡Muchas gracias!`;
    return encodeURIComponent(text);
  };

  return (
    <section 
      id="cumpleanos" 
      className="py-14 lg:py-20 bg-gradient-to-b from-[#35252f] via-[#3d2a37] to-[#35252f] relative border-b border-white/10 text-slate-100 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title with pink badge */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Cake className="w-3.5 h-3.5" />
            <span>Festejos y Cumpleaños</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            FESTEJÁ TU CUMPLE
          </h2>
          <p className="text-pink-100/90 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            La mejor fiesta para chicos y grandes: canchas exclusivas de césped sintético, profesores de educación física, animación deportiva, inflables, quincho con parrilla y catering completo.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DYNAMIC INTERACTIVE SLIDESHOW OF BIRTHDAY CELEBRATIONS */}
        {/* ========================================================================= */}
        <div className="mb-12 rounded-3xl overflow-hidden bg-[#241a22] border border-pink-500/40 shadow-2xl relative">
          <div className="relative min-h-[300px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
            
            {/* Background Slides with smooth fade and rich brightness */}
            {birthdaySlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-[0.88] contrast-[1.08] saturate-[1.15] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20151e] via-[#20151e]/40 to-transparent" />
              </div>
            ))}

            {/* Top Bar with Badge and Slide Counter */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                  {birthdaySlides[activeSlide].tag}
                </span>
              </div>

              {/* Prev / Next Arrows (Hidden on mobile) */}
              <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-pink-200 px-2 font-mono">
                  {activeSlide + 1} / {birthdaySlides.length}
                </span>
                <button
                  onClick={handleNextSlide}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Caption and Progress Dots */}
            <div className="relative z-10 mt-auto pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase drop-shadow-md">
                  {birthdaySlides[activeSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 mt-1 leading-relaxed drop-shadow-sm">
                  {birthdaySlides[activeSlide].description}
                </p>
              </div>

              {/* Thumbnails / Indicators */}
              <div className="flex items-center gap-2 shrink-0">
                {birthdaySlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx ? 'w-8 bg-pink-500' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BIRTHDAY_PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            const isSelected = selectedPackage.id === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2d1f2a] border-pink-500 shadow-2xl ring-2 ring-pink-500/50 -translate-y-1'
                    : 'bg-[#241822]/80 hover:bg-[#2b1e29] border-pink-500/25 hover:border-pink-500/45'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-pink-500 text-white font-black text-[10px] uppercase tracking-wider shadow-lg ring-2 ring-white/20">
                    ★ El Más Elegido
                  </span>
                )}

                <div>
                  {/* Package Title and Pink Circle Duration Container */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 pr-1">
                      <h3 className="font-heading font-black text-xl text-white uppercase leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-pink-200/80 mt-1 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* CIRCULITO EN ROSA Y TIPOGRAFIA BLANCA EN UN CONTENEDOR */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 text-white flex flex-col items-center justify-center shadow-lg shadow-pink-500/35 border-2 border-white/40 shrink-0 select-none transform hover:scale-105 transition-transform">
                      <span className="font-black text-base sm:text-lg leading-none tracking-tight">
                        {pkg.durationHours}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-tighter leading-none mt-0.5 text-white/95">
                        HORAS
                      </span>
                    </div>
                  </div>

                  {/* PRECIO CLARAMENTE DELIMITADO Y VISIBLE */}
                  <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-pink-950/80 via-[#221620] to-[#1b1118] border border-pink-500/40 shadow-inner flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-pink-300 block mb-0.5">
                        Precio del Plan
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight drop-shadow-sm">
                          ${pkg.basePrice.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right pl-3 border-l border-pink-500/30">
                      <span className="text-xs font-black text-pink-100 block">
                        Hasta {pkg.minKids}
                      </span>
                      <span className="text-[10px] text-pink-300 font-bold uppercase tracking-tight block">
                        chicos incl.
                      </span>
                    </div>
                  </div>

                  {/* Included items */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase font-bold text-pink-300 tracking-wider block">
                      Qué incluye:
                    </span>
                    {pkg.includedFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-pink-100/90">
                        <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  {isSelected ? '✓ Paquete Seleccionado' : 'Elegir este Paquete'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Birthday Cotizador Form */}
        <div className="bg-[#2b1f28] rounded-3xl border border-pink-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            
            <div className="flex items-center gap-3 pb-6 border-b border-pink-500/20 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-pink-400 flex items-center justify-center text-xl shrink-0">
                🎂
              </div>
              <div>
                <h3 className="font-heading font-black text-2xl text-white uppercase">
                  Cotizá tu Cumpleaños a Medida
                </h3>
                <p className="text-xs text-pink-200/80">
                  Personalizá los detalles, adicionales y enviá la solicitud directa a WhatsApp para reservar fecha.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitQuote} className="space-y-6">
              
              {/* Row 1: Kid info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">Nombre del Cumpleañero/a *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mateo"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">Edad a Cumplir: {childAge} años</label>
                  <div className="flex items-center gap-3 bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2">
                    <input
                      type="range"
                      min={4}
                      max={16}
                      value={childAge}
                      onChange={(e) => setChildAge(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                    <span className="font-black text-white text-sm w-6 text-center">{childAge}</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Guests count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">
                    Cantidad de Chicos: <strong className="text-pink-400">{kidsCount}</strong>
                    {extraKidsCount > 0 && <span className="text-pink-300/80 font-normal"> (+{extraKidsCount} extras)</span>}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setKidsCount(Math.max(10, kidsCount - 5))}
                      className="p-2 rounded-xl bg-[#1e151c] hover:bg-[#281d26] border border-pink-500/30 text-slate-200 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={10}
                      max={70}
                      value={kidsCount}
                      onChange={(e) => setKidsCount(Number(e.target.value))}
                      className="flex-1 bg-[#1e151c] border border-pink-500/30 rounded-xl px-3 py-2 text-sm text-white text-center font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setKidsCount(kidsCount + 5)}
                      className="p-2 rounded-xl bg-[#1e151c] hover:bg-[#281d26] border border-pink-500/30 text-slate-200 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">
                    Adultos estimados (quincho/asador): <strong className="text-white">{adultsCount}</strong>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(Number(e.target.value))}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium"
                    placeholder="Cantidad de acompañantes"
                  />
                </div>
              </div>

              {/* Row 3: Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">Fecha Estimada</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">Turno Horario</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium cursor-pointer"
                  >
                    <option value="14:00 a 16:30 hs">Tarde 1: 14:00 a 16:30 hs</option>
                    <option value="17:00 a 20:00 hs">Tarde 2: 17:00 a 20:00 hs (Más pedido)</option>
                    <option value="20:30 a 23:30 hs">Noche: 20:30 a 23:30 hs</option>
                    <option value="A coordinar con el complejo">Otro horario (A coordinar)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Sports preference */}
              <div>
                <label className="block text-xs font-bold text-pink-200 mb-2">
                  Deportes y Juegos en Cancha:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Fútbol 6', 'Hockey 7 y 5', 'Juegos Recreativos', 'Tenis', 'Quema y Relevos'].map((sport) => {
                    const isChecked = selectedSports.includes(sport);
                    return (
                      <button
                        type="button"
                        key={sport}
                        onClick={() => toggleSport(sport)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-pink-500 text-white'
                            : 'bg-[#1e151c] text-pink-100 hover:text-white border border-pink-500/30'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '} {sport}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Extras */}
              <div>
                <label className="block text-xs font-bold text-pink-200 mb-2">
                  Adicionales Opcionales:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BIRTHDAY_EXTRAS.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? 'bg-pink-950/60 border-pink-500 text-white'
                            : 'bg-[#1e151c] border-pink-500/20 text-pink-100 hover:border-pink-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-pink-500 text-white' : 'border border-slate-500'
                          }`}>
                            {isChecked && '✓'}
                          </div>
                          <span className="text-xs font-medium">{extra.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-pink-300">
                          +${extra.price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parent Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">Nombre de Contacto (Padre / Madre)</label>
                  <input
                    type="text"
                    placeholder="Ej. Laura González"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pink-200 mb-1">WhatsApp de Contacto *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 221 555-1234"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full bg-[#1e151c] border border-pink-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-400 font-medium"
                  />
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="p-5 rounded-2xl bg-[#1e151c] border border-pink-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold text-pink-300 block">
                    Presupuesto Estimado
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      ${totalEstimate.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs text-pink-300 font-semibold">
                      (Seña 30%: ${depositRequired.toLocaleString('es-AR')})
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => confetti({ particleCount: 50, spread: 50 })}
                  className="px-6 py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta a WhatsApp</span>
                </a>
              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
};
