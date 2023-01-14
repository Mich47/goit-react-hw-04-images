import styled from 'styled-components';
import { space, typography } from 'styled-system';

export const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* z-index: 1200; */
`;

export const ModalStyled = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const ButtonStyled = styled.button`
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.white};
  background-color: ${p => p.theme.colors.primary};
  font-weight: ${p => p.theme.fontWeights.bold};
  padding-top: ${p => p.theme.space[3]}px;
  padding-bottom: ${p => p.theme.space[3]}px;
  padding-left: ${p => p.theme.space[4]}px;
  padding-right: ${p => p.theme.space[4]}px;
  border: none;
  border-radius: ${p => p.theme.radii.normal};
  cursor: pointer;
  ${typography}
  ${space}

  &:hover {
    background-color: ${p => p.theme.colors.secondary};
  }
`;
