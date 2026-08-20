import React, { useState, useMemo } from 'react';
import { COURTS, COMPLEX_INFO } from '../data/mockData';
import { Court, SportType, Booking, SPORT_THEMES } from '../types';
import { 
  SoccerBallIcon, 
  HockeyIcon,
  TennisIcon
} from './SportsIcons';
import { MobileBookingView } from './MobileBookingView';
import { 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  Repeat, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Camera,
  Layers,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface BookingSectionProps {
  selectedSport: SportType | 'all';
  setSelectedSport: (sport: SportType | 'all') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onSelectSlot: (court: Court, time: string, isNight: boolean, price: number, isFixed: boolean) => void;
  allBookings: Booking[];
  blockedSlots: string[]; // e.g. "courtId_date_time"
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedSport,
  setSelectedSport,
  selectedDate,
  setSelectedDate,
  onSelectSlot,
  allBookings,
  blockedSlots,
}) => {
  // Ensure we have an active sport (default to futbol6 if 'all')
  const activeSport: SportType = selectedSport === 'all' ? 'futbol6' : selectedSport;

  const getSportSaturationClass = (sport: SportType) => {
    if (sport === 'futbol6') {
      return 'saturate-[1.35] contrast-[1.08]'; // Fútbol: Alta saturación y contraste
    }
    if (sport === 'hockey7' || sport === 'hockey5') {
      return 'saturate-[0.88] contrast-[1.02]'; // Hockey: Saturación media
    }
    if (sport === 'tenis') {
      return 'saturate-[0.55] contrast-[0.95]'; // Tenis: Saturación baja/suave
    }
    return 'saturate-100';
  };

  // Find all courts matching the active sport
  const matchingCourts = useMemo(() => {
    return COURTS.filter((court) => court.sport === activeSport);
  }, [activeSport]);

  // If there are multiple courts for this sport (e.g. Hockey 5 Cancha A & B), keep selected sub-court
  const [selectedSubCourtId, setSelectedSubCourtId] = useState<string>(matchingCourts[0]?.id || COURTS[0].id);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  // Synchronize when sport changes
  React.useEffect(() => {
    if (matchingCourts.length > 0) {
      setSelectedSubCourtId(matchingCourts[0].id);
      setActivePhotoIdx(0);
    }
  }, [activeSport, matchingCourts]);

  const activeCourt = matchingCourts.find((c) => c.id === selectedSubCourtId) || matchingCourts[0] || COURTS[0];
  const courtImages = activeCourt.galleryImages || [activeCourt.image];

  const [isFixedBooking, setIsFixedBooking] = useState<boolean>(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'day' | 'night'>('all');

  // Generate next 30 days for full-month date scrolling
  const nextDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('es-AR', { weekday: 'short' });
      const dayNum = d.getDate();
      const month = d.toLocaleDateString('es-AR', { month: 'short' });
      days.push({
        iso,
        weekday,
        dayNum,
        month,
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }
    return days;
  }, []);

  // Standard hours for Complejo Arena
  const standardHours = [
    { time: '09:00', isNight: false },
    { time: '10:00', isNight: false },
    { time: '11:00', isNight: false },
    { time: '14:00', isNight: false },
    { time: '15:00', isNight: false },
    { time: '16:00', isNight: false },
    { time: '17:00', isNight: false },
    { time: '18:00', isNight: false },
    { time: '19:00', isNight: true },
    { time: '20:00', isNight: true },
    { time: '21:00', isNight: true },
    { time: '22:00', isNight: true },
    { time: '23:00', isNight: true },
  ];

  // Auto advance photos every 4.5s
  React.useEffect(() => {
    if (!courtImages || courtImages.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % courtImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [courtImages.length, activeCourt.id]);

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + courtImages.length) % courtImages.length);
  };

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % courtImages.length);
  };

  const sportsTabs: { id: SportType; label: string; renderIcon: (selected: boolean) => React.ReactNode }[] = [
    { 
      id: 'futbol6', 
      label: 'Fútbol 6', 
      renderIcon: (selected) => <SoccerBallIcon className="w-5 h-5" color={selected ? "#0f172a" : "#ffffff"} /> 
    },
    { 
      id: 'hockey7', 
      label: 'Hockey 7', 
      renderIcon: (selected) => <HockeyIcon className="w-5 h-5" color={selected ? "#0f172a" : "#ffffff"} /> 
    },
    { 
      id: 'hockey5', 
      label: 'Hockey 5', 
      renderIcon: (selected) => <HockeyIcon className="w-5 h-5" color={selected ? "#0f172a" : "#ffffff"} /> 
    },
    { 
      id: 'tenis', 
      label: 'Tenis Sintético', 
      renderIcon: (selected) => <TennisIcon className="w-5 h-5" color={selected ? "#0f172a" : "#ffffff"} /> 
    }
  ];

  // Helper to check if a slot is booked or blocked
  const getSlotStatus = (court: Court, time: string) => {
    const blockKey = `${court.id}_${selectedDate}_${time}`;
    if (blockedSlots.includes(blockKey)) {
      return { available: false, reason: 'Bloqueado por Mantenimiento', type: 'blocked' };
    }

    const booking = allBookings.find(
      (b) => b.courtId === court.id && b.date === selectedDate && b.time === time && b.status !== 'cancelled'
    );

    if (booking) {
      return { 
        available: false, 
        reason: booking.teamName ? `Ocupado: ${booking.teamName}` : 'Ocupado / Reservado',
        type: 'booked',
        bookedBy: booking.customerName,
        isFixed: booking.isFixedWeekly
      };
    }

    return { available: true };
  };

  return (
    <section 
      id="canchas" 
      className="scroll-mt-16 sm:scroll-mt-20 pt-2 pb-8 sm:py-14 lg:py-20 bg-gradient-to-b from-[#18261e] via-[#203328] to-[#18261e] relative border-b border-white/10 text-slate-100 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ========================================================================= */}
        {/* VISTA MÓVIL ESTILO APP: SUPER SIMPLE, COMPACTA, BOTONES GRANDES (lg:hidden) */}
        {/* ========================================================================= */}
        <MobileBookingView
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSelectSlot={onSelectSlot}
          allBookings={allBookings}
          blockedSlots={blockedSlots}
          matchingCourts={matchingCourts}
          selectedSubCourtId={selectedSubCourtId}
          setSelectedSubCourtId={setSelectedSubCourtId}
          activeCourt={activeCourt}
          standardHours={standardHours}
          isFixedBooking={isFixedBooking}
          setIsFixedBooking={setIsFixedBooking}
          nextDays={nextDays}
        />

        {/* ========================================================================= */}
        {/* VISTA ESCRITORIO WIDESCREEN (hidden lg:block) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block space-y-8">
          
          {/* Section Header with Subtle Lime Glow */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                ALQUILER DE CANCHAS
              </h2>
              <p className="text-emerald-100/80 text-sm max-w-xl mt-1">
                Elegí el deporte, mirá las fotos reales de la cancha y reservá tu horario al instante.
              </p>
            </div>

            {/* Fixed weekly booking toggle */}
            <div className="flex items-center gap-3 bg-[#17241c] p-3.5 rounded-2xl border border-[#c2f154]/20 shadow-md">
              <Repeat className="w-4 h-4 text-[#c2f154]" />
              <div className="text-left">
                <span className="text-xs font-bold text-white uppercase block">Turno Fijo Mensual</span>
                <span className="text-[11px] text-emerald-200/80">Asegurá tu día fijo con 10% OFF</span>
              </div>
              <button
                onClick={() => setIsFixedBooking(!isFixedBooking)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  isFixedBooking ? 'bg-[#c2f154]' : 'bg-slate-600'
                }`}
                aria-label="Alternar turno fijo mensual"
              >
                <div
                  className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isFixedBooking ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 1. SELECCIÓN DIRECTA DE DEPORTE */}
          {/* ========================================================================= */}
          <div>
            <div className="text-xs uppercase font-extrabold text-emerald-200 tracking-wider mb-3">
              1. Seleccioná el Deporte:
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sportsTabs.map((tab) => {
                const isSelected = selectedSport === tab.id;
                const theme = SPORT_THEMES[tab.id];
                return (
                  <button
                    key={tab.id}
                    id={`sport-tab-${tab.id}`}
                    onClick={() => setSelectedSport(tab.id)}
                    className={`p-4 rounded-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? theme.activeBtnClass
                        : theme.inactiveBtnClass
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isSelected ? 'bg-black/10' : 'bg-[#0f1712]'}`}>
                      {tab.renderIcon(isSelected)}
                    </div>
                    <span className="text-sm font-black">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        {/* ========================================================================= */}
        {/* 2. DYNAMIC COURT PHOTO BANNER */}
        {/* ========================================================================= */}
        <div className="mb-6 rounded-3xl overflow-hidden bg-[#152019] border border-white/20 shadow-2xl relative animate-fadeIn">
          
          {/* Background Court Photo Slideshow with Smooth Auto-Transitions */}
          <div className="relative min-h-[200px] sm:min-h-[240px] flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
              {courtImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activePhotoIdx === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${activeCourt.name} foto ${idx + 1}`}
                    className={`w-full h-full object-cover object-center brightness-[0.95] transition-all duration-500 ${SPORT_THEMES[activeCourt.sport].saturationClass}`}
                  />
                </div>
              ))}
              {/* Subtle soft gradient on left and bottom for crisp typography legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

              {/* Top Bar inside Banner: Sub-Court selector if Hockey 5 (Cancha A / Cancha B) */}
              <div className="relative z-10 flex justify-end">
                {matchingCourts.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
                    <span className="text-[11px] font-bold text-slate-300 uppercase px-2">Cancha:</span>
                    {matchingCourts.map((c) => {
                      const isCurSelected = c.id === activeCourt.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedSubCourtId(c.id);
                            setActivePhotoIdx(0);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                            isCurSelected
                              ? `${SPORT_THEMES[activeSport].bgHex} text-slate-950 shadow-sm`
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {c.name.includes('A') ? 'Cancha A' : c.name.includes('B') ? 'Cancha B' : c.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Content: ONLY Court Title & Description (la bajada) */}
              <div className="relative z-10 max-w-2xl mt-auto pt-4">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase drop-shadow-md">
                  {activeCourt.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed drop-shadow-sm font-medium">
                  {activeCourt.description}
                </p>
              </div>

            </div>
          </div>

        {/* ========================================================================= */}
        {/* 3. CALENDARIO Y HORARIOS */}
        {/* ========================================================================= */}
        <div className="bg-[#17251d] p-6 sm:p-8 rounded-3xl border border-[#c2f154]/25 shadow-2xl space-y-6">
          
          {/* Day / Night Filter Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Precios para {activeCourt.name}:
              </span>
              <span className="text-xs text-slate-300">
                Día: <strong className="text-white font-mono">${activeCourt.priceDay.toLocaleString('es-AR')}</strong> | Noche: <strong className="text-[#c2f154] font-mono">${activeCourt.priceNight.toLocaleString('es-AR')}</strong>
              </span>
            </div>

            {/* Day / Night quick filter */}
            <div className="flex items-center gap-1 bg-[#22292f] p-1.5 rounded-2xl border border-white/10 text-xs">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  timeFilter === 'all' ? 'bg-[#c2f154] text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setTimeFilter('day')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  timeFilter === 'day' ? 'bg-[#c2f154] text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Día</span>
              </button>
              <button
                onClick={() => setTimeFilter('night')}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  timeFilter === 'night' ? 'bg-[#c2f154] text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Noche LED</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CALENDARIO DE DÍAS (CON MANITO POINTER) */}
          {/* ========================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                <Calendar className="w-4 h-4 text-[#c2f154]" />
                <span>2. Seleccioná el Día:</span>
              </label>

              {/* Date Input with Pointer */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Otra fecha:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-[#22292f] border border-white/15 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#c2f154] cursor-pointer"
                />
              </div>
            </div>

            {/* Horizontal Day Selector with pointer */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {nextDays.map((d) => {
                const isSelected = selectedDate === d.iso;
                const currentTheme = SPORT_THEMES[activeSport];
                return (
                  <button
                    key={d.iso}
                    id={`day-btn-${d.iso}`}
                    onClick={() => setSelectedDate(d.iso)}
                    className={`flex flex-col items-center justify-center min-w-[76px] p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? currentTheme.activeDateClass
                        : 'bg-[#22292f] hover:bg-[#283138] text-slate-200 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="text-[11px] uppercase font-bold tracking-wider">
                      {d.isToday ? 'Hoy' : d.isTomorrow ? 'Mañana' : d.weekday}
                    </span>
                    <span className="text-2xl font-black my-0.5">{d.dayNum}</span>
                    <span className="text-[11px] uppercase font-semibold opacity-80">{d.month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HORARIOS DISPONIBLES */}
          {/* ========================================================================= */}
          {selectedDate && (
            <div className="space-y-3 pt-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-white">
                  <Clock className={`w-4 h-4 ${SPORT_THEMES[activeSport].textAccentClass}`} />
                  <span>3. Seleccioná el Horario:</span>
                </span>
                <span className="text-slate-400">Duración: 1 hora</span>
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {standardHours
                  .filter((h) => {
                    if (timeFilter === 'day') return !h.isNight;
                    if (timeFilter === 'night') return h.isNight;
                    return true;
                  })
                  .map((h) => {
                    const status = getSlotStatus(activeCourt, h.time);
                    const basePrice = h.isNight ? activeCourt.priceNight : activeCourt.priceDay;
                    const finalPrice = isFixedBooking ? Math.round(basePrice * 0.9) : basePrice;

                    if (!status.available) {
                      const isBlocked = status.type === 'blocked';
                      return (
                        <div
                          key={h.time}
                          className={`p-3.5 rounded-2xl border flex flex-col justify-between opacity-85 select-none ${
                            isBlocked
                              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono font-bold text-sm">
                            <span>{h.time} hs</span>
                            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-black/40 font-sans">
                              {isBlocked ? 'Mantenimiento' : 'Ocupado'}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold mt-2 truncate">
                            {status.reason}
                          </span>
                        </div>
                      );
                    }

                    // Available slot
                    const isNight = h.isNight;
                    return (
                      <button
                        key={h.time}
                        id={`slot-btn-${h.time.replace(':', '-')}`}
                        onClick={() =>
                          onSelectSlot(activeCourt, h.time, h.isNight, finalPrice, isFixedBooking)
                        }
                        className={`group p-3.5 rounded-2xl text-left transition-all duration-150 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between hover:bg-[#c2f154] hover:border-[#c2f154] ${
                          isNight
                            ? 'bg-gradient-to-br from-[#152820] to-[#0d1d17] border border-[#c2f154]/30'
                            : 'bg-gradient-to-br from-[#262d24] to-[#1e241c] border border-amber-400/25'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono font-black text-sm text-white group-hover:text-slate-950">
                          <span>{h.time} hs</span>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded flex items-center gap-1 group-hover:bg-transparent group-hover:text-slate-950 ${
                            isNight
                              ? 'bg-[#c2f154]/15 text-[#c2f154]'
                              : 'bg-amber-400/15 text-amber-300'
                          }`}>
                            {isNight ? (
                              <>
                                <Moon className="w-3 h-3 text-[#c2f154] group-hover:text-slate-950" />
                                <span>Noche</span>
                              </>
                            ) : (
                              <>
                                <Sun className="w-3 h-3 text-amber-400 group-hover:text-slate-950" />
                                <span>Tarde</span>
                              </>
                            )}
                          </span>
                        </div>

                        <div className="mt-2.5 flex items-baseline justify-between">
                          <span className={`text-sm font-black group-hover:text-slate-950 ${
                            isNight ? 'text-[#c2f154]' : 'text-amber-300'
                          }`}>
                            ${finalPrice.toLocaleString('es-AR')}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-400 group-hover:text-slate-950 uppercase tracking-wider">
                            Libre
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* Deposit note */}
              <div className="p-3.5 bg-[#22292f] rounded-2xl border border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c2f154] shrink-0" />
                  <span>Para confirmar la reserva solo abonás el <strong>30% de seña</strong> vía Mercado Pago o Transferencia.</span>
                </div>
                <a
                  href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20consultar%20por%20un%20turno%20de%20${encodeURIComponent(activeCourt.sportLabel)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#c2f154] uppercase tracking-wide hover:underline shrink-0"
                >
                  ¿Dudas? Consultar por WhatsApp ↗
                </a>
              </div>

            </div>
          )}

        </div>

        </div>

      </div>
    </section>
  );
};
