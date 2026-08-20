import React from 'react';
import { SCHOOL_PROGRAMS, COMPLEX_INFO } from '../data/mockData';
import { GraduationCap, Send, Clock, User, Sparkles } from 'lucide-react';

export const SchoolsSection: React.FC = () => {
  return (
    <section 
      id="escuelitas" 
      className="py-14 lg:py-20 bg-gradient-to-b from-[#1b2b33] via-[#23353d] to-[#1b2b33] relative border-b border-white/10 text-slate-100 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Formación Deportiva y Entrenamiento</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ESCUELITAS Y ENTRENAMIENTO
            </h2>
            <p className="text-cyan-100/80 text-sm max-w-xl mt-1">
              Fútbol y Hockey para chicos, jóvenes y adultas. Clases formativas, grupos reducidos y primera clase de prueba sin cargo.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20consultar%20por%20las%20escuelitas%20deportivas`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer w-fit"
          >
            Consultar Cupos por WhatsApp ↗
          </a>
        </div>

        {/* 4 Cards in 1 row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCHOOL_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-[#18242b] p-5 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-200 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Sport */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">
                    {program.sport === 'futbol' ? '⚽' : program.sport === 'hockey' ? '🏑' : '💪'}
                  </span>
                  {program.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black uppercase tracking-wider">
                      {program.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-black text-base text-white mb-1 uppercase leading-snug">
                  {program.title}
                </h3>
                
                <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-cyan-300 text-[11px] font-semibold mb-3">
                  {program.ageRange}
                </span>

                <p className="text-xs text-cyan-100/70 mb-4 line-clamp-2 leading-relaxed">
                  {program.description}
                </p>

                {/* Compact Schedule */}
                <div className="mb-4 bg-[#121c22] p-2.5 rounded-2xl border border-cyan-500/20 text-[11px] text-cyan-100/90">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{program.schedule[0]}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 pl-5">
                    {program.instructor}
                  </div>
                </div>
              </div>

              <div>
                {/* Price & CTA */}
                <div className="flex items-baseline justify-between pt-2 border-t border-cyan-500/20 mb-3">
                  <span className="text-[11px] text-slate-400 uppercase font-bold">Cuota Mensual</span>
                  <span className="text-lg font-black text-white font-mono">
                    ${program.priceMonthly.toLocaleString('es-AR')}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20anotar%20a%20mi%20hijo/a%20o%20hacer%20una%20clase%20de%20prueba%20para:*${encodeURIComponent(program.title)}*`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Clase de Prueba</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
