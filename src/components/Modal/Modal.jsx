import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { ModalStyled, OverlayStyled } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setBodyStyles();
    window.addEventListener('keydown', this.handleEscClose);
  }

  componentWillUnmount() {
    this.removeBodyStyles();
    window.removeEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };

  setBodyStyles = () => {
    const { clientWidth } = document.documentElement; // Ширина вьюпорта
    const { innerWidth } = window; // Внутрішня ширина вікна

    const scrollWidth = innerWidth - clientWidth;
    //Якщо є скрол - додаємо падінг праворуч
    if (scrollWidth) {
      document.body.setAttribute(
        'style',
        `overflow: hidden; padding-right: ${scrollWidth}px;`
      );
      return;
    }
    //Якщо немає - не додаємо падінг праворуч
    document.body.setAttribute('style', 'overflow: hidden;');
  };

  removeBodyStyles = () => {
    document.body.removeAttribute('style');
  };

  render() {
    const { src, alt } = this.props;
    return (
      <OverlayStyled onClick={this.handleClose}>
        <ModalStyled>
          <img src={src} alt={alt} />
        </ModalStyled>
      </OverlayStyled>
    );
  }
}
