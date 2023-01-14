import styled from 'styled-components';
import { space, typography } from 'styled-system';

export const ButtonStyled = styled.button`
  font-size: ${p => p.theme.fontSizes.m};
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

  transition: background-color var(--animation);

  &:hover {
    background-color: ${p => p.theme.colors.secondary};
  }
`;
