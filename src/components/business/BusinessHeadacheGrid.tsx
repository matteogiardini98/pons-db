
import React from 'react';
import BusinessHeadacheCard from './BusinessHeadacheCard';

export interface BusinessHeadache {
  quote: string;
  title: string;
}

interface BusinessHeadacheGridProps {
  headaches: BusinessHeadache[];
}

const BusinessHeadacheGrid = ({ headaches }: BusinessHeadacheGridProps) => {
  return (
    <div className="mt-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {headaches.slice(0, 3).map((headache, index) => (
          <BusinessHeadacheCard 
            key={index} 
            quote={headache.quote}
            title={headache.title}
            index={index}
            hoverEffect={index % 2 === 0 ? "tilt" : "glow"}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:px-10">
        {headaches.slice(3, 5).map((headache, index) => (
          <BusinessHeadacheCard 
            key={index + 3} 
            quote={headache.quote}
            title={headache.title}
            index={index + 3}
            hoverEffect={index % 2 === 0 ? "glow" : "tilt"}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessHeadacheGrid;
