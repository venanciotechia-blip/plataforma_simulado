'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/60 shadow-[0_-1px_12px_rgba(0,0,0,0.02)] mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Academic Credential */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl text-[#00288E]">MoggaCon</span>
            <span className="text-xs bg-indigo-50 border border-indigo-100 text-[#00288E] px-2.5 py-0.5 rounded-full font-semibold">
              Certificação Acadêmica
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 text-center md:text-left max-w-md">
            Plataforma pública de alta precisão avaliativa para ENEM, vestibulares de elite, olimpíadas científicas e concursos nacionais.
          </p>
        </div>

        {/* Legal & Pedagogic Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
          <a
            href="#termos"
            onClick={(e) => {
              e.preventDefault();
              alert('Termos de Uso: Plataforma 100% gratuita, pública e destinada exclusivamente para fins educacionais e simulados preparatórios.');
            }}
            className="hover:text-[#00288E] transition-colors"
          >
            Termos de Uso
          </a>
          <a
            href="#privacidade"
            onClick={(e) => {
              e.preventDefault();
              alert('Política de Privacidade: Nenhum cadastro ou coleta de dados pessoais é obrigatório. Os resultados e anotações do estudante permanecem estritamente no navegador.');
            }}
            className="hover:text-[#00288E] transition-colors"
          >
            Privacidade
          </a>
          <a
            href="#diretrizes"
            onClick={(e) => {
              e.preventDefault();
              alert('Diretrizes Pedagógicas: Questões calibradas pela metodologia oficial da Teoria de Resposta ao Item (TRI) com parâmetros psicométricos do INEP e bancas organizadoras.');
            }}
            className="hover:text-[#00288E] transition-colors"
          >
            Diretrizes Pedagógicas
          </a>
          <a
            href="#suporte"
            onClick={(e) => {
              e.preventDefault();
              alert('Central de Suporte MoggaCon: Dúvidas ou sugestões? Envie para contato@moggacon.edu.br.');
            }}
            className="hover:text-[#00288E] transition-colors"
          >
            Suporte
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} MoggaCon. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
