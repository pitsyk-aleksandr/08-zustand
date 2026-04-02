// Імпорт компонента Link з Next.js - Для створення посилань
import Link from 'next/link';

// Імпорт стилів з модуля стилів
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Pitsyk Oleksandr</p>
          <p>
            Contact us:
            <Link href="mailto:pitsyk.a@gmail.com"> pitsyk.a@gmail.com</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
