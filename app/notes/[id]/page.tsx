// ==========================================================================================
// /notes/[id] – сторінка деталей однієї нотатки (динамічний маршрут).
// ------------------------------------------------------------------------------------------
// Серверний компонент, який відповідає за відображення деталей однієї нотатки за її id.
// ------------------------------------------------------------------------------------------
// На цій сторінці проводиться виклик  на сервері для отримання даних нотатки за її id,
// а потім ці дані передаються клієнтському компоненту для відображення.
// ==========================================================================================

// Імпортуємо Компонент з Next.js
import type { Metadata } from 'next';
// Встановлюємо заголовок сторінки
export const metadata: Metadata = {
  title: 'Note Details',
};

// Імпорт
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

// Імпорт клієнтського компонента для відображення деталей нотатки
import NoteDetailsClient from './NoteDetails.client';

// Імпорт функції для HTTP-запроса - отримання деталей однієї нотатки за її ідентифікатором
import { fetchNoteById } from '@/lib/api';

// Прототип типу Props для компонента NoteDetails, який приймає об’єкт params з id нотатки
type Props = {
  params: Promise<{ id: string }>;
};

// Серверний Компонент NoteDetails, який отримує id нотатки з параметрів маршруту,
// виконує запит на сервер для отримання деталей нотатки,
// і передає ці дані клієнтському компоненту NoteDetailsClient для відображення.
const NoteDetails = async ({ params }: Props) => {
  // Отримуємо id нотатки з параметрів маршруту
  const { id } = await params;

  // Створюємо екземпляр QueryClient для роботи з кешем React Query
  const queryClient = new QueryClient();

  // Виконуємо запит на сервер для отримання деталей нотатки за її id
  // і зберігаємо результат у кеші React Query
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  // Компонент HydrationBoundary використовується для гідратації даних,
  // отриманих на сервері, на клієнті.
  // Він приймає стан, який був отриманий на сервері (dehydrate(queryClient)),
  // і забезпечує його доступність для клієнтського компонента.
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
