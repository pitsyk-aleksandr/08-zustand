// ==========================================================================================
// /notes/[id] – сторінка деталей однієї нотатки (динамічний маршрут).
// ------------------------------------------------------------------------------------------
// Клієнський компонент, який відповідає за відображення деталей однієї нотатки за її id.
// ------------------------------------------------------------------------------------------
// На цій сторінці відображається повна інформація про одну нотатку за її id.
// ==========================================================================================

'use client';

// Імпорт модуля зі стилями компонента
import css from './NotePreview.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal/Modal';

// Імпорт функції для HTTP-запроса - отримання деталей однієї нотатки за її ідентифікатором
import { fetchNoteById } from '@/lib/api';

const NotePreviewClient = () => {
  // Отримання параметру з URL
  const { id } = useParams<{ id: string }>();

  // Запуск роутера
  const router = useRouter();

  // Зачинення вікна - повернення на попередній маршрут URL
  const closeModal = () => router.back();

  const {
    data: note,
    // isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  //   if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  //   const formattedDate = note.updatedAt
  //     ? `Updated at: ${note.updatedAt}`
  //     : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
      <button onClick={closeModal} className={css.backBtn}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreviewClient;
