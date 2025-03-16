
import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="space-y-2">
    <h5 className="text-sm font-medium">{title}</h5>
    {children}
  </div>
);

export default FilterSection;
