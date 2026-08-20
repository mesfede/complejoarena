import React, { useState } from 'react';
import { COURTS, COMPLEX_INFO } from '../data/mockData';
import { Booking } from '../types';
import { Shield, X, Lock, Unlock, Plus, CheckCircle2, DollarSign, Calendar } from 'lucide-react';

interface AdminPanelModalProps {
  allBookings: Booking[];
  blockedSlots: string[];
  onToggleBlockSlot: (slotKey: string) => void;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  allBookings,
  blockedSlots,
  onToggleBlockSlot,
  onClose,
}) => {
  const [selectedCourtId, setSelectedCourtId] = useState(COURTS[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const hours = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const totalRevenue = allBookings.reduce((acc, b) => acc + (b.depositPaid ? b.depositAmount : 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-slate-900" />
            <div>
              <h3 className="font-display font-black text-xl text-slate-900">Panel de Administración</h3>
              <p className="text-xs text-slate-500">Recepción & Gestión de Ocupación - Complejo Arena</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Turnos Registrados</span>
              <span className="text-2xl font-black text-slate-900">{allBookings.length}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-700 block">Señas Cobradas Online</span>
              <span className="text-2xl font-black text-slate-900">${totalRevenue.toLocaleString('es-AR')}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-rose-600 block">Horarios Bloqueados</span>
              <span className="text-2xl font-black text-rose-600">{blockedSlots.length}</span>
            </div>
          </div>

          {/* Block / Unblock Management by Court */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Gestor de Bloqueos (Lluvia, Mantenimiento o Evento):
            </h4>

            <div className="flex flex-wrap gap-2">
              {COURTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourtId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCourtId === c.id
                      ? 'bg-[#2a343d] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Fecha:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl px-2.5 py-1"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {hours.map((h) => {
                const slotKey = `${selectedCourtId}_${selectedDate}_${h}`;
                const isBlocked = blockedSlots.includes(slotKey);
                const booked = allBookings.find(
                  (b) => b.courtId === selectedCourtId && b.date === selectedDate && b.time === h
                );

                return (
                  <button
                    key={h}
                    onClick={() => onToggleBlockSlot(slotKey)}
                    className={`p-3 rounded-2xl border text-xs text-left transition-all ${
                      booked
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : isBlocked
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span>{h}</span>
                      {isBlocked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                      ) : booked ? (
                        <span className="text-[10px] font-bold">Ocupado</span>
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>
                    <span className="text-[10px] block mt-1">
                      {booked ? booked.customerName : isBlocked ? 'Bloqueado (clic para abrir)' : 'Libre (clic para bloquear)'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
