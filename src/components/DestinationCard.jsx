import React from 'react';
import { Heart } from 'lucide-react';

const DestinationCard = ({ destination, onSave }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onSave(destination)}
            className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{destination.name}</h3>
        <p className="text-sm text-gray-600">{destination.region} - {destination.category}</p>
        <p className="mt-2 text-gray-700 text-sm">{destination.shortDescription}</p>
        <div className="flex items-center mt-3">
          <span className="text-yellow-500 text-lg">{'⭐'.repeat(Math.floor(destination.rating))}</span>
          <span className="ml-1 text-gray-600 text-sm">{destination.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;