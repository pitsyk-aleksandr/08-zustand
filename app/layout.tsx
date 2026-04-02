import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

// Імпорт компонента TanStackProvider
// Підключення провайдера React Query,
// щоб усі клієнтські компоненти могли використовувати useQuery, кеш і мутації.
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

// Імпорт глобальних стилів
import './globals.css';

// Імпорт компонента Header
import Header from '@/components/Header/Header';
// Імпорт компонента Footer
import Footer from '@/components/Footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub - Your Personal Note-Taking App - Powered by Next.js and React Query',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
