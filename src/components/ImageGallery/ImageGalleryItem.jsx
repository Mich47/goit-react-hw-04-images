import { PropTypes } from 'prop-types';
import * as ReactDOM from 'react-dom';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { ImageStyled, ImageGalleryItemStyled } from './ImageGallery.styled';

export const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModalForm = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <ImageGalleryItemStyled>
      <ImageStyled
        src={src}
        alt={alt}
        onClick={handleToggleModalForm}
        loading="lazy"
      />
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal onClose={handleToggleModalForm}>
            <img src={largeImageURL} alt={alt} />
          </Modal>,
          document.querySelector('#modal-root')
        )}
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
