// error.tsx завжди рендериться на клієнті, тому обов’язково має містити директиву 'use client'
'use client';

// До компонента передається об’єкт помилки та функція для скидання стану помилки,
// яка дозволяє користувачу спробувати знову отримати список нотаток.
// Компонент відображає повідомлення про помилку та кнопку для повторної спроби.

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
