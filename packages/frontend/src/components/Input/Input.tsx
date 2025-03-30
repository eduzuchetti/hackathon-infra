import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.md};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSizes.small};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

const StyledInput = styled.input<{ error?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.typography.fontSizes.base};
  outline: none;
  transition: border-color ${theme.transitions.fast};
  
  &:focus {
    border-color: ${props => props.error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.error 
      ? `rgba(208, 2, 27, 0.2)` 
      : `rgba(71, 162, 72, 0.2)`};
  }
  
  &::placeholder {
    color: ${theme.colors.secondaryText};
    opacity: 0.7;
  }
  
  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const HelperText = styled.p<{ error?: boolean }>`
  font-size: ${theme.typography.fontSizes.small};
  margin-top: ${theme.spacing.xs};
  color: ${props => props.error ? theme.colors.error : theme.colors.secondaryText};
`;

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = false,
  fullWidth = false,
  ...rest
}) => {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} error={error} {...rest} />
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </InputContainer>
  );
};

export default Input; 