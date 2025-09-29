import React from 'react';

const BikeCard = ({ bike }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <img 
                src={`http://localhost:5000${bike.imageUrl}`} 
                alt={bike.name}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => {
                    console.error('Image failed to load:', bike.imageUrl);
                    e.target.src = '/placeholder.jpg';
                }}
            />
            <h3 className="text-lg font-semibold mt-2">{bike.name}</h3>
            <p className="text-gray-600">{bike.brand}</p>
            <p className="text-green-600 font-bold">₹{bike.price.toLocaleString()}</p>
        </div>
    );
};

export default BikeCard;