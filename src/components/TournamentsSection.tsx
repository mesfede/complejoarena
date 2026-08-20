import React, { useState } from 'react';
import { TOURNAMENTS, COMPLEX_INFO } from '../data/mockData';
import { Tournament } from '../types';
import { 
  Trophy, 
  Users, 
  Award, 
  Calendar, 
  DollarSign, 
  Send, 
  Flame, 
  Shield, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Table as TableIcon,
  Clock
} from 'lucide-react';

export const TournamentsSection: React.FC = () => {
  const [selectedSportFilter, setSelectedSportFilter] = useState<'all' | 'futbol' | 'hockey'>('all');
  const [inscribingTournament, setInscribingTournament] = useState<string | null>(null);
  const [expandedTableId, setExpandedTableId] = useState<string>(TOURNAMENTS[0]?.id || '');
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered = TOURNAMENTS.filter((t) => {
    if (selectedSportFilter === 'all') return true;
    if (selectedSportFilter === 'futbol') {
      return t.sport.toLowerCase().includes('fútbol') || t.sport.toLowerCase().includes('futbol');
    }
    if (selectedSportFilter === 'hockey') {
      return t.sport.toLowerCase().includes('hockey');
    }
    return true;
  });

  const handleInscribeSubmit = (e: React.FormEvent, tournamentTitle: string) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `¡Hola Complejo Arena! Quiero inscribir a mi equipo para el torneo: *${tournamentTitle}*
⚽ Equipo: ${teamName}
👤 Capitán/a: ${captainName}
📱 WhatsApp: ${captainPhone}`;
    window.open(`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section 
      id="torneos" 
      className="py-14 lg:py-20 bg-gradient-to-b from-[#332b1f] via-[#3a3123] to-[#332b1f] relative border-b border-white/10 text-slate-100 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <Trophy className="w-3.5 h-3.5" />
              <span>Competencia y Premios Oficiales</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              TORNEOS COMPLEJO ARENA
            </h2>
            <p className="text-amber-100/85 text-sm max-w-xl mt-1">
              Ligas de Fútbol 6 y Hockey 7 con arbitraje oficial, planilleros, tabla de posiciones en vivo, estadísticas y premios en efectivo.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 bg-[#221b13] p-1.5 rounded-2xl border border-amber-500/30 text-xs">
            <button
              onClick={() => setSelectedSportFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedSportFilter === 'all' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-amber-200/80 hover:text-white'
              }`}
            >
              Todos los Torneos ({TOURNAMENTS.length})
            </button>
            <button
              onClick={() => setSelectedSportFilter('futbol')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedSportFilter === 'futbol' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-amber-200/80 hover:text-white'
              }`}
            >
              ⚽ Fútbol 6
            </button>
            <button
              onClick={() => setSelectedSportFilter('hockey')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedSportFilter === 'hockey' ? 'bg-amber-400 text-slate-950 shadow-sm font-black' : 'text-amber-200/80 hover:text-white'
              }`}
            >
              🏑 Hockey 7
            </button>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((t) => {
            const isExpanded = expandedTableId === t.id;
            const hasStandings = t.standings && t.standings.length > 0;

            return (
              <div
                key={t.id}
                className="bg-[#241c14] p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between shadow-2xl relative"
              >
                <div>
                  {/* Top bar with sport icon and status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">
                      {t.sport.toLowerCase().includes('hockey') ? '🏑' : '⚽'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
                      {t.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl text-white mb-1 uppercase leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mb-4">
                    Categoría: {t.category}
                  </p>

                  {/* Tournament details */}
                  <div className="space-y-2 mb-4 bg-[#1b150f] p-4 rounded-2xl border border-amber-500/20 text-xs text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200/60">Días de juego:</span>
                      <strong className="text-white">{t.days}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200/60">Equipos:</span>
                      <strong className="text-white">{t.totalTeams} equipos</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-200/60">Premio 1er Puesto:</span>
                      <strong className="text-amber-400 font-bold">{t.prize}</strong>
                    </div>
                  </div>

                  {/* Standings Table Toggle Button */}
                  {hasStandings && (
                    <button
                      onClick={() => setExpandedTableId(isExpanded ? '' : t.id)}
                      className="w-full mb-4 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <TableIcon className="w-3.5 h-3.5" />
                        <span>{isExpanded ? 'Ocultar Tabla de Posiciones' : 'Ver Tabla de Posiciones Actual'}</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Standings Table Content */}
                  {hasStandings && isExpanded && (
                    <div className="mb-4 bg-[#18120c] p-3 rounded-2xl border border-amber-500/30 animate-fadeIn">
                      <div className="text-[11px] font-black uppercase text-amber-300 mb-2 flex items-center justify-between">
                        <span>Posiciones en Vivo</span>
                        <span className="text-[10px] text-slate-400 lowercase">simulación</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left">
                          <thead>
                            <tr className="text-amber-200/60 border-b border-white/10 font-mono">
                              <th className="pb-1">#</th>
                              <th className="pb-1">Equipo</th>
                              <th className="pb-1 text-center">PJ</th>
                              <th className="pb-1 text-center">G</th>
                              <th className="pb-1 text-center">Pts</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-sans">
                            {t.standings.map((row) => (
                              <tr key={row.pos} className={row.pos === 1 ? 'text-amber-300 font-bold bg-amber-500/10' : 'text-slate-300'}>
                                <td className="py-1.5 font-mono">{row.pos}</td>
                                <td className="py-1.5 font-semibold truncate max-w-[110px]">{row.team}</td>
                                <td className="py-1.5 text-center font-mono">{row.played}</td>
                                <td className="py-1.5 text-center font-mono">{row.won}</td>
                                <td className="py-1.5 text-center font-mono font-black text-amber-400">{row.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Next Match Highlight */}
                      {t.nextMatches && t.nextMatches[0] && (
                        <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-amber-200/80 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>Próx: {t.nextMatches[0].teamA} vs {t.nextMatches[0].teamB}</span>
                          </span>
                          <span className="font-mono text-white">{t.nextMatches[0].time}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Inscription Form / Trigger */}
                {inscribingTournament === t.id ? (
                  <form onSubmit={(e) => handleInscribeSubmit(e, t.title)} className="bg-[#1b150f] p-4 rounded-2xl border border-amber-500/40 space-y-3 mt-2">
                    <div className="text-xs font-bold text-white uppercase">Inscripción Rápida:</div>
                    <input
                      type="text"
                      required
                      placeholder="Nombre del Equipo"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-[#241c14] border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Nombre Capitán/a"
                      value={captainName}
                      onChange={(e) => setCaptainName(e.target.value)}
                      className="w-full bg-[#241c14] border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp de Contacto"
                      value={captainPhone}
                      onChange={(e) => setCaptainPhone(e.target.value)}
                      className="w-full bg-[#241c14] border border-amber-500/30 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setInscribingTournament(null)}
                        className="flex-1 py-1.5 rounded-xl bg-white/10 text-xs text-slate-300 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase cursor-pointer"
                      >
                        Enviar ↗
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setInscribingTournament(t.id)}
                      className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer text-center"
                    >
                      Anotar mi Equipo
                    </button>
                    <a
                      href={`https://wa.me/${COMPLEX_INFO.whatsapp1}?text=Hola%20Complejo%20Arena!%20Quiero%20info%20del%20torneo:%20*${encodeURIComponent(t.title)}*`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Consultar por WhatsApp"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
