import React from 'react';
import { 
  Typography as MuiTypography, 
  TypographyProps as MuiTypographyProps 
} from '@mui/material';
import styled from 'styled-components';

interface TypographyProps extends MuiTypographyProps {
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  noMargin?: boolean;
}

const StyledTypography = styled(MuiTypography)<TypographyProps>`
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  margin-bottom: ${({ noMargin, theme }) => noMargin ? '0' : 'inherit'};
`;

const Typography: React.FC<TypographyProps> = ({ 
  children, 
  variant = 'body1', 
  color = 'text.primary',
  ...props 
}) => {
  return (
    <StyledTypography
      variant={variant}
      color={color}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography; 