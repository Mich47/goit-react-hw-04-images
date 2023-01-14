import { PropTypes } from 'prop-types';
import { ImageGalleryListStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onOpen }) => {
  return (
    <ImageGalleryListStyled>
      {/* Набір <li> із зображеннями */}
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
            onOpen={onOpen}
          />
        );
      })}
    </ImageGalleryListStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpen: PropTypes.func,
};
