import React, { useState } from 'react';
import { Booking } from '../types';
import { COMPLEX_INFO } from '../data/mockData';
import { X, QrCode, Calendar, Clock, Share2, Trash2, CheckCircle2, User, Phone } from 'lucide-react';

interface UserDashboardModalProps {
  userBookings: Booking[];
  onClose: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  userBookings,
  onClose,
  onCancelBooking,
}) => {
  const [filterPhone, setFilterPhone] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const displayedBookings = filterPhone
    ? userBookings.filter((b) => b.customerPhone.includes(filterPhone))
    : userBookings;

  const copyShareText = (booking: Booking) => {
    const perPlayer = Math.round(booking.totalPrice / (booking.splitCount || 10));
    const text = `⚽ ¡Partido confirmado en Complejo Arena!
🏟️ *${booking.courtName}*
📅 *Fecha:* ${booking.date} a las ${booking.time} hs
💰 *Total:* $${booking.totalPrice.toLocaleString('es-AR')} ($${perPlayer.toLocaleString('es-AR')} por cabeza)
💳 *Alias para transferir:* ${COMPLEX_INFO.cbuAlias}
📍 *Ubicación:* ${COMPLEX_INFO.address}, City Bell`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-slate-900" />
            <h3 className="font-display font-black text-xl text-slate-900">Mis Turnos y Reservas</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Quick lookup by phone */}
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <Phone className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Filtrar por tu número de WhatsApp..."
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
              className="w-full bg-transparent border-0 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {displayedBookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Calendar className="w-10 h-10 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-800">No se encontraron turnos registrados.</p>
              <p className="text-xs text-slate-500 mt-1">Elegí una cancha en la grilla principal para reservar tu turno.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {displayedBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-base text-slate-900">{b.courtName}</span>
                        <span className="px-2 py-0.2 rounded-full bg-[#c2f154] text-slate-950 text-[10px] font-bold">
                          {b.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold mt-0.5">
                        {b.date} • {b.time} hs {b.isFixedWeekly && '(Turno Fijo)'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900">${b.totalPrice.toLocaleString('es-AR')}</span>
                      <span className="text-[10px] text-slate-500 block">Check-in: <strong className="font-mono text-slate-900">{b.bookingCode}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <span>Titular: <strong className="text-slate-900">{b.customerName}</strong> ({b.customerPhone})</span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyShareText(b)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-[11px] font-bold flex items-center gap-1"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{copiedLink ? '¡Copiado!' : 'Compartir con Equipo'}</span>
                      </button>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Cancelar turno"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
