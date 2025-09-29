import React from 'react';

const AboutPage = () => {
    return (
        <div className="text-gray-100">
            {/* Hero Section */}
            <div className="bg-zinc-900 text-white text-center py-20">
                <h1 className="text-5xl font-bold">About Right Mark</h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto">Revolutionizing the way you buy and sell two-wheelers with trust and transparency.</p>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-red-600 mb-4">Our Mission</h2>
                        <p className="mb-4 text-lg leading-relaxed">
                            At Right Mark, our mission is to create the most trusted and convenient marketplace for two-wheelers. We believe that buying or selling a vehicle should be a simple, transparent, and enjoyable experience. We leverage technology to empower our customers with all the information they need to make confident decisions.
                        </p>
                        <p className="text-lg leading-relaxed">
                            From detailed vehicle inspections to secure payments and transparent pricing, every part of our process is designed with you in mind.
                        </p>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" alt="Motorcycle Workshop" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-black/20 rounded-lg">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-3">Integrity</h3>
                            <p className="text-gray-300">We operate with honesty and transparency in every transaction.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-3">Customer-Centric</h3>
                            <p className="text-gray-300">Our customers are at the heart of everything we do.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-3">Quality</h3>
                            <p className="text-gray-300">We are committed to the highest standards of quality and service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;