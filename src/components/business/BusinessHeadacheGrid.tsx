
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
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {headaches.slice(0, 3).map((headache, index) => (
          <BusinessHeadacheCard 
            key={index} 
            quote={headache.quote}
            title={headache.title}
            index={index}
            hoverEffect="tilt" // Same effect for all cards
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-6 md:px-16">
        {headaches.slice(3, 5).map((headache, index) => (
          <BusinessHeadacheCard 
            key={index + 3} 
            quote={headache.quote}
            title={headache.title}
            index={index + 3}
            hoverEffect="tilt" // Same effect for all cards
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessHeadacheGrid;
