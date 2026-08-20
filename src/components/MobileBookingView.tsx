import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Court, SportType, Booking } from '../types';
import { SoccerBallIcon, HockeyIcon, TennisIcon } from './SportsIcons';
import { 
  Calendar, 
  Sun, 
  Moon, 
  Repeat, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface MobileBookingViewProps {
  selectedSport: SportType | 'all';
  setSelectedSport: (sport: SportType | 'all') => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onSelectSlot: (court: Court, time: string, isNight: boolean, price: number, isFixed: boolean) => void;
  allBookings: Booking[];
  blockedSlots: string[];
  matchingCourts: Court[];
  selectedSubCourtId: string;
  setSelectedSubCourtId: (id: string) => void;
  activeCourt: Court;
  standardHours: { time: string; isNight: boolean }[];
  isFixedBooking: boolean;
  setIsFixedBooking: (val: boolean) => void;
  nextDays: {
    iso: string;
    weekday: string;
    dayNum: number;
    month: string;
    isToday: boolean;
    isTomorrow: boolean;
  }[];
}

export const MobileBookingView: React.FC<MobileBookingViewProps> = ({
  selectedSport,
  setSelectedSport,
  selectedDate,
  setSelectedDate,
  onSelectSlot,
  allBookings,
  blockedSlots,
  matchingCourts,
  selectedSubCourtId,
  setSelectedSubCourtId,
  activeCourt,
  standardHours,
  isFixedBooking,
  setIsFixedBooking,
  nextDays,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeSport: SportType = selectedSport === 'all' ? 'futbol6' : selectedSport;
  const courtImages = activeCourt.galleryImages || [activeCourt.image];

  const sports = [
    { 
      id: 'futbol6' as SportType, 
      label: 'Fútbol 6', 
      renderIcon: (active: boolean) => <SoccerBallIcon className="w-4 h-4" color={active ? '#0f172a' : '#ffffff'} /> 
    },
    { 
      id: 'hockey7' as SportType, 
      label: 'Hockey 7', 
      renderIcon: (active: boolean) => <HockeyIcon className="w-4 h-4" color={active ? '#0f172a' : '#ffffff'} /> 
    },
    { 
      id: 'hockey5' as SportType, 
      label: 'Hockey 5', 
      renderIcon: (active: boolean) => <HockeyIcon className="w-4 h-4" color={active ? '#0f172a' : '#ffffff'} /> 
    },
    { 
      id: 'tenis' as SportType, 
      label: 'Tenis', 
      renderIcon: (active: boolean) => <TennisIcon className="w-4 h-4" color={active ? '#0f172a' : '#ffffff'} /> 
    },
  ];

  const getSlotStatus = (court: Court, time: string) => {
    const blockKey = `${court.id}_${selectedDate}_${time}`;
    if (blockedSlots.includes(blockKey)) {
      return { available: false, reason: 'Mantenimiento', type: 'blocked' };
    }

    const booking = allBookings.find(
      (b) => b.courtId === court.id && b.date === selectedDate && b.time === time && b.status !== 'cancelled'
    );

    if (booking) {
      return { 
        available: false, 
        reason: 'Ocupado',
        type: 'booked',
      };
    }

    return { available: true };
  };

  // Divide slots into Day and Night LED groups for clear readability
  const daySlots = useMemo(() => standardHours.filter((h) => !h.isNight), [standardHours]);
  const nightSlots = useMemo(() => standardHours.filter((h) => h.isNight), [standardHours]);

  const currentPriceDay = isFixedBooking ? Math.round(activeCourt.priceDay * 0.9) : activeCourt.priceDay;
  const currentPriceNight = isFixedBooking ? Math.round(activeCourt.priceNight * 0.9) : activeCourt.priceNight;

  // Scroll active date horizontally in container ONLY (without scrolling browser window)
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const selectedBtn = scrollContainerRef.current.querySelector(`[data-date="${selectedDate}"]`) as HTMLElement;
    if (selectedBtn) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const btnRect = selectedBtn.getBoundingClientRect();
      const scrollOffset = (btnRect.left - containerRect.left) - (containerRect.width / 2) + (btnRect.width / 2);
      if (Math.abs(scrollOffset) > 5) {
        container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      }
    }
  }, [selectedDate]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden space-y-3.5">
      
      {/* 1. MOBILE SECTION HEADER */}
      <div className="border-b border-white/10 pb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121c16] border border-[#c2f154]/30 text-[#c2f154] text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-sm">
          <Sparkles className="w-3 h-3" />
          <span>Disponibilidad en Vivo</span>
        </div>
        <h2 className="font-heading font-black text-2xl text-white tracking-tight uppercase">
          ALQUILER DE CANCHAS
        </h2>
        <p className="text-emerald-100/80 text-xs mt-0.5">
          Elegí la cancha que querés reservar y seleccioná tu horario libre:
        </p>
      </div>

      {/* 2. COMPACT SPORTS SELECTOR BAR */}
      <div id="selector-de-canchas" className="flex gap-1.5 p-1 bg-[#141e17] rounded-2xl border border-[#c2f154]/25 shadow-md overflow-hidden">
        {sports.map((s) => {
          const isActive = activeSport === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSport(s.id)}
              className={`min-w-0 flex-1 py-2 px-1 rounded-xl font-black text-[11px] uppercase tracking-tight flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer overflow-hidden ${
                isActive
                  ? 'bg-[#c2f154] text-slate-950 shadow-md font-black'
                  : 'bg-transparent text-slate-300 hover:text-white'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {s.renderIcon(isActive)}
              </span>
              <span className="truncate min-w-0">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SUB-COURT SELECTOR BAR (Si hay varias canchas para un deporte) */}
      {matchingCourts.length > 1 && (
        <div className="flex items-center justify-between bg-[#18281f] p-2.5 rounded-2xl border border-[#c2f154]/30 shadow-sm">
          <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#c2f154]" />
            <span>Seleccionar Cancha:</span>
          </span>
          <div className="flex gap-1.5">
            {matchingCourts.map((c) => {
              const isSel = selectedSubCourtId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedSubCourtId(c.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                    isSel
                      ? 'bg-[#c2f154] text-slate-950 shadow-md scale-105'
                      : 'bg-[#223329] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  {c.name.includes('A') ? 'Cancha A' : c.name.includes('B') ? 'Cancha B' : c.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. COMPACT COURT PREVIEW & PRICE BAR */}
      <div className="rounded-2xl overflow-hidden bg-[#152019] border border-[#c2f154]/30 shadow-lg relative">
        <div className="relative h-28 overflow-hidden">
          <img
            src={courtImages[activePhotoIdx] || courtImages[0]}
            alt={activeCourt.name}
            className="w-full h-full object-cover brightness-[0.80]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Subcourt Selector if Hockey 5 */}
          {matchingCourts.length > 1 && (
            <div className="absolute top-2 right-2 z-10 flex gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/20">
              {matchingCourts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedSubCourtId(c.id)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    selectedSubCourtId === c.id 
                      ? 'bg-[#c2f154] text-slate-950 shadow-sm' 
                      : 'text-slate-300'
                  }`}
                >
                  {c.name.includes('A') ? 'Cancha A' : 'Cancha B'}
                </button>
              ))}
            </div>
          )}

          {/* Photo Dots/Counter if multiple */}
          {courtImages.length > 1 && (
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold text-white border border-white/10">
              <span>{activePhotoIdx + 1}/{courtImages.length}</span>
            </div>
          )}

          {/* Bottom Court Details & Unified Price Badge */}
          <div className="absolute bottom-2 inset-x-2.5 z-10 flex items-end justify-between gap-2">
            <div>
              <h3 className="font-heading font-black text-base text-white uppercase drop-shadow-md leading-tight">
                {activeCourt.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-300 font-medium">
                <span className="px-1.5 py-0.5 rounded bg-black/70 text-[#c2f154] font-bold">
                  {activeCourt.size}
                </span>
                <span>•</span>
                <span>{activeCourt.lighting}</span>
              </div>
            </div>

            {/* Price Pill */}
            <div className="text-right bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Tarifa por Hora</span>
              <div className="text-[11px] font-black text-white">
                <span className="text-slate-300">☀️ ${currentPriceDay.toLocaleString('es-AR')}</span>
                <span className="mx-1 text-slate-500">|</span>
                <span className="text-[#c2f154]">🌙 ${currentPriceNight.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TURNO FIJO MENSUAL COMPACT STRIP */}
      <div className="flex items-center justify-between bg-[#17231c] px-3.5 py-2 rounded-xl border border-[#c2f154]/20 shadow-sm">
        <div className="flex items-center gap-2">
          <Repeat className="w-3.5 h-3.5 text-[#c2f154]" />
          <span className="text-xs font-bold text-white uppercase">Turno Fijo Semanal</span>
          <span className="text-[10px] font-black bg-[#c2f154]/20 text-[#c2f154] px-1.5 py-0.5 rounded-md">10% OFF</span>
        </div>

        <button
          onClick={() => setIsFixedBooking(!isFixedBooking)}
          className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
            isFixedBooking ? 'bg-[#c2f154]' : 'bg-slate-700'
          }`}
          aria-label="Turno fijo mensual"
        >
          <div
            className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isFixedBooking ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 4. HORIZONTAL CALENDAR STRIP (SMOOTH TOUCH-PAN & SWIPE FOR ALL 30 DAYS) */}
      <div className="bg-[#17251d] p-3.5 rounded-2xl border border-[#c2f154]/25 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#c2f154]" />
            <span>Día de Reserva</span>
          </span>

          <div className="flex items-center gap-2">
            {/* Scroll navigation arrows for quick navigation */}
            <div className="flex items-center gap-1 bg-[#22292f] p-0.5 rounded-lg border border-white/10">
              <button
                onClick={handleScrollLeft}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Días anteriores"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleScrollRight}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Días siguientes"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Native Date Picker trigger */}
            <div className="relative flex items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#22292f] border border-white/20 text-[11px] text-[#c2f154] font-bold rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Scroll with Touch-Drag Support */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto overscroll-x-contain touch-pan-x pb-2 pt-1 -mx-2 px-2 scroll-smooth select-none scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {nextDays.map((d) => {
            const isSelected = selectedDate === d.iso;
            return (
              <button
                key={d.iso}
                data-date={d.iso}
                onClick={() => setSelectedDate(d.iso)}
                className={`w-[58px] min-w-[58px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-[#c2f154] text-slate-950 border-[#c2f154] font-black shadow-lg ring-2 ring-[#c2f154]/40'
                    : 'bg-[#22292f] text-slate-300 border-white/10 hover:border-white/25 active:bg-[#283238]'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-tight ${isSelected ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                  {d.isToday ? 'Hoy' : d.isTomorrow ? 'Mañ' : d.weekday.slice(0, 3)}
                </span>
                <span className="text-base font-black leading-tight my-0.5">{d.dayNum}</span>
                <span className={`text-[9px] uppercase font-semibold tracking-tighter ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {d.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. TIME SLOTS: DISTINGUISHED DAYLIGHT / NIGHT STADIUM SECTIONS */}
      <div className="space-y-3">
        
        {/* Turno Tarde (Atmósfera Cálida Vespertina) */}
        <div className="bg-gradient-to-br from-[#242b23] via-[#1f261e] to-[#182017] p-3.5 rounded-2xl border border-amber-400/25 shadow-md">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1.5 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Turno Tarde</span>
            </span>
            <span className="text-[11px] text-amber-200 font-mono font-bold">
              ${currentPriceDay.toLocaleString('es-AR')}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {daySlots.map((h) => {
              const status = getSlotStatus(activeCourt, h.time);
              const price = currentPriceDay;

              if (!status.available) {
                return (
                  <div
                    key={h.time}
                    className="py-2 px-1 rounded-xl bg-black/50 border border-white/5 text-slate-500 flex flex-col items-center justify-center select-none opacity-50"
                  >
                    <span className="text-xs font-mono font-bold line-through">{h.time}</span>
                    <span className="text-[8px] uppercase tracking-tighter text-rose-300">Ocupado</span>
                  </div>
                );
              }

              return (
                <button
                  key={h.time}
                  onClick={() => onSelectSlot(activeCourt, h.time, false, price, isFixedBooking)}
                  className="py-2.5 px-1 rounded-xl bg-[#2a3227] active:bg-[#c2f154] border border-amber-400/30 active:border-[#c2f154] flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm group cursor-pointer"
                >
                  <span className="text-xs font-mono font-black text-amber-100 group-active:text-slate-950">
                    {h.time}
                  </span>
                  <span className="text-[8px] font-black text-amber-300 group-active:text-slate-950 uppercase tracking-tighter mt-0.5">
                    Libre
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turno Noche LED (Atmósfera Estadio Nocturno) */}
        <div className="bg-gradient-to-br from-[#12251d] via-[#0d1d16] to-[#081510] p-3.5 rounded-2xl border border-[#c2f154]/30 shadow-md">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-black uppercase text-[#c2f154] flex items-center gap-1.5 bg-[#c2f154]/10 px-2 py-0.5 rounded-lg border border-[#c2f154]/25">
              <Moon className="w-3.5 h-3.5 text-[#c2f154]" />
              <span>Turno Noche LED</span>
            </span>
            <span className="text-[11px] text-[#c2f154] font-mono font-bold">
              ${currentPriceNight.toLocaleString('es-AR')}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {nightSlots.map((h) => {
              const status = getSlotStatus(activeCourt, h.time);
              const price = currentPriceNight;

              if (!status.available) {
                return (
                  <div
                    key={h.time}
                    className="py-2 px-1 rounded-xl bg-black/50 border border-white/5 text-slate-500 flex flex-col items-center justify-center select-none opacity-50"
                  >
                    <span className="text-xs font-mono font-bold line-through">{h.time}</span>
                    <span className="text-[8px] uppercase tracking-tighter text-rose-300">Ocupado</span>
                  </div>
                );
              }

              return (
                <button
                  key={h.time}
                  onClick={() => onSelectSlot(activeCourt, h.time, true, price, isFixedBooking)}
                  className="py-2.5 px-1 rounded-xl bg-[#162c22] active:bg-[#c2f154] border border-[#c2f154]/40 active:border-[#c2f154] flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm group cursor-pointer"
                >
                  <span className="text-xs font-mono font-black text-white group-active:text-slate-950">
                    {h.time}
                  </span>
                  <span className="text-[8px] font-black text-[#c2f154] group-active:text-slate-950 uppercase tracking-tighter mt-0.5">
                    Libre
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deposit Guarantee Note */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-[10px] text-slate-300 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c2f154] shrink-0" />
          <span>Tocá un horario para reservar con el <strong>30% de seña</strong>.</span>
        </div>

      </div>

    </div>
  );
};
