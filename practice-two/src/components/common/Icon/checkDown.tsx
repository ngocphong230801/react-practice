import React from 'react';
import { IconProps } from '@type/icon';

const CheckDownIcon: React.FC<IconProps> = React.memo(({ size = 16, color = '#FCFAFA', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 10L8 6L12 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

export default CheckDownIcon;
