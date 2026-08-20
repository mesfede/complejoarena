import React from 'react';
import { Calendar, Cake, Trophy, GraduationCap } from 'lucide-react';

interface MobileAppNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMyBookings?: () => void;
  userBookings?: any[];
}

export const MobileAppNavBar: React.FC<MobileAppNavBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { 
      id: 'canchas', 
      label: 'Canchas', 
      icon: Calendar,
      color: '#c2f154',
      activeClasses: 'text-[#c2f154]',
      iconActiveContainer: 'bg-[#c2f154] text-slate-950 shadow-[0_0_14px_rgba(194,241,84,0.6)] ring-2 ring-[#c2f154]/40 scale-105',
      iconInactiveContainer: 'bg-[#c2f154]/12 text-[#c2f154] border border-[#c2f154]/25 shadow-[0_0_8px_rgba(194,241,84,0.15)]',
      inactiveText: 'text-[#c2f154]/85',
    },
    { 
      id: 'cumpleanos', 
      label: 'Cumples', 
      icon: Cake,
      color: '#f472b6',
      activeClasses: 'text-pink-300',
      iconActiveContainer: 'bg-pink-500 text-white shadow-[0_0_14px_rgba(244,114,182,0.6)] ring-2 ring-pink-400/40 scale-105',
      iconInactiveContainer: 'bg-pink-500/12 text-pink-400 border border-pink-500/25 shadow-[0_0_8px_rgba(244,114,182,0.15)]',
      inactiveText: 'text-pink-400/85',
    },
    { 
      id: 'torneos', 
      label: 'Torneos', 
      icon: Trophy,
      color: '#fbbf24',
      activeClasses: 'text-amber-300',
      iconActiveContainer: 'bg-amber-500 text-slate-950 shadow-[0_0_14px_rgba(251,191,36,0.6)] ring-2 ring-amber-400/40 scale-105',
      iconInactiveContainer: 'bg-amber-500/12 text-amber-400 border border-amber-500/25 shadow-[0_0_8px_rgba(251,191,36,0.15)]',
      inactiveText: 'text-amber-400/85',
    },
    { 
      id: 'escuelitas', 
      label: 'Escuelitas', 
      icon: GraduationCap,
      color: '#38bdf8',
      activeClasses: 'text-cyan-300',
      iconActiveContainer: 'bg-cyan-400 text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.6)] ring-2 ring-cyan-300/40 scale-105',
      iconInactiveContainer: 'bg-cyan-500/12 text-cyan-400 border border-cyan-500/25 shadow-[0_0_8px_rgba(56,189,248,0.15)]',
      inactiveText: 'text-cyan-400/85',
    },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const targetElement = document.getElementById(id);

    if (targetElement) {
      const headerOffset = 64;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id="mobile-bottom-app-bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#121a1f]/95 backdrop-blur-xl border-t border-white/15 px-3 py-2 shadow-[0_-8px_25px_rgba(0,0,0,0.7)]"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`py-1 px-1 flex flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer min-w-0 ${
                isActive ? item.activeClasses : item.inactiveText
              }`}
            >
              <div 
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isActive ? item.iconActiveContainer : item.iconInactiveContainer
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </div>
              <span className={`text-[10px] tracking-tight font-black uppercase truncate max-w-full ${
                isActive ? 'font-black scale-105' : 'font-bold opacity-90'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
