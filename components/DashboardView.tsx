'use client';

import React, { useState } from 'react';
import { INITIAL_STUDENT_STATS, StudentStats } from '@/lib/examData';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Flag,
  ArrowRight,
  Download,
  AlertTriangle,
  Zap,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  onStartReinforcement: (topic: string, count: number) => void;
  onReviewExam: (examName: string) => void;
}

export default function DashboardView({
  onStartReinforcement,
  onReviewExam,
}: DashboardViewProps) {
  const [stats, setStats] = useState<StudentStats>(INITIAL_STUDENT_STATS);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTarget, setSelectedTarget] = useState('med');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Greeting & Target Meta Bar */}
      <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl pointer-events-none"></div>
        <div className="absolute right-48 -bottom-16 w-64 h-64 rounded-full bg-blue-200/30 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#00288E] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00288E] animate-pulse"></span>
                Diagnóstico em Tempo Real
              </span>
              <span className="text-xs text-slate-400 font-medium">Atualizado há 18 min</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Olá, Mariana Silva{' '}
              <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">
                👋
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Aqui está o raio-x analítico da sua preparação com a metodologia oficial de Teoria de Resposta ao Item (TRI).
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-[#F6F3F2] px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-xs">
              <Calendar className="text-slate-400 w-4 h-4" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="30d">Últimos 30 dias</option>
                <option value="ciclo">Ciclo 2024-2025</option>
                <option value="ano">Visão Geral do Ano</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#00288E] text-white px-4 py-2.5 rounded-xl shadow-xs">
              <Flag className="w-4 h-4 text-indigo-200" />
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="med">ENEM — Medicina Federal (UFRJ / USP)</option>
                <option value="fuvest">FUVEST — 1ª & 2ª Fase Medicina</option>
                <option value="bb">Banco do Brasil — Tecnologia</option>
                <option value="pf">Polícia Federal — Agente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Target Score Bar Overlap */}
        <div className="mt-8 pt-6 bg-[#F6F3F2] rounded-2xl p-5 border border-slate-200/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1E40AF] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-2xl">track_changes</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-bold text-base text-slate-900">
                    Meta de Corte: Medicina Ampla Concorrência
                  </span>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    Zona Competitiva
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Faltam apenas <strong className="text-slate-800 font-bold">41.5 pontos</strong> para alcançar o limiar histórico seguro
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 self-end md:self-auto">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#00288E] tracking-tight">
                {stats.currentTRI}
              </span>
              <span className="font-display font-bold text-slate-400 text-sm">
                / {stats.targetCutoffTRI} TRI
              </span>
            </div>
          </div>

          {/* Progress bar container */}
          <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-[#00288E] to-[#712AE2] h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(stats.currentTRI / stats.targetCutoffTRI) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-2.5 text-xs text-slate-600 font-medium">
            <span>Base Mínima (600 pts)</span>
            <span className="text-[#00288E] font-bold">
              Você está aqui: {stats.currentTRI} (Percentil {stats.nationalPercentile}%)
            </span>
            <span className="font-bold text-slate-900">Meta: {stats.targetCutoffTRI} pts</span>
          </div>
        </div>
      </div>

      {/* 4 Key KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: TRI Estimada */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Nota TRI Estimada
            </span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#00288E]">
              <span className="material-symbols-outlined text-lg">auto_graph</span>
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {stats.currentTRI}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +34.2
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">vs. simulado anterior (734.3)</p>
          </div>

          {/* Sparkline visualization SVG */}
          <div className="pt-2">
            <svg className="w-full h-8 text-[#00288E] overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 100 24">
              <path d="M0 20 L20 18 L40 14 L60 16 L80 8 L100 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              <path d="M0 20 L20 18 L40 14 L60 16 L80 8 L100 3 L100 24 L0 24 Z" fill="currentColor" opacity="0.08" />
            </svg>
          </div>
        </div>

        {/* Card 2: Taxa Global de Acerto */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Taxa Global de Acerto
            </span>
            <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#712AE2]">
              <span className="material-symbols-outlined text-lg">check_circle</span>
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {stats.accuracyRate}%
              </span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Alta precisão
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">1.125 acertos em 1.420 questões</p>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#712AE2] h-full rounded-full" style={{ width: `${stats.accuracyRate}%` }}></div>
          </div>
        </div>

        {/* Card 3: Tempo Médio por Questão */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tempo Médio / Questão
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {stats.avgTimePerQuestion}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                ✓ Meta excelente (≤ 3 min)
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-slate-400 text-[11px] pt-1">
            <span>Mín: 1m 12s</span>
            <span>Méd: 2m 38s</span>
            <span>Máx: 4m 05s</span>
          </div>
        </div>

        {/* Card 4: Simulados Realizados */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Simulados Realizados
            </span>
            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#00288E]">
              <span className="material-symbols-outlined text-lg">verified</span>
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-slate-900">
                {stats.totalSimuladosCount}
              </span>
              <span className="text-xs font-semibold text-slate-500">provas</span>
            </div>
            <div className="mt-2">
              <span className="text-[11px] font-bold text-[#00288E] bg-indigo-50 px-2 py-0.5 rounded-full">
                Top 4.6% Brasil
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">100% com auditoria TRI MoggaCon</p>
        </div>
      </div>

      {/* Main Analytics Grid: Competencies vs Knowledge Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Competency Progression Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 lg:p-8 shadow-xs border border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl text-slate-900">
                  Evolução por Competência TRI
                </h2>
                <span className="material-symbols-outlined text-slate-400 text-lg" title="Métrica calculada com parâmetros a, b, c da TRI">
                  info
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Desempenho comparativo nas 5 áreas estruturais do exame
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#00288E]"></span> Sua Nota Atual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-300"></span> Média dos Aprovados
              </span>
            </div>
          </div>

          {/* Competency Bars */}
          <div className="space-y-5 pt-2">
            {stats.competencies.map((comp, idx) => {
              const isUrgent = comp.score < comp.targetScore - 50;
              const isAhead = comp.score >= comp.targetScore;

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#00288E]">
                        {comp.icon}
                      </span>
                      {comp.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isAhead
                            ? 'bg-emerald-100 text-emerald-800'
                            : isUrgent
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {comp.score.toFixed(1)} pts
                      </span>
                      <span className="text-slate-400 text-xs">(Corte: {comp.targetScore})</span>
                    </div>
                  </div>

                  <div className="relative w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isAhead
                          ? 'bg-[#00288E]'
                          : isUrgent
                          ? 'bg-[#BA1A1A]'
                          : 'bg-[#1E40AF]'
                      }`}
                      style={{ width: `${(comp.score / 1000) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{comp.answered}</span>
                    <span className={`font-semibold ${isAhead ? 'text-emerald-700' : isUrgent ? 'text-rose-700' : 'text-slate-600'}`}>
                      {comp.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pedagogic Coherence Card */}
          <div className="bg-[#F6F3F2] rounded-2xl p-4 sm:p-5 flex items-start gap-4 border border-slate-200/60">
            <div className="p-2.5 rounded-xl bg-white text-[#00288E] shadow-xs shrink-0">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
                Índice de Coerência Pedagógica: 92.4% (Excelente)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sua curva de acertos reflete padrão ótimo: você acerta quase todas as questões fáceis e médias. Não há indícios de penalização severa por chute na régua TRI.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Topic Gaps & Priorities (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Diagnóstico de Tópicos
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Prioridades IA
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Disciplinas com gaps e áreas dominadas</p>
          </div>

          <div className="space-y-4">
            {/* Urgent Topic */}
            <div className="bg-[#F6F3F2] rounded-2xl p-4 space-y-3 border border-rose-200/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-rose-700 font-bold block">
                    Urgente • Física
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-900 mt-0.5">
                    Eletrodinâmica & Circuitos
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs bg-rose-100 text-rose-800 font-bold">
                  52% acerto
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Erros frequentes em Leis de Kirchhoff e associação mista de resistores.
              </p>
              <button
                onClick={() => onStartReinforcement('Eletrodinâmica', 15)}
                className="w-full bg-[#BA1A1A] hover:bg-[#93000A] text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Gerar Simulado de Reforço (15q)</span>
              </button>
            </div>

            {/* Warning Topic */}
            <div className="bg-[#F6F3F2] rounded-2xl p-4 space-y-3 border border-amber-200/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold block">
                    Atenção • Química
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-900 mt-0.5">
                    Estequiometria & Rendimento
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 font-bold">
                  58% acerto
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Dificuldade em cálculos com reagentes impuros e soluções molares.
              </p>
              <button
                onClick={() => onStartReinforcement('Estequiometria', 10)}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Praticar 10 Questões</span>
              </button>
            </div>

            {/* Mastered Topics */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="p-3 rounded-xl bg-[#F6F3F2]/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Genética Mendeliana</h5>
                    <span className="text-[10px] text-emerald-700 font-medium">Biologia • Domínio Pleno</span>
                  </div>
                </div>
                <span className="font-display font-bold text-sm text-emerald-700">89%</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F6F3F2]/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Geometria Espacial</h5>
                    <span className="text-[10px] text-emerald-700 font-medium">Matemática • Domínio Pleno</span>
                  </div>
                </div>
                <span className="font-display font-bold text-sm text-emerald-700">84%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Prescriptive Smart Plan Banner */}
      <div className="bg-gradient-to-r from-[#00288E] via-[#1E40AF] to-[#712AE2] text-white rounded-3xl p-6 lg:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <span className="material-symbols-outlined text-2xl text-emerald-300">psychology_alt</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                  Recomendação do Mentor IA MoggaCon
                </span>
                <span className="text-xs text-indigo-200">• Baseado nos últimos 3 simulados</span>
              </div>
              <p className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
                Dedicar 45 minutos em Circuitos Elétricos hoje elevará sua projeção global TRI em até{' '}
                <span className="text-emerald-300 underline decoration-2 decoration-emerald-300">
                  +22 pontos
                </span>{' '}
                já no próximo teste.
              </p>
              <p className="text-xs sm:text-sm text-indigo-100">
                Mapeamos que 4 das suas 8 questões erradas em Natureza pertenciam à mesma competência estrutural.
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartReinforcement('Circuitos Elétricos', 15)}
            className="shrink-0 bg-white text-[#00288E] hover:bg-indigo-50 font-display font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Iniciar Treino Personalizado</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Historical Simulado Test History & Audit Table */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xs border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">
              Histórico de Simulados Recentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Auditoria completa de erros, acertos e evolução TRI oficial
            </p>
          </div>

          <button
            onClick={() => showToast('Relatório completo exportado com sucesso!')}
            className="bg-[#F6F3F2] hover:bg-[#F0EDEC] text-slate-700 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-200/60 flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Exportar Relatório PDF</span>
          </button>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F6F3F2] text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Data</th>
                <th className="py-3 px-4">Simulado / Edição</th>
                <th className="py-3 px-4">Banca / Formato</th>
                <th className="py-3 px-4 text-center">Acertos</th>
                <th className="py-3 px-4 text-center">Pontuação TRI</th>
                <th className="py-3 px-4">Status / Desempenho</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.history.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-4 px-4 text-slate-500 font-medium whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900">{row.name}</div>
                    <div className="text-xs text-slate-400">{row.subtitle}</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#00288E]">
                      {row.banca}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap font-medium">
                    <span className="font-bold text-slate-900">{row.correctCount}</span>
                    <span className="text-slate-400"> / {row.totalCount}</span>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className="font-display font-bold text-sm text-[#00288E]">
                      {row.triScore}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {row.statusBadge}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onReviewExam(row.name)}
                        className="p-2 rounded-lg text-[#00288E] hover:bg-indigo-50 transition-colors"
                        title="Ver Gabarito Comentado"
                      >
                        <span className="material-symbols-outlined text-lg">fact_check</span>
                      </button>
                      <button
                        onClick={() => onStartReinforcement('Refazer Erros', 10)}
                        className="p-2 rounded-lg text-[#712AE2] hover:bg-purple-50 transition-colors"
                        title="Caderno de Erros"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Exibindo os 4 simulados mais recentes de um total de {stats.totalSimuladosCount}</span>
          <span className="text-[#00288E] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
            Ver histórico completo e cadernos arquivados <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
