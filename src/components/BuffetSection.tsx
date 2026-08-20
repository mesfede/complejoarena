import React from 'react';
import { BUFFET_MENU, COMPLEX_INFO } from '../data/mockData';
import { Utensils, Flame, Beer, Coffee, Send } from 'lucide-react';

export const BuffetSection: React.FC = () => {
  return (
    <section 
      id="buffet" 
      className="py-14 lg:py-20 bg-gradient-to-b from-[#2d1f18] via-[#36261d] to-[#2d1f18] relative border-b border-white/10 text-slate-100 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <Flame className="w-3.5 h-3.5" />
              <span>Gastronomía y Tercer Tiempo</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              BUFFET, PARRILLA Y QUINCHO
            </h2>
            <p className="text-orange-100/80 text-sm max-w-xl mt-1">
              El tercer tiempo se vive en Complejo Arena. Asados con amigos, bondiolas a la parrilla, pizzas caseras y las mejores bebidas bien frías.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20reservar%20el%20quincho%20y%20parrilla%20para%20un%20asado`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors shadow-md cursor-pointer"
          >
            <Flame className="w-4 h-4" />
            <span>Reservar Parrilla para mi Equipo</span>
          </a>
        </div>

        {/* Menu Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUFFET_MENU.map((cat, idx) => (
            <div key={idx} className="bg-[#221711] p-6 rounded-3xl border border-orange-500/30 hover:border-orange-500/50 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="font-heading font-black text-lg text-white mb-4 pb-2 border-b border-orange-500/20 flex items-center justify-between uppercase">
                  <span>{cat.category}</span>
                  <span className="text-lg">
                    {idx === 0 ? '🥩' : idx === 1 ? '🍕' : '🍻'}
                  </span>
                </h3>

                <div className="space-y-3.5">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs text-white">{item.name}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono font-bold text-orange-300 shrink-0">
                          ${item.price.toLocaleString('es-AR')}
                        </span>
                      </div>
                      {item.description && (
                        <span className="text-[11px] text-orange-100/60 leading-snug">
                          {item.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-orange-500/20 text-center">
                <span className="text-[10px] text-orange-200/70 block">
                  Servicio de mozos y atención directa para equipos y festejos
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
