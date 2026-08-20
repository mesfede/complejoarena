import React, { useState } from 'react';
import { Court, Booking, PaymentMethod } from '../types';
import { COMPLEX_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  CreditCard, 
  QrCode, 
  Send, 
  Users, 
  Calendar, 
  Clock, 
  Copy, 
  ShieldCheck, 
  Flame, 
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  court: Court;
  selectedTime: string;
  selectedDate: string;
  isNight: boolean;
  price: number;
  isFixed: boolean;
  onClose: () => void;
  onConfirmBooking: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  court,
  selectedTime,
  selectedDate,
  isNight,
  price,
  isFixed,
  onClose,
  onConfirmBooking,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [withParrilla, setWithParrilla] = useState(false);
  const [splitPlayers, setSplitPlayers] = useState(court.maxPlayers);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mercadopago');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const parrillaPrice = 18000;
  const totalPrice = price + (withParrilla ? parrillaPrice : 0);
  const depositAmount = Math.round(totalPrice * 0.3);
  const amountToPay = paymentType === 'deposit' ? depositAmount : totalPrice;
  const perPlayer = Math.round(totalPrice / splitPlayers);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setStep('payment');
  };

  const handleCompletePayment = () => {
    const bookingCode = `AR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-5)}`,
      courtId: court.id,
      courtName: court.name,
      sport: court.sport,
      sportLabel: court.sportLabel,
      date: selectedDate,
      time: selectedTime,
      duration: 1,
      totalPrice,
      depositAmount,
      depositPaid: true,
      status: 'confirmed',
      customerName,
      customerPhone,
      customerEmail: customerEmail || `${customerPhone}@arena.com`,
      teamName: teamName || 'Equipo Arena',
      paymentMethod,
      bookingCode,
      createdAt: new Date().toISOString(),
      isFixedWeekly: isFixed,
      splitCount: splitPlayers,
      withParrilla,
    };

    setConfirmedBooking(newBooking);
    onConfirmBooking(newBooking);
    setStep('success');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const copyAlias = () => {
    navigator.clipboard.writeText(COMPLEX_INFO.cbuAlias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2500);
  };

  const generateWhatsAppMessage = () => {
    if (!confirmedBooking) return '';
    const text = `¡Hola Complejo Arena! 👋 Acabo de reservar un turno:
🏟️ *${confirmedBooking.courtName}*
📅 *Fecha:* ${confirmedBooking.date}
⏰ *Horario:* ${confirmedBooking.time} hs
👤 *Titular:* ${confirmedBooking.customerName}
⚽ *Equipo:* ${confirmedBooking.teamName || 'Sin nombre'}
💳 *Pago:* $${amountToPay.toLocaleString('es-AR')} (${paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Transferencia'})
🔖 *Código de Reserva:* ${confirmedBooking.bookingCode}
${withParrilla ? '🥩 *Incluye uso de Parrilla / Quincho*' : ''}

¡Muchas gracias!`;
    return encodeURIComponent(text);
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl my-8 relative">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">
              {court.sport === 'futbol6' ? '⚽' : court.sport === 'tenis' ? '🎾' : '🏑'}
            </span>
            <div>
              <h3 className="font-display font-black text-lg text-slate-900">
                {step === 'success' ? '¡Turno Reservado con Éxito!' : `Reserva: ${court.name}`}
              </h3>
              <p className="text-xs text-slate-600 font-bold">
                {selectedDate} • {selectedTime} hs {isNight ? '(Noche LED)' : '(Día)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 221 555-1234"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Equipo (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Los Amigos FC"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email (para comprobante)</label>
                <input
                  type="email"
                  placeholder="tuemail@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Extras */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Adicionales:</span>
              <label className="flex items-center justify-between cursor-pointer text-xs text-slate-800">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Sumar Alquiler de Parrilla & Quincho para el 3er Tiempo (+$18.000)</span>
                </span>
                <input
                  type="checkbox"
                  checked={withParrilla}
                  onChange={(e) => setWithParrilla(e.target.checked)}
                  className="w-4 h-4 accent-slate-900 rounded"
                />
              </label>
            </div>

            {/* Price breakdown */}
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold block">Total Cancha {isFixed && '(10% OFF Mes)'}</span>
                <span className="text-xl font-black text-slate-900">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-700 font-bold block">Seña Requerida (30%)</span>
                <span className="text-lg font-black text-slate-900">${depositAmount.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#c2f154] hover:bg-[#b0e63a] text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <span>Continuar al Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment options */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            {/* Amount choice */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType('deposit')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  paymentType === 'deposit'
                    ? 'bg-[#c2f154]/30 border-slate-900 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-xs block font-bold text-slate-700">Pagar Seña (30%)</span>
                <span className="text-lg font-black text-slate-900">${depositAmount.toLocaleString('es-AR')}</span>
                <span className="text-[10px] text-slate-500 block">Resto en el complejo</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('full')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  paymentType === 'full'
                    ? 'bg-[#c2f154]/30 border-slate-900 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-xs block font-bold text-slate-700">Total Completo (100%)</span>
                <span className="text-lg font-black text-slate-900">${totalPrice.toLocaleString('es-AR')}</span>
                <span className="text-[10px] text-slate-500 block">Turno 100% abonado</span>
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Seleccioná Método de Pago:</span>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'mercadopago'
                      ? 'bg-sky-50 border-sky-500 text-slate-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-sky-600 shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-black block text-slate-900">Mercado Pago</span>
                    <span className="text-[10px] text-slate-500">QR / Débito / Saldo</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                    paymentMethod === 'transfer'
                      ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-black block text-slate-900">Transferencia CBU</span>
                    <span className="text-[10px] text-slate-500">Alias directo</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bank details if transfer */}
            {paymentMethod === 'transfer' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">Alias CBU Mercado Pago:</span>
                  <button
                    type="button"
                    onClick={copyAlias}
                    className="text-xs font-bold text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedAlias ? '¡Copiado!' : 'Copiar Alias'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm font-black text-slate-900">{COMPLEX_INFO.cbuAlias}</div>
                <div className="text-[11px] text-slate-500">Titular: Complejo Arena City Bell • CUIT: {COMPLEX_INFO.cuit}</div>
              </div>
            )}

            {paymentMethod === 'mercadopago' && (
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-950 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
                <span>Pago protegido y acreditación automática del turno al instante.</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-1/3 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleCompletePayment}
                className="w-2/3 py-3 rounded-2xl bg-[#c2f154] hover:bg-[#b0e63a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Confirmar Pago de ${amountToPay.toLocaleString('es-AR')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 'success' && confirmedBooking && (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#c2f154] text-slate-950 flex items-center justify-center mx-auto text-2xl font-black shadow-md">
              ✓
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-slate-900">¡Tu Reserva está Confirmada!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Te enviamos el comprobante y guardamos tu turno en el sistema de Complejo Arena.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500">Código de Reserva:</span>
                <strong className="text-slate-900 font-mono">{confirmedBooking.bookingCode}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cancha:</span>
                <strong className="text-slate-900">{confirmedBooking.courtName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha y Hora:</span>
                <strong className="text-slate-900">{confirmedBooking.date} a las {confirmedBooking.time} hs</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monto Abonado:</span>
                <strong className="text-slate-900 font-bold">${amountToPay.toLocaleString('es-AR')}</strong>
              </div>
            </div>

            {/* Split Calculator */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between text-slate-700">
              <span>Dividir entre {splitPlayers} jugadores:</span>
              <strong className="text-sm font-black text-slate-900">${perPlayer.toLocaleString('es-AR')} c/u</strong>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Comprobante a WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
