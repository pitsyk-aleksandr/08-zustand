// ==========================================================================================
// default.tsx - це файл, який відповідає за відображення сторінки за замовчуванням
// для маршруту /notes/filter/@sidebar.
// ==========================================================================================
import css from './SidebarNotes.module.css';

import Link from 'next/link';

// Імпорт літерального списку тегів
// import { NoteTag } from '@/types/note';

// Масив тегів
const noteTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {noteTags.map(noteTag => (
        <li key={noteTag} className={css.menuItem}>
          <Link href={`/notes/filter/${noteTag}`} className={css.menuLink}>
            {noteTag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
