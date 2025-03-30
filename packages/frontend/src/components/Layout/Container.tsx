import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  center?: boolean;
  className?: string;
}

const getMaxWidth = (maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
  switch (maxWidth) {
    case 'xs':
      return '480px';
    case 'sm':
      return '640px';
    case 'md':
      return '768px';
    case 'lg':
      return '1024px';
    case 'xl':
      return '1280px';
    case 'full':
      return '100%';
    default:
      return '1024px';
  }
};

const StyledContainer = styled.div<{
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding: boolean;
  center: boolean;
}>`
  width: 100%;
  max-width: ${({ maxWidth }) => getMaxWidth(maxWidth)};
  padding: ${({ padding }) => padding ? `0 ${theme.spacing.lg}` : '0'};
  margin: ${({ center }) => center ? '0 auto' : '0'};
  box-sizing: border-box;
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = true,
  center = true,
  className,
}) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      padding={padding}
      center={center}
      className={className}
    >
      {children}
    </StyledContainer>
  );
};

export default Container; 