// ==========================================================================================
// /notes/filter/[...slug] – сторінка списку нотаток з можливістю фільтрування
// ------------------------------------------------------------------------------------------
// Серверний компонент, який відповідає за відображення списку нотаток.
// ------------------------------------------------------------------------------------------
// На цій сторінці проводиться виклик  на сервері для отримання даних нотаток,
// а потім ці дані передаються клієнтському компоненту для відображення.
// ==========================================================================================

// Імпортуємо Компонент з Next.js
import type { Metadata } from 'next';
// Встановлюємо заголовок сторінки
export const metadata: Metadata = {
  title: 'Notes',
};

// Імпорт
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

// Імпорт клієнтського компонента для відображення деталей нотатки
import NotesPage from './Notes.client';

// Імпорт функції для HTTP-запроса
import { fetchNotesByTag } from '@/lib/api';

// Універсальні маршрути

type Props = {
  params: Promise<{ slug: string[] }>;
};

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
