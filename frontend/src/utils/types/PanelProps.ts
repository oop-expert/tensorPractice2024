import { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode,
  direction?: 'row' | 'column', 
  width?: number | string, 
  height?: number | string, 
  margin?: number | string,
  padding?: number | string,
  gap?: number | string,
  isMatchingMobile?: boolean,
  position?: 'absolute' | 'relative' | 'unset',
  justifyContent?: 'unset' | 'space-between' | 'center' | 'flex-start' | 'flex-end'
};

export default PanelProps;
