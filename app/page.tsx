'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExamCategories from '@/components/ExamCategories';
import LiveSimulatorPreview from '@/components/LiveSimulatorPreview';
import CognitiveDiagnosisSection from '@/components/CognitiveDiagnosisSection';
import SimulatorView from '@/components/SimulatorView';
import ResultsView from '@/components/ResultsView';
import DashboardView from '@/components/DashboardView';
import Footer from '@/components/Footer';
import { EXAM_CATEGORIES, ExamCategory } from '@/lib/examData';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'simulator' | 'dashboard' | 'categories'>('home');
  const [selectedExamId, setSelectedExamId] = useState<string>('enem');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Results state when an exam is completed
  const [examResults, setExamResults] = useState<{
    exam: ExamCategory;
    answers: Record<number, string>;
    flagged: number[];
    timeSpentSeconds: number;
  } | null>(null);

  // Find currently selected exam
  const currentExam = EXAM_CATEGORIES.find((e) => e.id === selectedExamId) || EXAM_CATEGORIES[0];

  // Start exam handler
  const handleStartExam = (examId?: string) => {
    if (examId) {
      setSelectedExamId(examId);
    }
    setExamResults(null);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exam completion handler
  const handleFinishExam = (results: {
    exam: ExamCategory;
    answers: Record<number, string>;
    flagged: number[];
    timeSpentSeconds: number;
  }) => {
    setExamResults(results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start reinforcement test for a specific topic
  const handleStartReinforcement = (topic: string, count: number) => {
    // Select the best matching exam for the topic
    if (topic.includes('Física') || topic.includes('Circuitos') || topic.includes('Termodinâmica')) {
      setSelectedExamId('enem');
    } else if (topic.includes('Química') || topic.includes('Estequiometria')) {
      setSelectedExamId('unicamp');
    } else if (topic.includes('Atos') || topic.includes('Direito')) {
      setSelectedExamId('policia-federal');
    } else {
      setSelectedExamId('enem');
    }
    setExamResults(null);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F8] text-[#121212]">
      {/* Fixed Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setExamResults(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartNewSimulado={() => handleStartExam(selectedExamId)}
        selectedExamId={selectedExamId}
        onSelectExamId={(id) => {
          setSelectedExamId(id);
          handleStartExam(id);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {/* SIMULATOR VIEW (When activeTab is 'simulator' and no results yet) */}
        {activeTab === 'simulator' && !examResults && (
          <SimulatorView
            exam={currentExam}
            onFinishExam={handleFinishExam}
            onExit={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* RESULTS VIEW (When exam is finished) */}
        {activeTab === 'simulator' && examResults && (
          <ResultsView
            results={examResults}
            onRestart={() => {
              setExamResults(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToDashboard={() => {
              setActiveTab('dashboard');
              setExamResults(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectOtherExam={() => {
              setActiveTab('categories');
              setExamResults(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* DASHBOARD VIEW (Ranking & Desempenho) */}
        {activeTab === 'dashboard' && (
          <DashboardView
            onStartReinforcement={handleStartReinforcement}
            onReviewExam={(examName) => {
              handleStartExam('enem');
            }}
          />
        )}

        {/* CATEGORIES VIEW */}
        {activeTab === 'categories' && (
          <div className="pt-10">
            <ExamCategories
              onSelectExam={(id) => handleStartExam(id)}
              searchFilter={searchQuery}
            />
          </div>
        )}

        {/* HOME PORTAL VIEW (Default) */}
        {activeTab === 'home' && (
          <div className="flex flex-col w-full">
            {/* Hero Section with Search and Fast Action */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedExamId={selectedExamId}
              setSelectedExamId={setSelectedExamId}
              onStartExam={(id) => handleStartExam(id)}
            />

            {/* Exam Categories Grid */}
            <ExamCategories
              onSelectExam={(id) => handleStartExam(id)}
              searchFilter={searchQuery}
            />

            {/* Live Interactive Simulator Section (Matches Image 1) */}
            <LiveSimulatorPreview
              onOpenFullSimulator={() => handleStartExam('enem')}
            />

            {/* Cognitive Diagnosis & Dashboard Preview (Matches Image 1) */}
            <CognitiveDiagnosisSection
              onGoToFullDashboard={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartReinforcement={handleStartReinforcement}
            />
          </div>
        )}
      </main>

      {/* Persistent Academic Footer */}
      <Footer />
    </div>
  );
}
