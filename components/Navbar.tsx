'use client';

import React from 'react';
import { BookOpen, Search, Bell, Play, Award, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'simulator' | 'dashboard' | 'categories';
  setActiveTab: (tab: 'home' | 'simulator' | 'dashboard' | 'categories') => void;
  onStartNewSimulado: () => void;
  selectedExamId: string;
  onSelectExamId: (id: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onStartNewSimulado,
  selectedExamId,
  onSelectExamId,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#FCF9F8]/85 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Quick Exam Filter */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00288E] to-[#712AE2] flex items-center justify-center text-white shadow-md shadow-indigo-950/10 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl text-[#00288E] tracking-tight">
                  MoggaCon
                </span>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-[#00288E] border border-indigo-100">
                  OFICIAL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Simulados Gratuitos para Provas Nacionais
              </p>
            </div>
          </button>

          {/* Quick Select Exam Dropdown */}
          <div className="hidden xl:flex items-center bg-[#F0EDEC] hover:bg-[#EBE7E7] px-3.5 py-1.5 rounded-full transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg mr-1.5">
              tune
            </span>
            <select
              value={selectedExamId}
              onChange={(e) => onSelectExamId(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2"
            >
              <option value="enem">ENEM 2024 (TRI)</option>
              <option value="fuvest">FUVEST (USP)</option>
              <option value="unicamp">UNICAMP</option>
              <option value="obmep">OBMEP (Matemática)</option>
              <option value="oba">OBA (Astronomia)</option>
              <option value="obf">OBF (Física)</option>
              <option value="banco-do-brasil">Banco do Brasil</option>
              <option value="policia-federal">Polícia Federal</option>
              <option value="prf">PRF (Rodoviária Federal)</option>
            </select>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`font-semibold text-sm rounded-full py-2 px-4 transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-700 hover:text-black hover:bg-[#EBE7E7]'
            }`}
          >
            Explorar Simulados
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`font-semibold text-sm rounded-full py-2 px-4 transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-700 hover:text-black hover:bg-[#EBE7E7]'
            }`}
          >
            Categorias
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`font-semibold text-sm rounded-full py-2 px-4 transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-700 hover:text-black hover:bg-[#EBE7E7]'
            }`}
          >
            Área de Treino
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`font-semibold text-sm rounded-full py-2 px-4 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-700 hover:text-black hover:bg-[#EBE7E7]'
            }`}
          >
            Ranking & Desempenho
          </button>
        </nav>

        {/* Right CTA & Actions */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="relative p-2.5 rounded-full text-slate-600 hover:bg-[#EBE7E7] hover:text-slate-900 transition-colors"
            title="Diagnóstico em tempo real"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onStartNewSimulado}
            className="inline-flex items-center gap-2 bg-[#00288E] hover:bg-[#1E40AF] active:scale-98 text-white font-semibold text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-[0_4px_18px_-2px_rgba(30,64,175,0.25)] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span className="whitespace-nowrap">Novo Simulado</span>
          </button>

          {/* User profile avatar (No login required - Student Identity badge) */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="relative flex items-center pl-1 cursor-pointer group"
            title="Mariana Silva - Estudante Ativo"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#00288E]">
                MS
              </div>
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
              title="Sessão Pública Ativa"
            ></span>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-200 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-semibold text-sm py-2.5 px-3 rounded-lg ${
              activeTab === 'home' ? 'bg-indigo-50 text-[#00288E]' : 'text-slate-700'
            }`}
          >
            Explorar Simulados
          </button>
          <button
            onClick={() => {
              setActiveTab('categories');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-semibold text-sm py-2.5 px-3 rounded-lg ${
              activeTab === 'categories' ? 'bg-indigo-50 text-[#00288E]' : 'text-slate-700'
            }`}
          >
            Categorias de Exames
          </button>
          <button
            onClick={() => {
              setActiveTab('simulator');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-semibold text-sm py-2.5 px-3 rounded-lg ${
              activeTab === 'simulator' ? 'bg-indigo-50 text-[#00288E]' : 'text-slate-700'
            }`}
          >
            Área de Treino (Simulador)
          </button>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left font-semibold text-sm py-2.5 px-3 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-[#00288E]' : 'text-slate-700'
            }`}
          >
            Ranking & Desempenho
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Acesso 100% público e gratuito</span>
            <span className="font-semibold text-emerald-600">Sem Cadastro</span>
          </div>
        </div>
      )}
    </header>
  );
}
