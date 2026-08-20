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
