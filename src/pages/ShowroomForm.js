import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowroomForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
        location: {
            latitude: '',
            longitude: '',
        },
        availableTwoWheelers: [],
    });

    const { name, address, city, state, pincode, phone, email, location } = formData;

    const onChange = (e) => {
        if (e.target.name === 'latitude' || e.target.name === 'longitude') {
            setFormData({
                ...formData,
                location: {
                    ...formData.location,
                    [e.target.name]: e.target.value,
                },
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            await axios.post('/api/showrooms', formData, config);
            alert('Showroom added successfully!');
            navigate('/showrooms');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Add New Showroom</h2>
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input type="text" name="address" value={address} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input type="text" name="city" value={city} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                        <input type="text" name="state" value={state} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                        <input type="text" name="pincode" value={pincode} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input type="text" name="phone" value={phone} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Latitude</label>
                        <input type="number" name="latitude" value={location.latitude} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Longitude</label>
                        <input type="number" name="longitude" value={location.longitude} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ShowroomForm;
