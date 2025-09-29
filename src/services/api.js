import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getTwoWheelers = async () => {
    try {
        const response = await api.get('/api/twoWheelers');
        return response.data;
    } catch (error) {
        console.error('Error fetching two-wheelers:', error);
        throw error;
    }
};