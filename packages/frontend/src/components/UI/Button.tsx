import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import styled from 'styled-components';

interface ButtonProps extends MuiButtonProps {
  fullWidth?: boolean;
}

// We can extend Material UI components with styled-components if needed
const StyledButton = styled(MuiButton)<ButtonProps>`
  text-transform: none;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, variant = 'contained', color = 'primary', ...props }) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 