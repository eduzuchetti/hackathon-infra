import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  elevation?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large';
  width?: string;
  onClick?: () => void;
  className?: string;
}

const getElevation = (elevation: 'small' | 'medium' | 'large') => {
  switch (elevation) {
    case 'small':
      return theme.shadows.small;
    case 'medium':
      return theme.shadows.medium;
    case 'large':
      return theme.shadows.large;
    default:
      return theme.shadows.small;
  }
};

const getPadding = (padding: 'small' | 'medium' | 'large') => {
  switch (padding) {
    case 'small':
      return theme.spacing.md;
    case 'medium':
      return theme.spacing.lg;
    case 'large':
      return theme.spacing.xl;
    default:
      return theme.spacing.md;
  }
};

const StyledCard = styled.div<{
  elevation: 'small' | 'medium' | 'large';
  padding: 'small' | 'medium' | 'large';
  width?: string;
  isClickable: boolean;
}>`
  background-color: white;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${({ elevation }) => getElevation(elevation)};
  padding: ${({ padding }) => getPadding(padding)};
  width: ${({ width }) => width || 'auto'};
  transition: all ${theme.transitions.default};
  
  ${({ isClickable }) => isClickable && `
    cursor: pointer;
    
    &:hover {
      box-shadow: ${theme.shadows.large};
      transform: translateY(-2px);
    }
  `}
`;

const CardTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const CardSubtitle = styled.h4`
  color: ${theme.colors.secondaryText};
  font-weight: ${theme.typography.fontWeights.normal};
  margin-bottom: ${theme.spacing.md};
`;

const CardContent = styled.div``;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  elevation = 'small',
  padding = 'medium',
  width,
  onClick,
  className,
}) => {
  return (
    <StyledCard
      elevation={elevation}
      padding={padding}
      width={width}
      isClickable={!!onClick}
      onClick={onClick}
      className={className}
    >
      {title && <CardTitle>{title}</CardTitle>}
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default Card; 