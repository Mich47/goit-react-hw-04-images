import styled from 'styled-components';

export const ImageGalleryListStyled = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  padding: ${p => p.theme.space[4]}px;
  margin-top: 0;
  margin-bottom: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ImageGalleryItemStyled = styled.li`
  border-radius: ${p => p.theme.radii.normal};
  overflow: hidden;
  box-shadow: ${p => p.theme.shadows.main};
  transition: transform var(--animation);

  :hover {
    transform: scale(1.03);
  }
`;

export const ImageStyled = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  cursor: zoom-in;
`;
