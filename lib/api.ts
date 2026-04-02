// API для роботи з нотатками
// ==========================================================================================
// Функції для виконання HTTP-запитів
// ==========================================================================================
// ------------------------------------------------------------------------------------------
// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера.
// Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// ------------------------------------------------------------------------------------------
// createNote: має виконувати запит для створення нової нотатки на сервері.
// Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// ------------------------------------------------------------------------------------------
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором.
// Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
// ------------------------------------------------------------------------------------------

// Імпорт бібліотеки axios
import axios from 'axios';

// Імпорт інтерфейсів
import type { Note, NoteFormValues } from '@/types/note';

// Встановлюємо базовий URL для всіх запитів axios
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

// Отримуємо значення змінної оточення (з файлу .env)
// Не забуваємо додати .env в файл .gitignore !!!
// Додатково треба додати в Versel (Settings → Environment Variables)
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const myAuthorization = 'Bearer ' + myKey;
// Встановлюємо в header запиту - авторизацію
axios.defaults.headers.common['Authorization'] = myAuthorization;

// Приклад дефолтного параметру
// axios.defaults.params = {
//   orientation: 'landscape',
// };

// Типізація відповіді Get-запиту від Axios - згідно структури бекенда :
// https://notehub-public.goit.study/api/docs/#/Notes/getNote
interface GetNotesHttpResponse {
  notes: Note[]; // Відповідь містить масив нотаток у властивості results
  totalPages: number; // Загальна кількість сторінок результатів
}

// Типізація відповіді Get-запиту за id від Axios :
type GetNotesByIdHttpResponse = Note; // Відповідь містить нотатку

// Типізація відповіді Delete-запиту від Axios :
type DeleteNotesHttpResponse = Note; // Відповідь містить нотатку

// Типізація відповіді Post-запиту від Axios :
type PostNotesHttpResponse = Note; // Відповідь містить нотатку

// ==========================================================================================
// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера.
// Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук)
// ==========================================================================================
// Структура запиту :
// ------------------------------------------------------------------------------------------
// https://notehub-public.goit.study/api/notes?search=example_search&tag=Work&page=2&perPage=10&sortBy=updated
// ------------------------------------------------------------------------------------------
// Базовий URL
// https://notehub-public.goit.study/api/notes
// ------------------------------------------------------------------------------------------
// Search notes by title or content - Пошук нотаток по заголовку або контенту
// search=example_search
// ------------------------------------------------------------------------------------------
// Filter notes by tag - Фільтрація по тегу (не обов'язково !)
// tag=Work
// ------------------------------------------------------------------------------------------
// Page number for pagination - Номер сторінки для пагінації
// page=2
// ------------------------------------------------------------------------------------------
// Number of notes per page - Кількість нотаток на сторінці
// perPage=10
// ------------------------------------------------------------------------------------------
// Sort notes by created or updated field - Сортування за часом створення адо оновлення
// (не обов'язково !)
// sortBy=updated
// ------------------------------------------------------------------------------------------

export async function fetchNotes(
  nameSearch: string,
  pageCurrent: number = 1
): Promise<GetNotesHttpResponse> {
  const options = {
    // method: 'GET',
    // headers: {
    //   // axios автоматично встановлює заголовок Accept: application/json для запитів,
    //   // які очікують JSON-відповідь, тому його можна не вказувати явно.
    //   // accept: 'application/json',
    //   Authorization: myAuthorization,
    // },
    // Додаткові параметри запиту Get
    params: {
      search: nameSearch,
      page: pageCurrent,
      perPage: 12,
    },
  };

  // Виконуємо HTTP-запит
  const response = await axios.get<GetNotesHttpResponse>('/notes', options);
  // console.log('Fetch - GET :');
  // console.log('response.data.notes', response.data.notes);
  // console.log('totalPages', response.data.totalPages);

  // Повертаємо значення notes та totalPages відповіді
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}
// ==========================================================================================

// ==========================================================================================
// fetchNotesByTag : запит для отримання колекції нотаток із сервера з фільтрацією по тегу.
// Підтримує пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук)
// ==========================================================================================
// Структура запиту :
// ------------------------------------------------------------------------------------------
// https://notehub-public.goit.study/api/notes?search=example_search&tag=Work&page=2&perPage=10&sortBy=updated
// ------------------------------------------------------------------------------------------
// Базовий URL
// https://notehub-public.goit.study/api/notes
// ------------------------------------------------------------------------------------------
// Search notes by title or content - Пошук нотаток по заголовку або контенту
// search=example_search
// ------------------------------------------------------------------------------------------
// Filter notes by tag - Фільтрація по тегу (не обов'язково !)
// tag=Work
// ------------------------------------------------------------------------------------------
// Page number for pagination - Номер сторінки для пагінації
// page=2
// ------------------------------------------------------------------------------------------
// Number of notes per page - Кількість нотаток на сторінці
// perPage=10
// ------------------------------------------------------------------------------------------
// Sort notes by created or updated field - Сортування за часом створення адо оновлення
// (не обов'язково !)
// sortBy=updated
// ------------------------------------------------------------------------------------------

export async function fetchNotesByTag(
  nameSearch: string,
  tag: string = 'all',
  pageCurrent: number = 1
): Promise<GetNotesHttpResponse> {
  let options;
  if (tag === 'all') {
    options = {
      // method: 'GET',
      // headers: {
      //   // axios автоматично встановлює заголовок Accept: application/json для запитів,
      //   // які очікують JSON-відповідь, тому його можна не вказувати явно.
      //   // accept: 'application/json',
      //   Authorization: myAuthorization,
      // },
      // Додаткові параметри запиту Get
      params: {
        search: nameSearch,
        page: pageCurrent,
        perPage: 12,
      },
    };
  } else {
    options = {
      // method: 'GET',
      // headers: {
      //   // axios автоматично встановлює заголовок Accept: application/json для запитів,
      //   // які очікують JSON-відповідь, тому його можна не вказувати явно.
      //   // accept: 'application/json',
      //   Authorization: myAuthorization,
      // },
      // Додаткові параметри запиту Get
      params: {
        search: nameSearch,
        page: pageCurrent,
        tag: tag,
        perPage: 12,
      },
    };
  }

  // Виконуємо HTTP-запит
  const response = await axios.get<GetNotesHttpResponse>('/notes', options);
  // console.log('Fetch - GET :');
  // console.log('response.data.notes', response.data.notes);
  // console.log('totalPages', response.data.totalPages);

  // Повертаємо значення notes та totalPages відповіді
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}
// ==========================================================================================

// ==========================================================================================
// fetchNoteById : для отримання деталей однієї нотатки за її ідентифікатором..
// ==========================================================================================
export async function fetchNoteById(noteId: string): Promise<GetNotesByIdHttpResponse> {
  if (noteId !== '') {
    // const options = {
    //   // method: 'GET',
    //   // headers: {
    //   //   // axios автоматично встановлює заголовок Accept: application/json для запитів,
    //   //   // які очікують JSON-відповідь, тому його можна не вказувати явно.
    //   //   // accept: 'application/json',
    //   //   Authorization: myAuthorization,
    //   },
    // };

    // Виконуємо HTTP-запит
    const response = await axios.get<GetNotesByIdHttpResponse>(`/notes/${noteId}`);
    // console.log('FetchById - GET :');
    // console.log('response.data', response.data);

    // Повертаємо значення note відповіді - деталі однієї нотатки
    return response.data;
  } else {
    // Створюємо та викидаємо помилку, якщо noteId не передано або є порожнім рядком
    throw new Error('Note ID is required for deletion');
  }
}
// ==========================================================================================

// ==========================================================================================
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором.
// Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
// ==========================================================================================
// Структура запиту :
// ------------------------------------------------------------------------------------------
// https://notehub-public.goit.study/api/notes/65ca67e7ae7f10c88b598384
// ------------------------------------------------------------------------------------------
// Базовий URL
// https://notehub-public.goit.study/api/notes
// ------------------------------------------------------------------------------------------
// Ідентифікатор запису для видалення
// "id": string    "65ca67e7ae7f10c88b598384"
// ------------------------------------------------------------------------------------------
export async function deleteNote(noteId: string): Promise<DeleteNotesHttpResponse> {
  if (noteId !== '') {
    // const options = {
    //   // method: 'DELETE',
    //   headers: {
    //     // axios автоматично встановлює заголовок Content-Type: application/json для запитів,
    //     // які містять тіло (наприклад, POST або PUT), тому його можна не вказувати явно.
    //     // accept: 'application/json',
    //     Authorization: myAuthorization,
    //   },
    // };

    // Виконуємо HTTP-запит на видалення запису
    const response = await axios.delete<DeleteNotesHttpResponse>(`/notes/${noteId}`);
    // console.log('Delete :');
    // console.log('response.data.note', response.data);

    // Повертаємо інформацію про видалену нотатку у відповіді
    return response.data;
  } else {
    throw new Error('Note ID is required for deletion');
  }
}
// ==========================================================================================

// ==========================================================================================
// createNote: має виконувати запит для створення нової нотатки на сервері.
// Приймає вміст нової нотатки та повертає створену нотатку у відповіді
// ==========================================================================================
// curl -X 'POST' \
//   'https://notehub-public.goit.study/api/notes' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//      "title": "Sample Note",
//      "content": "",
//      "tag": "Todo"
//   }'
// ------------------------------------------------------------------------------------------
// Базовий URL
// https://notehub-public.goit.study/api/notes
// ------------------------------------------------------------------------------------------
export async function createNote(noteCreate: NoteFormValues): Promise<PostNotesHttpResponse> {
  // const options = {
  //   headers: {
  //     // accept: 'application/json',
  //     Authorization: myAuthorization,
  //   },
  // };

  // Виконуємо HTTP-запит на додавання нового запису
  const response = await axios.post<PostNotesHttpResponse>('/notes', noteCreate);
  // console.log('Add new - POST :');
  // console.log('response.data', response.data);

  // Повертаємо інформацію про видалену нотатку у відповіді
  return response.data;
}
// ==========================================================================================

// ========== Приклад з конспекта ================================
// import axios from 'axios';

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   categoryId: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type NoteListResponse = {
//   notes: Note[];
//   total: number;
// };

// axios.defaults.baseURL = 'https://next-v1-notes-api.goit.study';

// export const getNotes = async () => {
//   const res = await axios.get<NoteListResponse>('/notes');
//   return res.data;
// };

// export const getSingleNote = async (id: string) => {
//   const res = await axios.get<Note>(`/notes/${id}`);
//   return res.data;
// };
