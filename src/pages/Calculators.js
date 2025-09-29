import React, { useState } from 'react';

const Calculators = () => {
    const [emiFormData, setEmiFormData] = useState({
        principal: '',
        interest: '',
        tenure: '',
    });

    const [emiResult, setEmiResult] = useState(null);

    const handleEmiChange = (e) => {
        setEmiFormData({ ...emiFormData, [e.target.name]: e.target.value });
    };

    const calculateEmi = (e) => {
        e.preventDefault();
        const P = parseFloat(emiFormData.principal);
        const R = parseFloat(emiFormData.interest) / 100 / 12;
        const N = parseFloat(emiFormData.tenure) * 12;

        if (P && R && N) {
            const emi = (P * R * Math.pow((1 + R), N)) / (Math.pow((1 + R), N) - 1);
            setEmiResult(emi.toFixed(2));
        } else {
            setEmiResult(null);
        }
    };

    const [fuelCostFormData, setFuelCostFormData] = useState({
        distance: '',
        petrolPrice: '',
        petrolMileage: '',
        evConsumption: '',
        electricityPrice: '',
    });

    const [fuelCostResult, setFuelCostResult] = useState(null);

    const handleFuelCostChange = (e) => {
        setFuelCostFormData({ ...fuelCostFormData, [e.target.name]: e.target.value });
    };

    const calculateFuelCost = (e) => {
        e.preventDefault();
        const D = parseFloat(fuelCostFormData.distance);
        const PP = parseFloat(fuelCostFormData.petrolPrice);
        const PM = parseFloat(fuelCostFormData.petrolMileage);
        const EC = parseFloat(fuelCostFormData.evConsumption);
        const EP = parseFloat(fuelCostFormData.electricityPrice);

        if (D && PP && PM && EC && EP) {
            const petrolCost = (D / PM) * PP;
            const evCost = (D / EC) * EP;
            setFuelCostResult({ petrol: petrolCost.toFixed(2), ev: evCost.toFixed(2) });
        } else {
            setFuelCostResult(null);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Calculators</h2>

            {/* EMI Calculator */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4">EMI Calculator</h3>
                <form onSubmit={calculateEmi} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Principal Amount (₹)</label>
                        <input type="number" name="principal" value={emiFormData.principal} onChange={handleEmiChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Annual Interest Rate (%)</label>
                        <input type="number" name="interest" value={emiFormData.interest} onChange={handleEmiChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Loan Tenure (Years)</label>
                        <input type="number" name="tenure" value={emiFormData.tenure} onChange={handleEmiChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold">Calculate EMI</button>
                    </div>
                </form>
                {emiResult && (
                    <div className="mt-6 text-center">
                        <h4 className="text-xl font-bold">Monthly EMI: ₹{emiResult}</h4>
                    </div>
                )}
            </div>

            {/* Fuel Cost Calculator */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Fuel Cost Calculator (Petrol vs EV)</h3>
                <form onSubmit={calculateFuelCost} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Distance (km)</label>
                        <input type="number" name="distance" value={fuelCostFormData.distance} onChange={handleFuelCostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Petrol Price (₹/liter)</label>
                        <input type="number" name="petrolPrice" value={fuelCostFormData.petrolPrice} onChange={handleFuelCostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Petrol Mileage (km/liter)</label>
                        <input type="number" name="petrolMileage" value={fuelCostFormData.petrolMileage} onChange={handleFuelCostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">EV Consumption (km/kWh)</label>
                        <input type="number" name="evConsumption" value={fuelCostFormData.evConsumption} onChange={handleFuelCostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Electricity Price (₹/kWh)</label>
                        <input type="number" name="electricityPrice" value={fuelCostFormData.electricityPrice} onChange={handleFuelCostChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold">Calculate Fuel Cost</button>
                    </div>
                </form>
                {fuelCostResult && (
                    <div className="mt-6 text-center">
                        <h4 className="text-xl font-bold">Estimated Costs for {fuelCostFormData.distance} km:</h4>
                        <p className="text-lg">Petrol: ₹{fuelCostResult.petrol}</p>
                        <p className="text-lg">EV: ₹{fuelCostResult.ev}</p>
                        <p className="text-lg font-semibold mt-2">
                            {parseFloat(fuelCostResult.petrol) < parseFloat(fuelCostResult.ev) ?
                                `Petrol is cheaper by ₹{(parseFloat(fuelCostResult.ev) - parseFloat(fuelCostResult.petrol)).toFixed(2)}` :
                                `EV is cheaper by ₹{(parseFloat(fuelCostResult.petrol) - parseFloat(fuelCostResult.ev)).toFixed(2)}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculators;
