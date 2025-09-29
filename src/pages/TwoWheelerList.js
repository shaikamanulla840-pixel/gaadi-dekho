import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';
import TrustBanner from '../components/TrustBanner';

const TwoWheelerList = () => {
    const [twoWheelers, setTwoWheelers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        brand: '',
        fuelType: '',
        price: ''
    });
    const [brands, setBrands] = useState([]);

    // Fetch unique brands for the filter dropdown
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get('/api/twoWheelers?upcomingLaunch=false');
                const uniqueBrands = [...new Set(res.data.map(item => item.brand))];
                setBrands(uniqueBrands);
            } catch (err) {
                console.error("Could not fetch brands", err);
            }
        };
        fetchBrands();
    }, []);

    // Fetch two-wheelers based on filters
    useEffect(() => {
        const fetchTwoWheelers = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.search) params.append('search', filters.search);
                if (filters.brand) params.append('brand', filters.brand);
                if (filters.fuelType) params.append('fuelType', filters.fuelType);
                if (filters.price) params.append('price', filters.price);
                
                params.append('upcomingLaunch', 'false');

                const res = await axios.get(`/api/twoWheelers?${params.toString()}`);
                setTwoWheelers(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchTwoWheelers();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [e.target.name]: e.target.value
        }));
    };

    const priceOptions = [
        { label: 'Any Price', value: '' },
        { label: 'Under ₹80,000', value: '0-80000' },
        { label: '₹80,000 - ₹1,50,000', value: '80000-150000' },
        { label: '₹1,50,000 - ₹2,50,000', value: '150000-250000' },
        { label: 'Over ₹2,50,000', value: '250000' }
    ];

    if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Title and Filters Section */}
            <div className="bg-white shadow-sm pb-6">
                <div className="container mx-auto px-4 pt-8">
                    <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Find Your Next Ride</h1>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by name or brand..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <select name="brand" value={filters.brand} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">All Brands</option>
                                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                            </select>
                            <select name="fuelType" value={filters.fuelType} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                <option value="">All Fuel Types</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Electric">Electric</option>
                            </select>
                            <select name="price" value={filters.price} onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                {priceOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listings Section */}
            <div className="container mx-auto p-4 md:p-6">
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {twoWheelers.map((tw, index) => (
                            <VehicleCard key={tw._id} vehicle={tw} index={index} />
                        ))}
                    </div>
                )}
            </div>

            <TrustBanner />
        </div>
    );
};

export default TwoWheelerList;