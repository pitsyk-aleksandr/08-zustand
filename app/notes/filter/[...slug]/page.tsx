// ==========================================================================================
// /notes/filter/[...slug] – сторінка списку нотаток з можливістю фільтрування
// ------------------------------------------------------------------------------------------
// Серверний компонент, який відповідає за відображення списку нотаток.
// ------------------------------------------------------------------------------------------
// На цій сторінці проводиться виклик  на сервері для отримання даних нотаток,
// а потім ці дані передаються клієнтському компоненту для відображення.
// ==========================================================================================

// Універсальні маршрути - отримуємо масив
type Props = {
  params: Promise<{ slug: string[] }>;
};

// Імпортуємо Metadata з Next.js
import type { Metadata } from 'next';

// Встановлюємо Метадані, враховуючи параметр з маршруту - фільтрація нотаток
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Notes`,
    description: `Notes filtered by ${slug[0]}`,
    openGraph: {
      title: `Notes`,
      description: `Notes in NoteHub, filtered by ${slug[0]}`,
      url: `https://08-zustand-livid-six.vercel.app/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub picture`,
        },
      ],
      type: 'website',
    },
  };
}

// Імпорт
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

// Імпорт клієнтського компонента для відображення деталей нотатки
import NotesPage from './Notes.client';

// Імпорт функції для HTTP-запроса
import { fetchNotesByTag } from '@/lib/api';

// Серверний Компонент Notes, який отримує дані нотаток на сервері
// і передає їх клієнтському компоненту NotesClient для відображення.
export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? 'all' : slug[0];

  // Порожній рядок для початкового запиту
  const query = '';
  // Поточна сторінка для запиту, встановлюємо на 1 за замовчуванням
  const page = 1;

  // Створюємо екземпляр QueryClient для роботи з кешем React Query
  const queryClient = new QueryClient();

  // Виконуємо запит на сервер для отримання списку нотаток і зберігаємо результат у кеші React Query
  await queryClient.prefetchQuery({
    queryKey: ['notes', query, tag, page],
    queryFn: () => fetchNotesByTag(query, tag, page),
  });

  // Компонент HydrationBoundary використовується для гідратації даних, отриманих на сервері, на клієнті.
  // Він приймає стан, який був отриманий на сервері (dehydrate(queryClient)),
  // і забезпечує його доступність для клієнтського компонента.
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
