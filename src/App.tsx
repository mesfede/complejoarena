import React, { useState, useEffect } from 'react';
import { Court, SportType, Booking } from './types';
import { INITIAL_BOOKINGS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingSection } from './components/BookingSection';
import { BookingModal } from './components/BookingModal';
import { BirthdaySection } from './components/BirthdaySection';
import { TournamentsSection } from './components/TournamentsSection';
import { SchoolsSection } from './components/SchoolsSection';
import { BuffetSection } from './components/BuffetSection';
import { LocationContact } from './components/LocationContact';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { MobileAppNavBar } from './components/MobileAppNavBar';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('canchas');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('futbol6');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Persistent bookings and block slots
  const [allBookings, setAllBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('arena_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [blockedSlots, setBlockedSlots] = useState<string[]>(() => {
    const saved = localStorage.getItem('arena_blocked_slots');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal states
  const [activeBookingSlot, setActiveBookingSlot] = useState<{
    court: Court;
    time: string;
    isNight: boolean;
    price: number;
    isFixed: boolean;
  } | null>(null);

  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('arena_bookings', JSON.stringify(allBookings));
  }, [allBookings]);

  useEffect(() => {
    localStorage.setItem('arena_blocked_slots', JSON.stringify(blockedSlots));
  }, [blockedSlots]);

  // Dynamic scroll observer to highlight active section in Navbar
  useEffect(() => {
    const sections = ['canchas', 'cumpleanos', 'torneos', 'escuelitas', 'buffet', 'contacto'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectSlot = (
    court: Court,
    time: string,
    isNight: boolean,
    price: number,
    isFixed: boolean
  ) => {
    setActiveBookingSlot({ court, time, isNight, price, isFixed });
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setAllBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setAllBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleToggleBlockSlot = (slotKey: string) => {
    setBlockedSlots((prev) =>
      prev.includes(slotKey) ? prev.filter((s) => s !== slotKey) : [...prev, slotKey]
    );
  };

  const handleQuickBook = (sport: SportType, date: string, time: string) => {
    setSelectedSport(sport);
    setSelectedDate(date);
    const targetElement = document.getElementById('canchas');

    if (targetElement) {
      const headerOffset = window.innerWidth < 1024 ? 64 : 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenBirthdayQuote = () => {
    const element = document.getElementById('cumpleanos');
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

  const handleNavigateSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const headerOffset = window.innerWidth < 1024 ? 64 : 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#384148] text-slate-100 selection:bg-[#c2f154] selection:text-slate-950 pb-20 lg:pb-0">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMyBookings={() => setShowMyBookings(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        userBookings={allBookings}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero
          onQuickBook={handleQuickBook}
          onOpenBirthdayQuote={handleOpenBirthdayQuote}
          onNavigateSection={handleNavigateSection}
        />

        <BookingSection
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSelectSlot={handleSelectSlot}
          allBookings={allBookings}
          blockedSlots={blockedSlots}
        />

        <BirthdaySection />

        <TournamentsSection />

        <SchoolsSection />

        <BuffetSection />

        <LocationContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Native-Style App Bottom Navigation Bar */}
      <MobileAppNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMyBookings={() => setShowMyBookings(true)}
        userBookings={allBookings}
      />

      {/* Booking Checkout Modal */}
      {activeBookingSlot && (
        <BookingModal
          court={activeBookingSlot.court}
          selectedTime={activeBookingSlot.time}
          selectedDate={selectedDate}
          isNight={activeBookingSlot.isNight}
          price={activeBookingSlot.price}
          isFixed={activeBookingSlot.isFixed}
          onClose={() => setActiveBookingSlot(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* My Bookings Modal */}
      {showMyBookings && (
        <UserDashboardModal
          userBookings={allBookings}
          onClose={() => setShowMyBookings(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanelModal
          allBookings={allBookings}
          blockedSlots={blockedSlots}
          onToggleBlockSlot={handleToggleBlockSlot}
          onClose={() => setShowAdmin(false)}
        />
      )}

    </div>
  );
}
