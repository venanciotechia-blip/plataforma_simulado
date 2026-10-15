'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExamCategory, Question } from '@/lib/examData';
import {
  Timer,
  Pause,
  Play,
  Maximize2,
  CheckCircle2,
  Flag,
  ArrowLeft,
  ArrowRight,
  PenTool,
  RotateCcw,
  BookOpen,
  Keyboard,
  HelpCircle,
  Eye,
  Type,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface SimulatorViewProps {
  exam: ExamCategory;
  onFinishExam: (results: {
    exam: ExamCategory;
    answers: Record<number, string>;
    flagged: number[];
    timeSpentSeconds: number;
  }) => void;
  onExit: () => void;
}

export default function SimulatorView({ exam, onFinishExam, onExit }: SimulatorViewProps) {
  // Current question index within exam.questions
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers map: questionId -> selected option ('A', 'B', etc.)
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Flagged for review questions list
  const [flagged, setFlagged] = useState<number[]>([]);

  // Discarded / struck-through options per question: { [questionId]: ['A', 'D'] }
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, string[]>>({});

  // Highlight active for current question text
  const [highlighted, setHighlighted] = useState<Record<number, boolean>>({});

  // Scratchpad content per question
  const [scratchpads, setScratchpads] = useState<Record<number, string>>({});

  // Text zoom level (normal, larger)
  const [textZoom, setTextZoom] = useState<'normal' | 'large'>('normal');

  // Matrix filter: 'all', 'marked', 'blank'
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'marked' | 'blank'>('all');

  // Confirmation modal state
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Timer countdown: 3 hours default or scaled to total questions
  const initialSeconds = exam.questions.length * 3 * 60; // 3 min per question
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentQuestion = exam.questions[currentIndex] || exam.questions[0];

  // Timer interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Select alternative
  const handleSelectOption = React.useCallback((optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  }, [currentQuestion.id]);

  // Toggle option strike-through
  const handleToggleEliminate = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    setEliminatedOptions((prev) => {
      const currentList = prev[currentQuestion.id] || [];
      if (currentList.includes(optionId)) {
        return {
          ...prev,
          [currentQuestion.id]: currentList.filter((id) => id !== optionId),
        };
      } else {
        return {
          ...prev,
          [currentQuestion.id]: [...currentList, optionId],
        };
      }
    });
  };

  // Toggle flag / review
  const handleToggleFlag = React.useCallback(() => {
    setFlagged((prev) => {
      if (prev.includes(currentQuestion.id)) {
        return prev.filter((id) => id !== currentQuestion.id);
      } else {
        return [...prev, currentQuestion.id];
      }
    });
  }, [currentQuestion.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in the textarea
      if (['TEXTAREA', 'INPUT'].includes((document.activeElement?.tagName || ''))) return;

      if (e.key >= '1' && e.key <= '5') {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[optionIndex]) {
          handleSelectOption(currentQuestion.options[optionIndex].id);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < exam.questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (e.key.toLowerCase() === 'r') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion.options, exam.questions.length, handleSelectOption, handleToggleFlag]);

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.length;
  const blankCount = exam.questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / exam.questions.length) * 100);

  const isCurrentFlagged = flagged.includes(currentQuestion.id);
  const isCurrentHighlighted = !!highlighted[currentQuestion.id];
  const currentScratchpad = scratchpads[currentQuestion.id] || '';

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FCF9F8]">
      {/* Exam Mission Control / Top Bar */}
      <section className="w-full bg-white border-b border-slate-200/80 sticky top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Trail and Exam Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={onExit}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
                title="Voltar para a página inicial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="uppercase tracking-wider">{exam.name} Oficial</span>
                  <span>›</span>
                  <span className="text-[#00288E]">Caderno de Alta Precisão</span>
                </div>
                <h1 className="font-display font-bold text-base sm:text-lg text-slate-900 truncate">
                  {exam.fullName} — Simulado Oficial MoggaCon
                </h1>
              </div>
            </div>

            {/* Timers & Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Countdown timer badge */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs transition-colors ${
                  secondsRemaining < 300
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-[#F6F3F2] border-slate-200/60 text-slate-900'
                }`}
              >
                <Timer className={`w-4 h-4 ${isPaused ? 'text-amber-500' : 'text-[#712AE2] animate-pulse'}`} />
                <span className="font-mono font-bold text-sm sm:text-base">
                  {formatTime(secondsRemaining)}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  {isPaused ? 'Pausado' : 'Tempo Real'}
                </span>
              </div>

              {/* Pace estimation */}
              <div className="hidden sm:flex items-center gap-2 bg-[#F0EDEC] px-3 py-1.5 rounded-full text-xs text-slate-600">
                <span className="material-symbols-outlined text-sm text-[#00288E]">speed</span>
                <span>
                  Ritmo: <strong className="text-slate-900 font-semibold">{exam.timePerQuestionMin} min</strong>/q
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isPaused ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  title={isPaused ? 'Retomar Simulado' : 'Pausar Simulado'}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-amber-700" /> : <Pause className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setTextZoom(textZoom === 'normal' ? 'large' : 'normal')}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    textZoom === 'large' ? 'bg-indigo-100 text-[#00288E]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Alterar tamanho do texto"
                >
                  <Type className="w-4 h-4" />
                </button>

                {/* Finalize CTA button */}
                <button
                  onClick={() => setShowFinishModal(true)}
                  className="ml-1 px-4 py-2 rounded-full bg-[#BA1A1A] hover:bg-[#93000A] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Entregar Simulado</span>
                </button>
              </div>
            </div>
          </div>

          {/* Linear Execution Track */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="w-full sm:w-2/3 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00288E] to-[#712AE2] rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-600 whitespace-nowrap font-medium">
                <strong className="text-[#00288E] font-bold">{answeredCount}</strong> de {exam.questions.length} questões (
                <span className="font-mono">{progressPercent}%</span>)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> {answeredCount} Resolvidas
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {flaggedCount} Revisar
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> {blankCount} Em Aberto
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Area (8 cols question track + 4 cols navigation drawer) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* QUESTION TRACK (8 Columns) */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {/* Reading Toolbar */}
            <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl shadow-xs border border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-white bg-[#00288E] px-3.5 py-1 rounded-full shadow-xs">
                  Questão {currentQuestion.id}
                </span>
                <span className="text-xs font-semibold text-[#00288E] bg-indigo-50 border border-indigo-100/60 px-3 py-1 rounded-full">
                  {currentQuestion.discipline}
                </span>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  Dificuldade: {currentQuestion.difficulty}
                </span>
              </div>

              {/* Utility toggles */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setHighlighted((prev) => ({
                      ...prev,
                      [currentQuestion.id]: !prev[currentQuestion.id],
                    }))
                  }
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    isCurrentHighlighted
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Destacar texto do enunciado"
                >
                  <PenTool className="w-3.5 h-3.5 text-[#712AE2]" />
                  <span className="hidden sm:inline">Grifar Texto</span>
                </button>

                <button
                  onClick={handleToggleFlag}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isCurrentFlagged
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-slate-500 hover:text-amber-600 hover:bg-slate-100'
                  }`}
                  title="Marcar questão para revisar depois"
                >
                  <Flag className={`w-4 h-4 ${isCurrentFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Enunciation Box */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100">
              <header className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Contexto & Situação-Problema
                </p>
                <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  {currentQuestion.contextTitle}
                </h2>
              </header>

              {/* Question Body */}
              <div
                className={`text-slate-800 space-y-4 leading-relaxed ${
                  textZoom === 'large' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                }`}
              >
                <div
                  className={`whitespace-pre-line ${
                    isCurrentHighlighted ? 'bg-amber-50 p-3 rounded-xl border border-amber-200/60' : ''
                  }`}
                >
                  {currentQuestion.enunciation}
                </div>

                {/* Specific Diagrams if available */}
                {currentQuestion.diagram?.type === 'thermal_desal' && (
                  <div className="my-6 p-4 rounded-xl bg-[#F6F3F2] border border-slate-200/60">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-700">
                        {currentQuestion.diagram.caption}
                      </span>
                      <span className="text-xs text-slate-500">Dados do Protótipo</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                      {currentQuestion.diagram.metrics?.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white shadow-xs border border-slate-100">
                          <span className="block text-[11px] text-slate-400 mb-0.5">{m.label}</span>
                          <span className="font-display font-bold text-base sm:text-lg text-[#00288E]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentQuestion.diagram?.type === 'spectral_chart' && (
                  <div className="my-6 p-4 rounded-xl bg-[#F6F3F2] border border-slate-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">
                        {currentQuestion.diagram.caption}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Espalhamento Rayleigh I ∝ 1/λ⁴</span>
                    </div>
                    <svg
                      className="w-full h-40 text-[#00288E]"
                      fill="none"
                      viewBox="0 0 600 160"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Grid lines */}
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.1" x1="40" x2="570" y1="20" y2="20" />
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.1" x1="40" x2="570" y1="55" y2="55" />
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.1" x1="40" x2="570" y1="90" y2="90" />
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.1" x1="40" x2="570" y1="125" y2="125" />

                      {/* Spectral color band at bottom */}
                      <rect x="70" y="132" width="75" height="4" rx="2" fill="#712ae2" fillOpacity="0.6" />
                      <rect x="145" y="132" width="80" height="4" rx="2" fill="#1e40af" fillOpacity="0.6" />
                      <rect x="225" y="132" width="90" height="4" rx="2" fill="#00563a" fillOpacity="0.6" />
                      <rect x="315" y="132" width="110" height="4" rx="2" fill="#d97706" fillOpacity="0.6" />
                      <rect x="425" y="132" width="130" height="4" rx="2" fill="#ba1a1a" fillOpacity="0.6" />

                      {/* Transmittance curve */}
                      <path
                        d="M 40 120 C 80 118, 120 110, 150 78 C 180 46, 210 28, 260 32 C 300 35, 330 85, 360 88 C 390 91, 440 38, 490 35 C 520 33, 550 40, 570 42"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                      <path
                        d="M 40 120 C 80 118, 120 110, 150 78 C 180 46, 210 28, 260 32 C 300 35, 330 85, 360 88 C 390 91, 440 38, 490 35 C 520 33, 550 40, 570 42 L 570 130 L 40 130 Z"
                        fill="currentColor"
                        fillOpacity="0.08"
                      />
                      <circle cx="150" cy="78" r="4" fill="#712ae2" />
                      <circle cx="360" cy="88" r="4" fill="#00288E" />

                      {/* Axes & Labels */}
                      <line x1="40" y1="130" x2="570" y2="130" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
                      <line x1="40" y1="15" x2="40" y2="130" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
                      <text x="75" y="148" fill="#757684" fontSize="10" fontFamily="sans-serif">UV (∼380nm)</text>
                      <text x="165" y="148" fill="#757684" fontSize="10" fontFamily="sans-serif">Azul (∼450nm)</text>
                      <text x="250" y="148" fill="#757684" fontSize="10" fontFamily="sans-serif">Verde</text>
                      <text x="350" y="148" fill="#757684" fontSize="10" fontFamily="sans-serif">Amarelo</text>
                      <text x="460" y="148" fill="#757684" fontSize="10" fontFamily="sans-serif">Infravermelho (&gt;750nm)</text>
                    </svg>
                  </div>
                )}
              </div>
            </article>

            {/* Alternatives Container */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-display font-bold text-base sm:text-lg text-slate-900">
                  Alternativas de Resposta
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-sm">touch_app</span> Selecione uma opção
                </span>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  const isEliminated = (eliminatedOptions[currentQuestion.id] || []).includes(option.id);

                  return (
                    <div
                      key={option.id}
                      onClick={() => !isEliminated && handleSelectOption(option.id)}
                      className={`group relative flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/70 border-[#1E40AF] text-[#00288E] shadow-xs'
                          : isEliminated
                          ? 'bg-slate-50/60 border-slate-200 opacity-45 cursor-not-allowed'
                          : 'bg-[#F6F3F2]/60 hover:bg-[#F0EDEC] border-transparent text-slate-800'
                      }`}
                    >
                      {/* Letter badge */}
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#00288E] text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200/80 group-hover:border-slate-300'
                        }`}
                      >
                        {option.id}
                      </span>

                      {/* Option text */}
                      <div className="flex-1 min-w-0 pt-1">
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${
                            isEliminated ? 'line-through text-slate-400' : isSelected ? 'font-medium text-[#001453]' : 'text-slate-800'
                          }`}
                        >
                          {option.text}
                        </p>
                      </div>

                      {/* Actions: Strikethrough toggle & selection check */}
                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-[#00288E] text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">check</span>
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleToggleEliminate(e, option.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-white transition-colors"
                          title={isEliminated ? 'Restaurar alternativa' : 'Descartar alternativa (riscar)'}
                        >
                          <span className="material-symbols-outlined text-base">format_strikethrough</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Operational Navigation Bar */}
              <footer className="mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F6F3F2] p-4 rounded-xl">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleToggleFlag}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      isCurrentFlagged
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-white' : ''}`} />
                    <span>{isCurrentFlagged ? 'Marcada para Revisão' : 'Revisar Depois'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < exam.questions.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      }
                    }}
                    className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Pular Questão
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-white disabled:opacity-40 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 border border-slate-200/60 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < exam.questions.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setShowFinishModal(true);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2 rounded-xl bg-[#00288E] hover:bg-[#1E40AF] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <span>
                      {currentIndex === exam.questions.length - 1
                        ? 'Conferir e Entregar'
                        : 'Confirmar e Próxima'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </footer>
            </section>
          </main>

          {/* SIDEBAR EXAM SHEET / MATRIX (4 Columns) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Answer Sheet Card */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Caderno de Respostas
                  </h3>
                  <p className="text-xs text-slate-500">Selecione para navegar diretamente</p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {answeredCount} de {exam.questions.length} respondidas
                </span>
              </div>

              {/* Matrix Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#F0EDEC] rounded-xl mb-4 text-xs font-semibold">
                <button
                  onClick={() => setMatrixFilter('all')}
                  className={`flex-1 py-1 px-2 rounded-lg transition-all cursor-pointer ${
                    matrixFilter === 'all' ? 'bg-white text-[#00288E] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todas ({exam.questions.length})
                </button>
                <button
                  onClick={() => setMatrixFilter('marked')}
                  className={`flex-1 py-1 px-2 rounded-lg transition-all cursor-pointer ${
                    matrixFilter === 'marked' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Revisar ({flaggedCount})
                </button>
                <button
                  onClick={() => setMatrixFilter('blank')}
                  className={`flex-1 py-1 px-2 rounded-lg transition-all cursor-pointer ${
                    matrixFilter === 'blank' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Em Branco ({blankCount})
                </button>
              </div>

              {/* Question Number Matrix */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-72 overflow-y-auto p-1">
                {exam.questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = !!answers[q.id];
                  const isFlag = flagged.includes(q.id);

                  if (matrixFilter === 'marked' && !isFlag) return null;
                  if (matrixFilter === 'blank' && isAnswered) return null;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-[#00288E] text-white ring-2 ring-[#712AE2] ring-offset-2 scale-105 shadow-sm'
                          : isAnswered
                          ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                          : isFlag
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-[#F0EDEC] text-slate-700 hover:bg-slate-200'
                      }`}
                      title={`Questão ${q.id} - ${q.discipline}`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>

              {/* Status legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span> Respondida
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Revisão
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Em Branco
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00288E]"></span> Atual
                </span>
              </div>
            </div>

            {/* Candidate Scratchpad */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00288E] text-xl">edit_note</span>
                  <h4 className="font-display font-bold text-sm text-slate-900">Rascunho Rápido</h4>
                </div>
                {currentScratchpad && (
                  <button
                    onClick={() =>
                      setScratchpads((prev) => ({
                        ...prev,
                        [currentQuestion.id]: '',
                      }))
                    }
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                  >
                    Limpar
                  </button>
                )}
              </div>

              <textarea
                value={currentScratchpad}
                onChange={(e) =>
                  setScratchpads((prev) => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value,
                  }))
                }
                rows={4}
                placeholder="Anote fórmulas, deduções, cálculos e lembretes para esta questão..."
                className="w-full p-3 rounded-xl bg-[#F6F3F2] text-slate-800 placeholder:text-slate-400 text-xs focus:bg-white focus:ring-2 focus:ring-[#1E40AF]/20 focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Rascunhos salvos no simulado</span>
                <span className="font-mono">{currentScratchpad.length} carac.</span>
              </div>
            </div>

            {/* Keyboard Shortcuts Reference */}
            <div className="bg-[#F0EDEC] rounded-2xl p-4 text-slate-600 border border-slate-200/50">
              <div className="flex items-center gap-2 mb-2">
                <Keyboard className="w-4 h-4 text-[#712AE2]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Atalhos de Teclado
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg shadow-xs">
                  <span>Opções</span>
                  <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold">1 a 5</kbd>
                </div>
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg shadow-xs">
                  <span>Avançar</span>
                  <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold">→ Setas</kbd>
                </div>
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg shadow-xs">
                  <span>Revisar</span>
                  <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold">R</kbd>
                </div>
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg shadow-xs">
                  <span>Pausar</span>
                  <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-bold">P</kbd>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Finish Confirmation Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Finalizar Simulado Oficial?
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Você possui <strong className="text-rose-600 font-semibold">{blankCount} questões em branco</strong> e{' '}
                <strong className="text-amber-600 font-semibold">{flaggedCount} marcadas para revisão</strong>.
                Ao entregar, suas respostas serão processadas para a nota oficial com gabarito comentado passo a passo.
              </p>
            </div>

            <div className="bg-[#F6F3F2] p-4 rounded-xl space-y-2 text-xs font-medium text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Respondidas:</span>
                <span className="font-bold text-[#00288E]">
                  {answeredCount} de {exam.questions.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tempo Decorrido:</span>
                <span className="font-mono font-bold text-slate-900">{formatTime(timeSpent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exame Avaliado:</span>
                <span className="font-semibold text-slate-900">{exam.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                Continuar Prova
              </button>
              <button
                onClick={() => {
                  setShowFinishModal(false);
                  onFinishExam({
                    exam,
                    answers,
                    flagged,
                    timeSpentSeconds: timeSpent,
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
              >
                Sim, Entregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
