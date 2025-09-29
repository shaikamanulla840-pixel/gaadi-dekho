import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to find the best value in a row
const findBest = (items, key, higherIsBetter = true) => {
    if (!items || items.length === 0) return null;

    const validItems = items.map(item => item[key]).filter(val => val !== undefined && val !== null);
    if (validItems.length === 0) return null;

    const bestValue = higherIsBetter ? Math.max(...validItems) : Math.min(...validItems);
    return bestValue;
};

const ComparePage = () => {
    const [allVehicles, setAllVehicles] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllVehicles = async () => {
            try {
                const res = await axios.get('/api/twoWheelers?upcomingLaunch=false');
                setAllVehicles(res.data);
            } catch (err) {
                console.error("Failed to fetch vehicles", err);
            }
            setLoading(false);
        };
        fetchAllVehicles();
    }, []);

    const handleSelectVehicle = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else if (selectedIds.length < 4) { // Limit comparison to 4 vehicles
            setSelectedIds([...selectedIds, id]);
        }
    };

    const selectedVehicles = selectedIds.map(id => allVehicles.find(v => v._id === id)).filter(Boolean);

    const specRows = [
        { key: 'price', label: 'Price', higherIsBetter: false, format: val => `₹${val.toLocaleString()}` },
        { key: 'mileage', label: 'Mileage (kmpl)', higherIsBetter: true },
        { key: 'engineCapacity', label: 'Engine (cc)', higherIsBetter: true },
        { key: 'batteryRange', label: 'Battery Range (km)', higherIsBetter: true },
        { key: 'power', label: 'Power (kW)', higherIsBetter: true },
    ];

    const bestValues = {
        price: findBest(selectedVehicles, 'price', false),
        mileage: findBest(selectedVehicles, 'mileage', true),
        engineCapacity: findBest(selectedVehicles, 'engineCapacity', true),
        batteryRange: findBest(selectedVehicles, 'batteryRange', true),
        power: findBest(selectedVehicles, 'power', true),
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 md:p-6">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Compare Vehicles</h1>
                
                {/* Vehicle Selector */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Select up to 4 vehicles to compare</h2>
                    <div className="flex flex-wrap gap-2">
                        {allVehicles.map(vehicle => (
                            <button 
                                key={vehicle._id}
                                onClick={() => handleSelectVehicle(vehicle._id)}
                                className={`px-3 py-1.5 text-sm rounded-full border-2 ${selectedIds.includes(vehicle._id) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                                {vehicle.brand} {vehicle.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                {selectedVehicles.length > 0 && (
                    <div className="grid gap-1" style={{ gridTemplateColumns: `1fr repeat(${selectedVehicles.length}, 2fr)` }}>
                        {/* Sticky Header Row */}
                        <div className="bg-white p-4 rounded-tl-lg"></div>
                        {selectedVehicles.map(vehicle => (
                            <div key={vehicle._id} className="bg-white p-4 text-center sticky top-0 z-10 shadow-sm">
                                <img src={`http://localhost:5000${vehicle.images[0].url}`} alt={`${vehicle.brand} ${vehicle.name}`} className="w-full h-32 object-contain mb-2"/>
                                <h3 className="font-bold text-lg">{vehicle.brand} {vehicle.name}</h3>
                            </div>
                        ))}

                        {/* Spec Rows */}
                        {specRows.map(row => {
                            // Only render row if at least one selected vehicle has the spec
                            if (!selectedVehicles.some(v => v[row.key] !== undefined && v[row.key] !== null)) return null;

                            return (
                                <React.Fragment key={row.key}>
                                    <div className="bg-gray-100 p-4 font-semibold flex items-center">{row.label}</div>
                                    {selectedVehicles.map(vehicle => (
                                        <div key={vehicle._id} className={`bg-white p-4 text-center flex items-center justify-center ${vehicle[row.key] === bestValues[row.key] ? 'bg-green-100 font-bold text-green-800' : ''}`}>
                                            {vehicle[row.key] ? (row.format ? row.format(vehicle[row.key]) : vehicle[row.key]) : '-'}
                                        </div>
                                    ))}
                                </React.Fragment>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparePage;