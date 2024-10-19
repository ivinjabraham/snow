import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ id, title, description }) => {
  const slug = id;

  return (
    <div className="border-2 border-white rounded-lg shadow-md overflow-hidden m-2 w-72 h-60">
      <Link to={`/prompt/${slug}`} className="block h-full">
        {/* Top section */}
        <div className="bg-blue-200 h-3/4"></div>
        
        {/* Bottom section styled similar to the example */}
        <div className=" h-1/4 p-3 flex flex-col justify-center" style={{ backgroundColor: '#41506D' }}>
          <h3 className="text-white text-sm font-semibold mb-1"> {title} </h3>
          <p className="text-gray-400 text-xs">Last visited 12:00</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
