import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG Icons for key specs
const MileageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const FuelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-2a4 4 0 014-4h14a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1zM3 15V7a2 2 0 012-2h14a2 2 0 012 2v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-4M9 15v-4m6 0v4" />
    </svg>
);

const EngineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4 2 2 0 000-4zm0 0a2 2 0 110 4 2 2 0 010-4zm0 0v2m0 6V10m0 2a2 2 0 100 4 2 2 0 000-4zm0 0a2 2 0 110 4 2 2 0 010-4zm0 0v2m0 6V14" />
    </svg>
);

const VehicleCard = ({ vehicle, index }) => {
    const { _id, name, brand, price, images, fuelType, mileage, engineCapacity, batteryRange } = vehicle;

    const specs = [
        { icon: <EngineIcon />, value: engineCapacity ? `${engineCapacity} cc` : null },
        { icon: <MileageIcon />, value: mileage ? `${mileage} kmpl` : (batteryRange ? `${batteryRange} km range` : null) },
        { icon: <FuelIcon />, value: fuelType },
    ].filter(spec => spec.value); // Filter out null specs

    return (
        <motion.div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <Link to={`/product/${_id}`}>
                <div className="overflow-hidden">
                    <img 
                        src={images[0]?.url ? `http://localhost:5000${images[0].url}` : 'https://via.placeholder.com/400'} 
                        alt={`${brand} ${name}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{brand} {name}</h3>
                        <p className="text-2xl font-extrabold text-gray-900 mt-1">₹{price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 border-t border-b border-gray-100 py-3">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex items-center">
                                {spec.icon}
                                <span>{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default VehicleCard;
