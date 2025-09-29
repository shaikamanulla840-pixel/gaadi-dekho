import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <nav className="bg-zinc-900 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-red-600">GAADI DEKHO</Link>
                <div>
                    <Link to="/" className="mr-4 hover:text-red-600">Home</Link>
                    <Link to="/showrooms" className="mr-4 hover:text-red-600">Showrooms</Link>
                    <Link to="/compare" className="mr-4 hover:text-red-600">Compare</Link>
                    <Link to="/calculators" className="mr-4 hover:text-red-600">Calculators</Link>
                    <Link to="/used-bikes" className="mr-4 hover:text-red-600">Used Bikes</Link>
                    <Link to="/upcoming-launches" className="mr-4 hover:text-red-600">Upcoming Launches</Link>
                    <Link to="/about" className="mr-4 hover:text-red-600">About</Link>
                    {token && <Link to="/favorites" className="mr-4 hover:text-red-600">Favorites</Link>}
                    {token && <Link to="/sell-used-bike" className="mr-4 hover:text-red-600">Sell Used Bike</Link>}
                    {token && <Link to="/add-two-wheeler" className="mr-4 hover:text-red-600">Add Two-Wheeler</Link>}
                    {token && <Link to="/add-showroom" className="mr-4 hover:text-red-600">Add Showroom</Link>}
                    {token && <Link to="/book-test-ride" className="mr-4 hover:text-red-600">Book Test Ride</Link>}
                    {token && <Link to="/dashboard" className="mr-4 hover:text-red-600">Dashboard</Link>}
                    {token ? (
                        <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
                    ) : (
                        <Link to="/auth" className="hover:text-red-600">Login/Register</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;