import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

interface GridProps extends Omit<MuiGridProps, 'item'> {
  item?: boolean;
  xs?: number | 'auto' | boolean;
  sm?: number | 'auto' | boolean;
  md?: number | 'auto' | boolean;
  lg?: number | 'auto' | boolean;
  xl?: number | 'auto' | boolean;
  spacing?: number;
}

/**
 * Grid component that wraps Material UI's Grid with proper TypeScript types.
 * Fixes common TypeScript issues with MUI Grid's properties.
 */
const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <MuiGrid {...props}>{children}</MuiGrid>;
};

export default Grid; 