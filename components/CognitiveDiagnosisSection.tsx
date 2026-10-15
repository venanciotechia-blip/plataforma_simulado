'use client';

import React from 'react';
import { ArrowRight, TrendingUp, Play, Zap, AlertCircle } from 'lucide-react';

interface CognitiveDiagnosisSectionProps {
  onGoToFullDashboard: () => void;
  onStartReinforcement: (topic: string, count: number) => void;
}

export default function CognitiveDiagnosisSection({
  onGoToFullDashboard,
  onStartReinforcement,
}: CognitiveDiagnosisSectionProps) {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00288E]"></span>
            <span className="text-xs tracking-wider uppercase text-[#00288E] font-bold">
              Diagnóstico Cognitivo
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight">
            Painel de Desempenho & Evolução
          </h2>
        </div>
        <button
          onClick={onGoToFullDashboard}
          className="inline-flex items-center gap-1.5 text-[#00288E] hover:text-[#1E40AF] font-semibold text-sm cursor-pointer self-start md:self-auto"
        >
          <span>Acessar Relatório Completo de Aluno</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics Bento Grid (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* General Precision KPI Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Taxa Geral de Precisão
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +6.2% este mês
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#121212]">
                78.4%
              </span>
              <span className="text-xs text-slate-400">/ 1.420 questões</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Você está situado no decil superior (top 8%) dos candidatos que prestam simulados para a mesma carreira e polo regional.
            </p>
          </div>

          {/* Mini Area Chart */}
          <div className="mt-6 pt-4 bg-[#F6F3F2] rounded-2xl p-4 border border-slate-200/50">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Últimos 6 simulados</span>
              <span className="font-bold text-[#00288E]">Consistência Alta</span>
            </div>
            <svg className="w-full h-16 text-[#00288E]" fill="none" viewBox="0 0 240 60">
              <path
                d="M0 45 C 40 40, 60 50, 100 30 C 140 10, 180 25, 240 12 L 240 60 L 0 60 Z"
                fill="currentColor"
                fillOpacity="0.12"
              ></path>
              <path
                d="M0 45 C 40 40, 60 50, 100 30 C 140 10, 180 25, 240 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <circle cx="240" cy="12" fill="currentColor" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* TRI Algorithm Estimator Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Simulado Mais Recente
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-[#00288E] text-xs font-semibold">
                ENEM Modelo INEP
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#00288E]">
                742
              </span>
              <span className="text-xs text-slate-400">pontos TRI média</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Padrão de resposta coerente: alto índice de acerto nos itens fáceis e médios com baixa penalidade pelo filtro anti-chute.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">Margem SISU para Medicina</span>
              <span className="font-bold text-slate-900">Meta: 790</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00288E] to-[#712AE2] w-[93%] rounded-full"></div>
            </div>
            <span className="text-xs text-slate-500 block text-right font-medium">
              Diferencial restante: +48 pontos
            </span>
          </div>
        </div>

        {/* Improvement Areas / Recommended Review */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Pontos de Atenção
              </span>
              <AlertCircle className="w-4 h-4 text-rose-600" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-2">
              Revisão Recomendada
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Itens classificados como &quot;Alta Incidência / Baixo Rendimento Pessoal&quot;:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Termodinâmica Clássica</span>
                  <span className="text-[11px] text-slate-500">Física • 43% acertos</span>
                </div>
                <button
                  onClick={() => onStartReinforcement('Termodinâmica Clássica', 15)}
                  className="px-2.5 py-1 rounded-xl bg-white text-xs font-bold text-rose-700 hover:bg-rose-600 hover:text-white transition-colors border border-rose-200 cursor-pointer shadow-xs"
                >
                  Praticar 15q
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Atos Administrativos (FGV)</span>
                  <span className="text-[11px] text-slate-500">Direito • 51% acertos</span>
                </div>
                <button
                  onClick={() => onStartReinforcement('Atos Administrativos', 20)}
                  className="px-2.5 py-1 rounded-xl bg-white text-xs font-bold text-amber-800 hover:bg-amber-600 hover:text-white transition-colors border border-amber-200 cursor-pointer shadow-xs"
                >
                  Praticar 20q
                </button>
              </div>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 mt-4 block">
            Algoritmo adaptativo reajustado a cada 10 resoluções.
          </span>
        </div>
      </div>

      {/* Performance Breakdown by Subject Area (Horizontal Bar Matrix) */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xs border border-slate-100 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
          <h3 className="font-display font-bold text-lg text-slate-900">
            Progresso Consolidado por Competência
          </h3>
          <span className="text-xs text-slate-400">Atualizado hoje às 14:32</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Area 1: Matemática */}
          <div className="p-4 rounded-2xl bg-[#F6F3F2] flex flex-col justify-between border border-slate-200/50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900">Matemática</span>
                <span className="font-display font-bold text-base text-[#00288E]">88%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-3">
                <div className="h-full bg-[#00288E] w-[88%] rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-slate-500">320 questões respondidas</span>
          </div>

          {/* Area 2: Natureza */}
          <div className="p-4 rounded-2xl bg-[#F6F3F2] flex flex-col justify-between border border-slate-200/50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900">C. da Natureza</span>
                <span className="font-display font-bold text-base text-[#712AE2]">72%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-3">
                <div className="h-full bg-[#712AE2] w-[72%] rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-slate-500">285 questões respondidas</span>
          </div>

          {/* Area 3: Humanas */}
          <div className="p-4 rounded-2xl bg-[#F6F3F2] flex flex-col justify-between border border-slate-200/50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900">C. Humanas</span>
                <span className="font-display font-bold text-base text-[#00288E]">84%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-3">
                <div className="h-full bg-[#00288E] w-[84%] rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-slate-500">410 questões respondidas</span>
          </div>

          {/* Area 4: Redação */}
          <div className="p-4 rounded-2xl bg-[#F6F3F2] flex flex-col justify-between border border-slate-200/50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900">Redação Dissertativa</span>
                <span className="font-display font-bold text-base text-[#712AE2]">920 pts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-3">
                <div className="h-full bg-[#712AE2] w-[92%] rounded-full"></div>
              </div>
            </div>
            <span className="text-xs text-slate-500">8 redações avaliadas</span>
          </div>
        </div>
      </div>

      {/* High Impact Final Call to Action */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00288E] to-[#1E40AF] p-8 lg:p-14 text-white shadow-[0_20px_50px_-10px_rgba(0,40,142,0.3)]">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/25 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold mb-4 border border-white/20">
            Ciclo de Simulados 2025
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
            Pronto para elevar seu padrão de notas e garantir sua vaga?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 mb-8 leading-relaxed">
            Crie um cronograma personalizado de simulados cronometrados com base na data da sua prova e receba diagnósticos semanais da sua evolução.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToFullDashboard}
              className="inline-flex items-center gap-2 bg-white text-[#00288E] hover:bg-indigo-50 font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Criar Plano de Estudos Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onStartReinforcement('Demonstração TRI', 5)}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Ver Demonstração da TRI</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
