'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Pause, Play, Sparkles, Timer } from 'lucide-react';

interface LiveSimulatorPreviewProps {
  onOpenFullSimulator: () => void;
}

export default function LiveSimulatorPreview({ onOpenFullSimulator }: LiveSimulatorPreviewProps) {
  const [selectedOpt, setSelectedOpt] = useState<string>('B');
  const [timerSec, setTimerSec] = useState<number>(2 * 3600 + 44 * 60 + 9);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeMatrixNum, setActiveMatrixNum] = useState<number>(42);
  const [strikedOptions, setStrikedOptions] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimerSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTimer = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const toggleStrike = (e: React.MouseEvent, opt: string) => {
    e.stopPropagation();
    setStrikedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  const alternatives = [
    { id: 'A', text: '0,76 kg' },
    { id: 'B', text: '2,30 kg' },
    { id: 'C', text: '4,80 kg' },
    { id: 'D', text: '5,75 kg' },
    { id: 'E', text: '8,10 kg' },
  ];

  return (
    <section className="w-full bg-[#F6F3F2]/70 py-16 px-4 sm:px-6 lg:px-12 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00288E]">
              Ambiente de Avaliação
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Interface de Prova em Tempo Real
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-slate-700 text-xs font-semibold bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-slate-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Simulação Ativa
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Caderno 01 - Azul | Ciências da Natureza
            </span>
          </div>
        </div>

        {/* Test Window Mockup Container */}
        <div className="bg-white rounded-3xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          {/* Test App Toolbar Header */}
          <div className="bg-[#F0EDEC] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60">
            {/* Left: Caderno & Question Indicator */}
            <div className="flex items-center gap-4">
              <div className="bg-[#00288E] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-xs">
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Questão 42</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 font-medium">Progresso do Bloco</span>
                <div className="flex items-center gap-3">
                  <div className="w-36 sm:w-56 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00288E] to-[#712AE2] w-[46%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-800">42 de 90 (46%)</span>
                </div>
              </div>
            </div>

            {/* Right: Timer & Tools */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 text-xs sm:text-sm font-bold font-mono">
                <Timer className="w-4 h-4 text-amber-600" />
                <span>{formatTimer(timerSec)}</span>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isPaused ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
                title={isPaused ? 'Retomar' : 'Pausar Simulado'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-500 text-white'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isBookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{isBookmarked ? 'Marcada' : 'Revisar depois'}</span>
              </button>
            </div>
          </div>

          {/* Main Question Area: Asymmetric Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Question Content Track (8 Columns) */}
            <div className="lg:col-span-8 p-6 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Discipline & Metadata Tagging */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#00288E] text-xs font-semibold">
                    ENEM 2023 Aplicado
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#F0EDEC] text-slate-700 text-xs font-medium">
                    Física Térmica & Sustentabilidade
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#F0EDEC] text-slate-700 text-xs font-medium">
                    Dificuldade Média
                  </span>
                </div>

                {/* Contextual Statement */}
                <div className="text-sm sm:text-base text-slate-800 leading-relaxed mb-6 space-y-3">
                  <p>
                    No semiárido brasileiro, o aproveitamento direto da radiação solar para dessalinização térmica tem se destacado como uma solução de baixo custo energético. Em um protótipo experimental, a água salobra é inserida em uma câmara selada com cobertura vítrea inclinada. A energia incidente aquece a massa líquida, provocando sua evaporação e posterior condensação na face interna do vidro, onde escorre para um reservatório estéril.
                  </p>
                  <p>
                    Considere que a irradiação solar média local é de <strong className="font-bold text-[#00288E]">800 W/m²</strong>, a área coletora é de <strong className="font-bold text-[#00288E]">1,5 m²</strong> e o calor latente de vaporização da água é de <strong className="font-bold text-[#00288E]">2,26 × 10⁶ J/kg</strong>. O sistema opera com um rendimento térmico global de 40%.
                  </p>
                </div>

                {/* Schematic Simplified Diagram in CSS */}
                <div className="p-4 bg-[#F6F3F2] rounded-2xl mb-6 border border-slate-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">
                      Esquema Operacional do Dessalinizador
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Eficiência: η = 0,40</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                      <span className="block text-[11px] text-slate-400 mb-0.5">Potência Incidente</span>
                      <span className="font-display font-bold text-base sm:text-lg text-[#00288E]">1200 W</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                      <span className="block text-[11px] text-slate-400 mb-0.5">Taxa Útil de Evaporação</span>
                      <span className="font-display font-bold text-base sm:text-lg text-[#712AE2]">480 J/s</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                      <span className="block text-[11px] text-slate-400 mb-0.5">Produção Estimada</span>
                      <span className="font-display font-bold text-base sm:text-lg text-emerald-700">0,76 kg/h</span>
                    </div>
                  </div>
                </div>

                {/* Question Lead-in Prompt */}
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-4">
                  Com base nos parâmetros operacionais fornecidos, a massa de água potável obtida após 3 horas contínuas de insolação plena é mais próxima de:
                </h4>

                {/* Multiple Choice Alternatives */}
                <div className="space-y-3 mb-8">
                  {alternatives.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const isStriked = strikedOptions.includes(opt.id);

                    return (
                      <div
                        key={opt.id}
                        onClick={() => !isStriked && setSelectedOpt(opt.id)}
                        className={`group w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3.5 border cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-[#1E40AF] text-[#00288E] shadow-xs'
                            : isStriked
                            ? 'bg-slate-50 opacity-40 border-slate-200'
                            : 'bg-white hover:bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? 'bg-[#00288E] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span
                          className={`text-sm sm:text-base pt-0.5 flex-1 ${
                            isStriked ? 'line-through text-slate-400' : isSelected ? 'font-bold' : 'text-slate-800'
                          }`}
                        >
                          {opt.text}
                        </span>

                        <div className="flex items-center gap-1">
                          {isSelected && (
                            <span className="material-symbols-outlined text-[#00288E] text-xl">
                              check_circle
                            </span>
                          )}
                          <button
                            onClick={(e) => toggleStrike(e, opt.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Eliminar alternativa"
                          >
                            <span className="material-symbols-outlined text-base">format_strikethrough</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStrikedOptions(['A', 'E'])}
                    className="px-3 py-2 rounded-xl bg-[#F0EDEC] text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">strikethrough_s</span>
                    <span className="hidden sm:inline">Eliminar Alternativas</span>
                  </button>
                  <button
                    onClick={onOpenFullSimulator}
                    className="px-3 py-2 rounded-xl bg-[#F0EDEC] text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    <span className="hidden sm:inline">Abrir Rascunho</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMatrixNum(Math.max(35, activeMatrixNum - 1))}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">navigate_before</span>
                    <span>Anterior</span>
                  </button>
                  <button
                    onClick={onOpenFullSimulator}
                    className="px-6 py-2.5 rounded-xl bg-[#712AE2] hover:bg-[#8A4CFC] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Confirmar e Próxima</span>
                    <span className="material-symbols-outlined text-base">navigate_next</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Persistent Navigation Drawer (4 Columns) */}
            <div className="lg:col-span-4 bg-[#F6F3F2]/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-display font-bold text-base text-slate-900">
                    Matriz do Caderno
                  </h5>
                  <span className="text-xs text-slate-500 font-medium">90 Itens</span>
                </div>

                {/* Status legend */}
                <div className="grid grid-cols-3 gap-2 text-center mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00288E]"></span>
                    <span>Respondida</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Marcada</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span>Em branco</span>
                  </div>
                </div>

                {/* Question Grid Matrix Numbers */}
                <div className="grid grid-cols-6 gap-2 mb-6">
                  {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52].map(
                    (num) => {
                      const isCurrent = num === activeMatrixNum;
                      const isMarked = [38, 45].includes(num);
                      const isAnswered = num < 42;

                      return (
                        <button
                          key={num}
                          onClick={() => setActiveMatrixNum(num)}
                          className={`h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#712AE2] text-white font-bold shadow-md scale-105'
                              : isMarked
                              ? 'bg-amber-500 text-white'
                              : isAnswered
                              ? 'bg-[#00288E] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200/50'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Quick Analytical Stats */}
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 mb-4">
                  <span className="text-xs text-slate-500 block mb-1">Ritmo de Resolução</span>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-slate-900">2m 45s</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      No tempo alvo
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tempo recomendado pelo ENEM: 3 min por questão.
                  </p>
                </div>
              </div>

              {/* Submit Whole Exam CTA */}
              <button
                onClick={onOpenFullSimulator}
                className="w-full py-3 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">check_box</span>
                <span>Finalizar Caderno Completo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
