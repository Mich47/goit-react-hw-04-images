import { useEffect, useRef, useState } from 'react';
import { STATUS } from 'constants/status.constants';
import { getPosts } from 'services/posts.service';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUS.idle); // 'idle', 'loading', 'success', 'error',
  const firstStart = useRef(true);
  const totalPages = useRef(0);

  useEffect(() => {
    console.log('useEffect ');
    if (firstStart.current) {
      firstStart.current = false;
      return;
    }
    fetchData(page, query);
  }, [page, query]);

  const fetchData = async (page, query) => {
    setStatus(STATUS.loading);
    // Параметри URI
    const params = {
      q: query,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    };

    try {
      const data = await getPosts(params);
      const { hits, total, totalHits } = data;

      //Визначаємо кількість картинок у запиті
      let perPage = 20;
      if (params.per_page) {
        perPage = params.per_page;
      }

      //Деколи з сервера приходять однакові значення кількості фото і сторінок
      //Наприклад на запит doges, ukr
      //Якщо це сталося, то визначаємо вручну кількість сторінок
      //В іншому випадку беремо значення від бекенду
      totalPages.current =
        totalHits === total ? Math.ceil(total / perPage) : totalHits;

      setImages(prev => [
        ...prev,
        ...hits.map(({ id, largeImageURL, tags, webformatURL }) => ({
          id,
          largeImageURL,
          tags,
          webformatURL,
        })),
      ]); // Дані додаємо у масив

      setStatus(STATUS.success);
    } catch (error) {
      console.log('error ->', error);
      setStatus(STATUS.error);
    }
  };

  const handleSubmitForm = (event, searchImage) => {
    event.preventDefault();
    // Якщо пошуковий запит не змінився, нічого не робимо
    if (searchImage === query) return;

    setImages([]);
    setPage(1);
    setQuery(searchImage);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleAutoScrollBottom = status => {
    if (status === STATUS.success) {
      setTimeout(() => {
        document.body.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 500);
    }
  };

  // Авто-прокрутка униз
  handleAutoScrollBottom(status);

  return (
    <>
      {/* status - для того щоб робити кнопку пошуку неактивною */}
      <Searchbar status={status} onSubmitForm={handleSubmitForm} />
      <ImageGallery images={images} />
      {page < totalPages.current && status === STATUS.success && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      <Loader status={status} />
    </>
  );
};
