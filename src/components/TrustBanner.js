import React from 'react';

// Simple SVG Icons for the banner
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PriceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9.586a1 1 0 01-.707-.293l-1.172-1.171A1 1 0 006.293 5H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-4" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118 0 12.02 12.02 0 00-3.382-8.962z" />
    </svg>
);

const TrustBanner = () => {
    const features = [
        {
            icon: <CheckIcon />,
            title: 'Quality Checked',
            description: 'Every vehicle is inspected by our team of experts.'
        },
        {
            icon: <PriceIcon />,
            title: 'Transparent Pricing',
            description: 'No hidden fees. The price you see is the price you pay.'
        },
        {
            icon: <ShieldIcon />,
            title: 'Secure Transactions',
            description: 'Your payments and data are always safe with us.'
        }
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">The Right Mark Advantage</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-900 mt-5 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBanner;
