import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { ModalStyled, OverlayStyled } from './Modal.styled';

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    setBodyStyles();

    const handleEscClose = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscClose);
    return () => {
      removeBodyStyles();
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  const handleClose = event => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <OverlayStyled onClick={handleClose}>
      <ModalStyled>{children}</ModalStyled>
    </OverlayStyled>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function setBodyStyles() {
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
}

function removeBodyStyles() {
  document.body.removeAttribute('style');
}
