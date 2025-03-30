import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.colors.primaryLight};
        }
      `;
    case 'secondary':
      return css`
        background-color: white;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: rgba(71, 162, 72, 0.05);
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        padding: 0;
        &:hover {
          color: ${theme.colors.primaryLight};
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.fontSizes.small};
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSizes.base};
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSizes.medium};
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeights.medium};
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.fast};
  box-shadow: ${theme.shadows.button};
  outline: none;
  cursor: pointer;
  
  ${({ variant = 'primary' }) => getButtonStyles(variant)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...rest 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button; 