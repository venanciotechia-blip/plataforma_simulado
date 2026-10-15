'use client';

import React from 'react';
import { Search, Zap, SlidersHorizontal, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExamId: string;
  setSelectedExamId: (id: string) => void;
  onStartExam: (examId?: string) => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedExamId,
  setSelectedExamId,
  onStartExam,
}: HeroSectionProps) {
  const trendingTerms = [
    { label: 'ENEM 2024 Dia 1', exam: 'enem' },
    { label: 'Português FGV', exam: 'banco-do-brasil' },
    { label: 'Matemática Fuvest', exam: 'fuvest' },
    { label: 'Redação Nota 1000', exam: 'enem' },
    { label: 'Direito Adm. Cesgranrio', exam: 'policia-federal' },
    { label: 'Física OBF', exam: 'obf' },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#EBF3FA] via-[#F4EEFA] to-[#E8E0F7] px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-20 sm:pb-24">
      {/* Ambient glowing visual shapes (pure CSS) */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-[32rem] h-[32rem] rounded-full bg-purple-400/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Pill Badge Header */}
        <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_2px_12px_rgba(30,64,175,0.08)] mb-6 transition-transform hover:scale-105 cursor-default border border-indigo-100/60">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            ✨
          </span>
          <span className="text-xs sm:text-sm text-slate-700 font-semibold">
            Mais de <strong className="text-[#00288E] font-bold">120.000 questões</strong> comentadas e atualizadas para 2025
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] text-[#121212] max-w-4xl tracking-tight leading-[1.15] mb-5">
          A preparação inteligente para os principais{' '}
          <span className="bg-gradient-to-r from-[#00288E] via-[#4A3E85] to-[#712AE2] bg-clip-text text-transparent">
            exames do Brasil
          </span>
        </h1>

        {/* Explanatory Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
          Simulados de alta fidelidade com cálculo oficial de nota TRI para o ENEM, baterias cronometradas das bancas FGV, Cebraspe, FCC e vestibulares paulistas de alta concorrência.
        </p>

        {/* Search Console Bar Container */}
        <div className="w-full max-w-4xl bg-white rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_36px_-6px_rgba(30,64,175,0.12),0_4px_12px_-2px_rgba(0,0,0,0.04)] border border-slate-100 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* Text Input Field with Icon */}
            <div className="flex items-center gap-3 w-full flex-1 px-4 py-3 bg-[#F6F3F2]/80 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1E40AF]/20 transition-all">
              <Search className="text-slate-400 w-5 h-5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o concurso, matéria ou palavra-chave (ex: Física Térmica, FUVEST, OBMEP...)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-700 px-1"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Modality Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto px-4 py-3 bg-[#F6F3F2]/80 rounded-xl shrink-0">
              <SlidersHorizontal className="text-slate-500 w-4 h-4 shrink-0" />
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="todos">Todos os 9 Exames</option>
                <option value="enem">ENEM (Algoritmo TRI)</option>
                <option value="fuvest">FUVEST (USP)</option>
                <option value="unicamp">UNICAMP</option>
                <option value="obmep">OBMEP (Olimpíada Matemática)</option>
                <option value="oba">OBA (Astronomia)</option>
                <option value="obf">OBF (Física)</option>
                <option value="banco-do-brasil">Banco do Brasil</option>
                <option value="policia-federal">Polícia Federal</option>
                <option value="prf">PRF (Polícia Rodoviária)</option>
              </select>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onStartExam(selectedExamId !== 'todos' ? selectedExamId : 'enem')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1E40AF] to-[#712AE2] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(113,42,226,0.28)] hover:opacity-95 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Iniciar Simulado</span>
              <Zap className="w-4 h-4 fill-white" />
            </button>
          </div>
        </div>

        {/* Trending Search Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Termos em alta:
          </span>
          {trendingTerms.map((term, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(term.label);
                setSelectedExamId(term.exam);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/85 text-slate-700 text-xs font-medium hover:bg-indigo-50 hover:text-[#00288E] transition-colors shadow-sm border border-slate-200/60 cursor-pointer"
            >
              {term.label}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Gratuito e Público
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Sem necessidade de cadastro
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Algoritmo Oficial TRI & Bancas
          </span>
        </div>
      </div>
    </section>
  );
}
