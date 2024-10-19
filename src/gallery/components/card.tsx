import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  const slug = title.toLowerCase().replace(/ /g, '-');

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2 w-48 h-48">
      <Link to={`/gallery/${slug}`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Link>
    </div>
  );
};

export default Card;
