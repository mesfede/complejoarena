import React, { useState, useEffect } from 'react';
import { COMPLEX_INFO } from '../data/mockData';
import { MapPin, Phone, Instagram, Clock, Navigation, Send, MessageCircle } from 'lucide-react';

export const LocationContact: React.FC = () => {
  const [bgSlideIdx, setBgSlideIdx] = useState(0);

  const complexPhotos = [
    "./canchas/futbol1.jpg",
    "./cumples/cumple1.jpg",
    "./canchas/futbol3.jpg",
    "./cumples/cumple5.jpg",
    "./canchas/futbol5.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgSlideIdx((prev) => (prev + 1) % complexPhotos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [complexPhotos.length]);

  return (
    <section 
      id="contacto" 
      className="py-14 lg:py-20 relative border-b border-white/10 text-slate-100 overflow-hidden"
    >
      {/* Background Animated Complex Photos */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {complexPhotos.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              bgSlideIdx === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={img}
              alt="Complejo Arena City Bell"
              className="w-full h-full object-cover object-center brightness-[0.3] contrast-110"
            />
          </div>
        ))}
        {/* Dark subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[#22292f]/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b2227]/80 backdrop-blur-md border border-white/10 text-[#c2f154] text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Ubicación y Contacto Directo</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            VENÍ A CONOCER COMPLEJO ARENA
          </h2>
          <p className="text-slate-200 text-sm mt-1">
            Fácil acceso en City Bell, La Plata. Estacionamiento privado y seguro para jugadores y familias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Contact Details Card */}
          <div className="bg-[#242c33]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl">
            <div>
              <h3 className="font-heading font-black text-xl text-white mb-4 uppercase">
                Información de Contacto
              </h3>
              
              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c2f154] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Dirección:</strong>
                    <span>{COMPLEX_INFO.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c2f154] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Teléfonos / WhatsApp:</strong>
                    <div className="space-y-1 mt-0.5">
                      <a href={`https://wa.me/${COMPLEX_INFO.whatsapp1}`} target="_blank" rel="noreferrer" className="block text-[#c2f154] font-bold hover:underline">
                        {COMPLEX_INFO.phone1} (Recepción y Canchas)
                      </a>
                      <a href={`https://wa.me/${COMPLEX_INFO.whatsapp2}`} target="_blank" rel="noreferrer" className="block text-pink-400 font-bold hover:underline">
                        {COMPLEX_INFO.phone2} (Cumples y Escuelitas)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Instagram Oficial:</strong>
                    <a href={COMPLEX_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-400 font-bold hover:underline">
                      @{COMPLEX_INFO.instagram}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Horarios de Atención:</strong>
                    <span>{COMPLEX_INFO.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20hacer%20una%20consulta`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribirnos a WhatsApp 1</span>
              </a>
              <a
                href={`https://wa.me/${COMPLEX_INFO.whatsapp2}?text=Hola%20Complejo%20Arena!%20Quiero%20consultar%20por%20cumpleaños`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-pink-400" />
                <span>WhatsApp 2 (Cumples y Escuelitas)</span>
              </a>
            </div>
          </div>

          {/* Interactive Styled Map Container */}
          <div className="lg:col-span-2 bg-[#242c33]/90 backdrop-blur-md rounded-3xl border border-white/15 overflow-hidden relative min-h-[320px] flex flex-col shadow-2xl">
            <div className="p-4 bg-[#1b2227]/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-200 font-semibold">
                <Navigation className="w-4 h-4 text-[#c2f154]" />
                <span>Mapa de Ubicación • City Bell, Buenos Aires</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(COMPLEX_INFO.fullAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#c2f154] hover:underline font-bold"
              >
                Abrir en Google Maps ↗
              </a>
            </div>

            {/* Google Map iframe */}
            <div className="w-full h-full min-h-[300px] flex-1 bg-[#1e2429] relative">
              <iframe
                title="Ubicación Complejo Arena City Bell"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(COMPLEX_INFO.fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                className="w-full h-full border-0 grayscale invert contrast-125 opacity-90"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
