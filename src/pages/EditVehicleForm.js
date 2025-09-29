import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVehicleForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get vehicle ID from URL

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        fuelType: 'Petrol',
        mileage: '',
        batteryRange: '',
        engineCapacity: '',
        power: '',
        description: '',
        images: [{ url: '', alt: '' }],
        type: 'Bike',
        upcomingLaunch: false,
        launchDate: '',
    });

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const res = await axios.get(`/api/twoWheelers/${id}`);
                // Format date for the input field if it exists
                if (res.data.launchDate) {
                    res.data.launchDate = new Date(res.data.launchDate).toISOString().split('T')[0];
                }
                setFormData(res.data);
            } catch (err) {
                console.error('Failed to fetch vehicle data', err);
                alert('Failed to load vehicle data for editing.');
            }
        };
        fetchVehicleData();
    }, [id]);

    const { name, brand, price, fuelType, mileage, batteryRange, engineCapacity, power, description, images, type, upcomingLaunch, launchDate } = formData;

    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const onImageChange = (index, e) => {
        const newImages = [...images];
        newImages[index][e.target.name] = e.target.value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...images, { url: '', alt: '' }] });
    };

    const removeImageField = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
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
            await axios.put(`/api/twoWheelers/${id}`, formData, config);
            alert('Vehicle updated successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Edit Vehicle</h2>
            <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                        <input type="text" name="brand" value={brand} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                        <input type="number" name="price" value={price} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                        <select name="type" value={type} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="Bike">Bike</option>
                            <option value="Scooter">Scooter</option>
                            <option value="EV">EV</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Type</label>
                        <select name="fuelType" value={fuelType} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="Petrol">Petrol</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>
                    {fuelType === 'Petrol' && (
                        <>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Mileage (kmpl)</label>
                                <input type="number" name="mileage" value={mileage} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Engine Capacity (cc)</label>
                                <input type="number" name="engineCapacity" value={engineCapacity} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </>
                    )}
                    {fuelType === 'Electric' && (
                        <>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Battery Range (km)</label>
                                <input type="number" name="batteryRange" value={batteryRange} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Power (kW)</label>
                                <input type="number" name="power" value={power} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </>
                    )}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea name="description" value={description} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                        {images.map((image, index) => (
                            <div key={index} className="flex mb-2">
                                <input type="text" name="url" value={image.url} onChange={(e) => onImageChange(index, e)} placeholder="Image URL" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
                                <input type="text" name="alt" value={image.alt} onChange={(e) => onImageChange(index, e)} placeholder="Alt Text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
                                {images.length > 1 && (
                                    <button type="button" onClick={() => removeImageField(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addImageField} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Add Image</button>
                    </div>
                    <div className="md:col-span-2 flex items-center">
                        <input type="checkbox" name="upcomingLaunch" checked={upcomingLaunch} onChange={onChange} className="mr-2" />
                        <label className="text-gray-700 text-sm font-bold">Upcoming Launch</label>
                    </div>
                    {upcomingLaunch && (
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Launch Date</label>
                            <input type="date" name="launchDate" value={launchDate} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg font-semibold">Update Vehicle</button>
                </div>
            </form>
        </div>
    );
};

export default EditVehicleForm;
