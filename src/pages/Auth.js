import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const res = await axios.post(url, { username, email, password, role });
            localStorage.setItem('token', res.data.token);
            alert(isLogin ? 'Logged in successfully!' : 'Registered successfully!');
            // Redirect or update UI
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        {!isLogin && (
                            <div>
                                <label className="block" htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <label className="block" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {!isLogin && (
                            <div className="mt-4">
                                <label className="block" htmlFor="role">Role</label>
                                <select
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="dealer">Dealer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        )}
                        <div className="flex items-baseline justify-between">
                            <button
                                type="submit"
                                className="px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            <a
                                href="#"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm text-red-600 hover:underline"
                            >
                                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;