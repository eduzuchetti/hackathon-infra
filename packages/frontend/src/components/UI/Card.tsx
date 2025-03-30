import React from 'react';
import { 
  Card as MuiCard, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  CardActions
} from '@mui/material';
import styled from 'styled-components';

interface CardProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  image?: string;
  imageHeight?: number | string;
  imageAlt?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  elevation?: number;
  variant?: 'outlined' | 'elevation';
}

const StyledCard = styled(MuiCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  .MuiCardContent-root {
    flex-grow: 1;
  }
`;

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  subheader, 
  image, 
  imageHeight = 140, 
  imageAlt = "Card image",
  actions,
  ...props 
}) => {
  return (
    <StyledCard {...props}>
      {title && (
        <CardHeader
          title={title}
          subheader={subheader}
        />
      )}
      
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt}
        />
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </StyledCard>
  );
};

export default Card; 