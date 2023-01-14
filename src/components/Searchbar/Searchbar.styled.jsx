import styled from 'styled-components';
import { space, typography, position } from 'styled-system';

export const ButtonIconStyled = styled.button`
  position: absolute;
  top: ${p => p.theme.space[0]}px;
  padding: ${p => p.theme.space[2]}px;
  width: ${p => p.theme.space[5]}px;
  height: 100%;
  border: ${p => p.theme.borders.none};
  background-color: transparent;
  cursor: pointer;
  color: ${p => p.theme.colors.darkGray};
  transition: color var(--animation);

  ${typography}
  ${space}
  ${position}
  
  &:hover, &:focus {
    color: ${p => p.theme.colors.gray};
  }
`;

export const FormStyled = styled.form`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: ${p => p.theme.space[9]}px;
  height: ${p => p.theme.space[5]}px;
`;

export const LabelStyled = styled.label`
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.black};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

export const InputStyled = styled.input`
  padding: 7px 36px;
  width: 100%;
  font-size: ${p => p.theme.fontSizes.s};
  border: ${p => p.theme.borders.none};
  border-radius: ${p => p.theme.radii.large};
`;
