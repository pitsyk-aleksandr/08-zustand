import type { Metadata } from 'next';

// Імпорт шрифтів з Google Fonts за допомогою Next.js
import { Roboto } from 'next/font/google';

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

// Налаштування шрифтів та їхніх властивостей, таких як вага, підмножини та змінні CSS для використання в стилях.
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
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
      <body className={roboto.variable}>
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
