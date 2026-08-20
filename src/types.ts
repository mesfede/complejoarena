export type SportType = 'futbol6' | 'hockey7' | 'hockey5' | 'tenis';

export interface Court {
  id: string;
  name: string;
  sport: SportType;
  sportLabel: string;
  surface: string;
  size: string;
  lighting: string;
  priceDay: number;
  priceNight: number;
  maxPlayers: number;
  description: string;
  image: string;
  galleryImages?: string[];
  features: string[];
  badges: string[];
}

export interface TimeSlot {
  id: string;
  time: string; // e.g. "18:00"
  available: boolean;
  price: number;
  isNight: boolean;
  courtId: string;
  courtName: string;
  date: string; // "YYYY-MM-DD"
  bookedBy?: string;
  teamName?: string;
}

export type PaymentMethod = 'mercadopago' | 'transfer' | 'cash';

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  sport: SportType;
  sportLabel: string;
  date: string;
  time: string;
  duration: number; // in hours (1 or 1.5)
  totalPrice: number;
  depositAmount: number;
  depositPaid: boolean;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  teamName?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  bookingCode: string;
  createdAt: string;
  isFixedWeekly?: boolean;
  splitCount?: number;
  notes?: string;
  withParrilla?: boolean;
  withPecheras?: boolean;
}

export interface BirthdayPackage {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  minKids: number;
  durationHours: number;
  includedFeatures: string[];
  popular?: boolean;
}

export interface BirthdayBookingRequest {
  id: string;
  childName: string;
  childAge: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  date: string;
  timeSlot: string;
  packageId: string;
  packageName: string;
  kidsCount: number;
  adultsCount: number;
  selectedSports: string[];
  selectedExtras: string[];
  dietaryNotes?: string;
  totalEstimate: number;
  depositRequired: number;
  status: 'solicitado' | 'confirmado' | 'contactado';
  createdAt: string;
}

export interface SchoolProgram {
  id: string;
  title: string;
  sport: 'futbol' | 'hockey' | 'entrenamiento';
  ageRange: string;
  schedule: string[];
  priceMonthly: number;
  description: string;
  instructor: string;
  features: string[];
  badge?: string;
}

export interface TournamentMatch {
  id: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  date: string;
  time: string;
  court: string;
  status: 'upcoming' | 'live' | 'finished';
}

export interface TournamentStanding {
  pos: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
}

export interface Tournament {
  id: string;
  title: string;
  sport: string;
  category: string;
  days: string;
  totalTeams: number;
  prize: string;
  status: 'Inscripciones Abiertas' | 'En Curso' | 'Finalizado';
  standings: TournamentStanding[];
  nextMatches: TournamentMatch[];
}

export interface BuffetCategory {
  category: string;
  items: {
    name: string;
    description: string;
    price: number;
    badge?: string;
  }[];
}

export interface SportColorTheme {
  hex: string;
  bgHex: string;
  activeBtnClass: string;
  inactiveBtnClass: string;
  activeDateClass: string;
  badgeClass: string;
  textAccentClass: string;
  borderAccentClass: string;
  saturationClass: string;
}

export const SPORT_THEMES: Record<SportType, SportColorTheme> = {
  futbol6: {
    hex: '#c2f154',
    bgHex: 'bg-[#c2f154]',
    activeBtnClass: 'bg-[#c2f154] text-slate-950 border-[#c2f154] shadow-[0_0_18px_rgba(194,241,84,0.45)] font-black scale-[1.02]',
    inactiveBtnClass: 'bg-[#152019] hover:bg-[#1c2c22] text-slate-200 border border-[#c2f154]/20 hover:border-[#c2f154]/40',
    activeDateClass: 'bg-[#c2f154] text-slate-950 border-[#c2f154] shadow-[0_0_15px_rgba(194,241,84,0.45)] font-black ring-2 ring-[#c2f154]/50 scale-105',
    badgeClass: 'bg-[#c2f154]/15 border-[#c2f154]/30 text-[#c2f154]',
    textAccentClass: 'text-[#c2f154]',
    borderAccentClass: 'border-[#c2f154]',
    saturationClass: 'saturate-[1.35] contrast-[1.08]',
  },
  hockey7: {
    hex: '#82ec68',
    bgHex: 'bg-[#82ec68]',
    activeBtnClass: 'bg-[#82ec68] text-slate-950 border-[#82ec68] shadow-[0_0_18px_rgba(130,236,104,0.45)] font-black scale-[1.02]',
    inactiveBtnClass: 'bg-[#152019] hover:bg-[#1c2c22] text-slate-200 border border-[#82ec68]/20 hover:border-[#82ec68]/40',
    activeDateClass: 'bg-[#82ec68] text-slate-950 border-[#82ec68] shadow-[0_0_15px_rgba(130,236,104,0.45)] font-black ring-2 ring-[#82ec68]/50 scale-105',
    badgeClass: 'bg-[#82ec68]/15 border-[#82ec68]/30 text-[#82ec68]',
    textAccentClass: 'text-[#82ec68]',
    borderAccentClass: 'border-[#82ec68]',
    saturationClass: 'saturate-[0.90] contrast-[1.02]',
  },
  hockey5: {
    hex: '#6ee7b7',
    bgHex: 'bg-[#6ee7b7]',
    activeBtnClass: 'bg-[#6ee7b7] text-slate-950 border-[#6ee7b7] shadow-[0_0_18px_rgba(110,231,183,0.45)] font-black scale-[1.02]',
    inactiveBtnClass: 'bg-[#152019] hover:bg-[#1c2c22] text-slate-200 border border-[#6ee7b7]/20 hover:border-[#6ee7b7]/40',
    activeDateClass: 'bg-[#6ee7b7] text-slate-950 border-[#6ee7b7] shadow-[0_0_18px_rgba(110,231,183,0.45)] font-black ring-2 ring-[#6ee7b7]/50 scale-105',
    badgeClass: 'bg-[#6ee7b7]/15 border-[#6ee7b7]/30 text-[#6ee7b7]',
    textAccentClass: 'text-[#6ee7b7]',
    borderAccentClass: 'border-[#6ee7b7]',
    saturationClass: 'saturate-[0.70] contrast-[0.98]',
  },
  tenis: {
    hex: '#bbf7d0',
    bgHex: 'bg-[#bbf7d0]',
    activeBtnClass: 'bg-[#bbf7d0] text-slate-950 border-[#bbf7d0] shadow-[0_0_18px_rgba(187,247,208,0.45)] font-black scale-[1.02]',
    inactiveBtnClass: 'bg-[#152019] hover:bg-[#1c2c22] text-slate-200 border border-[#bbf7d0]/20 hover:border-[#bbf7d0]/40',
    activeDateClass: 'bg-[#bbf7d0] text-slate-950 border-[#bbf7d0] shadow-[0_0_15px_rgba(187,247,208,0.45)] font-black ring-2 ring-[#bbf7d0]/50 scale-105',
    badgeClass: 'bg-[#bbf7d0]/15 border-[#bbf7d0]/30 text-[#bbf7d0]',
    textAccentClass: 'text-[#bbf7d0]',
    borderAccentClass: 'border-[#bbf7d0]',
    saturationClass: 'saturate-[0.50] contrast-[0.95]',
  },
};
