// ==========================================================================================
// not-found.tsx - це спеціальний файл у Next.js, який використовується для відображення
// сторінки 404, коли користувач намагається отримати доступ до неіснуючої сторінки.
// ==========================================================================================

// Імпорт стилів для сторінки 404
import css from './Home.module.css';

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
