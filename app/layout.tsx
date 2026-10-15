import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MoggaCon - Simulados Gratuitos para Provas Nacionais',
  description: 'Plataforma pública e gratuita de simulados de alta precisão avaliativa para ENEM, vestibulares de elite, olimpíadas científicas e concursos nacionais com correção TRI e gabarito comentado.',
  openGraph: {
    title: 'MoggaCon - Simulados Gratuitos para Provas Nacionais',
    description: 'Plataforma pública e gratuita de simulados de alta fidelidade para ENEM, vestibulares, olimpíadas e concursos com algoritmo TRI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoggaCon - Simulados Gratuitos para Provas Nacionais',
    description: 'Plataforma pública e gratuita de simulados com correção TRI e gabarito comentado.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-indigo-100 selection:text-indigo-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
