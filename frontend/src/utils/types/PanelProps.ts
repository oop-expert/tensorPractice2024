import { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode,
  direction?: 'row' | 'column', 
  width?: number | string, 
  height?: number | string, 
  margin?: number | string,
  isMatchingMobile?: boolean
};

export default PanelProps;
