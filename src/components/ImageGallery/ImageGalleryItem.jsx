import { PropTypes } from 'prop-types';
import * as ReactDOM from 'react-dom';
import { Modal } from 'components/Modal';
import { Component } from 'react';
import { ImageStyled, ImageGalleryItemStyled } from './ImageGallery.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleToggleModalForm = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { src, alt, largeImageURL } = this.props;
    return (
      <ImageGalleryItemStyled>
        <ImageStyled
          src={src}
          alt={alt}
          onClick={this.handleToggleModalForm}
          loading="lazy"
        />
        {isModalOpen &&
          ReactDOM.createPortal(
            <Modal
              src={largeImageURL}
              alt={alt}
              onClose={this.handleToggleModalForm}
            />,
            document.querySelector('#modal-root')
          )}
      </ImageGalleryItemStyled>
    );
  }
}
