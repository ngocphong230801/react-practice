import React from 'react';

interface InformationItemProps {
  label: string;
  value: string | number;
  className?: string;
}

const InformationItem: React.FC<InformationItemProps> = React.memo(({ label, value, className = "" }) => (
  <div className={`item ${className}`}>
    <p className="label">{label}</p>
    <span className={`value ${className}`}>{value}</span>
  </div>
));

export default InformationItem;
