import { Component } from 'react';
import { STATUS } from 'constants/status.constants';
import { getPosts } from 'services/posts.service';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    totalPages: 0,
    query: '',
    status: STATUS.idle, // 'idle', 'loading', 'success', 'error',
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { page, query } = this.state;
    this.setState({ status: STATUS.loading });
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
      const totalPages =
        totalHits === total ? Math.ceil(total / perPage) : totalHits;

      this.setState(prevState => ({
        totalPages,
        images: [
          ...prevState.images,
          ...hits.map(({ id, largeImageURL, tags, webformatURL }) => ({
            id,
            largeImageURL,
            tags,
            webformatURL,
          })),
        ], // Дані додаємо у масив
        status: STATUS.success,
      }));
    } catch (error) {
      console.log('error ->', error);
      this.setState({ status: STATUS.error });
    }
  };

  handleSubmitForm = (event, searchImage) => {
    event.preventDefault();
    const { query } = this.state;
    // Якщо пошуковий запит не змінився, нічого не робимо
    if (searchImage === query) return;

    this.setState({
      images: [],
      page: 1,
      query: searchImage,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleAutoScrollBottom(status) {
    if (status === STATUS.success) {
      setTimeout(() => {
        document.body.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 500);
    }
  }

  render() {
    const { images, page, totalPages, status } = this.state;

    // Авто-прокрутка униз
    this.handleAutoScrollBottom(status);

    return (
      <>
        {/* status - для того щоб робити кнопку пошуку неактивною */}
        <Searchbar status={status} onSubmitForm={this.handleSubmitForm} />
        <ImageGallery images={images} onOpen={this.handleToggleModalForm} />
        {page < totalPages && status === STATUS.success && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        <Loader status={status} />
      </>
    );
  }
}
