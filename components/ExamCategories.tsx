'use client';

import React, { useState } from 'react';
import { EXAM_CATEGORIES, ExamCategory } from '@/lib/examData';
import { ArrowRight, Play, BookOpen, Award, CheckCircle, Flame, Sparkles } from 'lucide-react';

interface ExamCategoriesProps {
  onSelectExam: (examId: string) => void;
  searchFilter?: string;
}

export default function ExamCategories({ onSelectExam, searchFilter = '' }: ExamCategoriesProps) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');

  // Filter exams by category and search filter
  const filteredExams = EXAM_CATEGORIES.filter((exam) => {
    const matchesCategory =
      activeCategoryFilter === 'todos' ||
      (activeCategoryFilter === 'vestibulares' && exam.type === 'Vestibulares') ||
      (activeCategoryFilter === 'olimpiadas' && exam.type === 'Olimpíadas Científicas') ||
      (activeCategoryFilter === 'concursos' && exam.type === 'Concursos Públicos') ||
      (activeCategoryFilter === 'ensino-medio' && exam.type === 'Ensino Médio');

    const matchesSearch =
      !searchFilter ||
      exam.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      exam.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      exam.questions.some(
        (q) =>
          q.discipline.toLowerCase().includes(searchFilter.toLowerCase()) ||
          q.topic.toLowerCase().includes(searchFilter.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="categorias" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 -mt-10 relative z-20 mb-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]"></span>
            <span className="text-xs tracking-wider uppercase text-[#712AE2] font-bold">
              Matrizes Avaliativas Oficiais
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight">
            Categorias de Exames & Simulados Gratuitos
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Testes parametrizados conforme o estilo de cobrança, penalidade por chute e calibragem estatística individual de cada banca examinadora.
          </p>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0EDEC] rounded-xl self-start md:self-end">
          {[
            { id: 'todos', label: 'Todos os 9 Exames' },
            { id: 'ensino-medio', label: 'ENEM' },
            { id: 'vestibulares', label: 'Vestibulares' },
            { id: 'olimpiadas', label: 'Olimpíadas' },
            { id: 'concursos', label: 'Concursos' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === tab.id
                  ? 'bg-white text-[#00288E] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of the 9 Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => {
          const isFeatured = exam.id === 'enem';

          return (
            <div
              key={exam.id}
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                isFeatured
                  ? 'border-purple-200 shadow-[0_10px_30px_-4px_rgba(113,42,226,0.15)] ring-2 ring-[#712AE2]/20 hover:shadow-[0_20px_40px_-6px_rgba(113,42,226,0.22)]'
                  : 'border-slate-100 shadow-[0_4px_24px_-2px_rgba(30,64,175,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(30,64,175,0.12)] hover:-translate-y-0.5'
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 right-5">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#712AE2] to-[#1E40AF] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    Mais Acessado
                  </span>
                </div>
              )}

              <div>
                {/* Header with icon and badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isFeatured ? '#EADDFF' : '#F6F3F2',
                      color: isFeatured ? '#25005A' : '#00288E',
                    }}
                  >
                    <span className="material-symbols-outlined text-2xl">{exam.icon}</span>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: exam.colorScheme.bgBadge,
                      color: exam.colorScheme.textBadge,
                    }}
                  >
                    {exam.badge}
                  </span>
                </div>

                {/* Title & Full Name */}
                <div className="mb-2">
                  <h3 className="font-display font-bold text-xl text-[#121212] group-hover:text-[#00288E] transition-colors">
                    {exam.name}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 block truncate">
                    {exam.fullName}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {exam.tagline}
                </p>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <span className="px-2 py-0.5 rounded-md bg-[#F0EDEC] text-slate-700 text-[11px] font-medium">
                    Banca {exam.banca}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F0EDEC] text-slate-700 text-[11px] font-medium">
                    {exam.type}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F0EDEC] text-slate-700 text-[11px] font-medium">
                    {exam.questions.length} questões com gabarito
                  </span>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div
                className="pt-4 rounded-xl p-3"
                style={{
                  backgroundColor: isFeatured ? 'rgba(234, 221, 255, 0.4)' : '#F6F3F2',
                }}
              >
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
                  <span>{exam.totalQuestions} questões no banco</span>
                  <span className="font-bold text-[#00288E]">{exam.averageTRI}</span>
                </div>
                <button
                  onClick={() => onSelectExam(exam.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-sm ${
                    isFeatured
                      ? 'bg-[#712AE2] hover:bg-[#8A4CFC] text-white'
                      : 'bg-[#00288E] hover:bg-[#1E40AF] text-white'
                  }`}
                >
                  <span>Iniciar Simulado {exam.name}</span>
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-800">Nenhum exame encontrado</h3>
          <p className="text-sm text-slate-500 mt-1">
            Não encontramos exames correspondentes à busca &quot;{searchFilter}&quot;.
          </p>
          <button
            onClick={() => setActiveCategoryFilter('todos')}
            className="mt-4 px-4 py-2 bg-indigo-50 text-[#00288E] text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </section>
  );
}
