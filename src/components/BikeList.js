import { useState, useEffect } from 'react';
import { getBikes } from '../services/api';

function BikeList() {
    const [bikes, setBikes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const data = await getBikes();
                setBikes(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchBikes();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Bike List</h1>
            <ul>
                {bikes.map(bike => (
                    <li key={bike.id}>{bike.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default BikeList;