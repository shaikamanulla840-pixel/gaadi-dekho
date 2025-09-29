const twoWheelers = [
    {
        name: 'Classic 350',
        brand: 'Royal Enfield',
        price: 193000,
        fuelType: 'Petrol',
        mileage: 37,
        engineCapacity: 349,
        description: 'The quintessential modern classic motorcycle. A timeless design powered by a smooth and refined engine.',
        images: [{ url: '/images/classic350.webp', alt: 'Classic 350' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Splendor Plus',
        brand: 'Hero',
        price: 75000,
        fuelType: 'Petrol',
        mileage: 60,
        engineCapacity: 97,
        description: 'India\'s most popular motorcycle, known for its incredible fuel efficiency and reliability.',
        images: [{ url: '/images/herosplendorplus.webp', alt: 'Splendor Plus' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Activa 6G',
        brand: 'Honda',
        price: 76000,
        fuelType: 'Petrol',
        mileage: 50,
        engineCapacity: 109,
        description: 'The undisputed king of scooters in India, offering a perfect blend of performance, comfort, and reliability.',
        images: [{ url: '/images/hondaactiva.webp', alt: 'Activa 6G' }],
        type: 'Scooter', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Ola S1 Pro',
        brand: 'Ola Electric',
        price: 130000,
        fuelType: 'Electric',
        batteryRange: 195,
        power: 5.5,
        description: 'A revolutionary electric scooter with cutting-edge technology, superior performance, and a massive range.',
        images: [{ url: '/images/olas1pro.webp', alt: 'Ola S1 Pro' }],
        type: 'EV', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Pulsar NS200',
        brand: 'Bajaj',
        price: 149000,
        fuelType: 'Petrol',
        mileage: 35,
        engineCapacity: 199,
        description: 'A naked sportbike that offers thrilling performance and aggressive styling.',
        images: [{ url: '/images/bajajpulsarns200.webp', alt: 'Pulsar NS200' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Apache RTR 160 4V',
        brand: 'TVS',
        price: 124000,
        fuelType: 'Petrol',
        mileage: 45,
        engineCapacity: 160,
        description: 'A track-focused machine for the streets, with a high-revving engine and sharp handling.',
        images: [{ url: '/images/tvsapachertr1604v.webp', alt: 'Apache RTR 160 4V' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Jupiter 125',
        brand: 'TVS',
        price: 86000,
        fuelType: 'Petrol',
        mileage: 50,
        engineCapacity: 125,
        description: 'A practical and spacious scooter with a host of convenient features for urban commuting.',
        images: [{ url: '/images/tvsjupiter125.webp', alt: 'Jupiter 125' }],
        type: 'Scooter', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'iQube S',
        brand: 'TVS',
        price: 166000,
        fuelType: 'Electric',
        batteryRange: 100,
        power: 4.4,
        description: 'A smart and silent electric scooter designed for a comfortable and eco-friendly city ride.',
        images: [{ url: '/images/tvsiqubes.webp', alt: 'iQube S' }],
        type: 'EV', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Chetak',
        brand: 'Bajaj',
        price: 144000,
        fuelType: 'Electric',
        batteryRange: 126,
        power: 4.2,
        description: 'An iconic name revived in a modern electric avatar, featuring a premium metal body and elegant design.',
        images: [{ url: '/images/bajajchetak.webp', alt: 'Chetak' }],
        type: 'EV', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Himalayan 450',
        brand: 'Royal Enfield',
        price: 285000,
        fuelType: 'Petrol',
        mileage: 30,
        engineCapacity: 452,
        description: 'Built for adventure, the Himalayan can take on any terrain with its long-travel suspension and rugged build.',
        images: [{ url: '/images/royalenfieldhimalayan450.webp', alt: 'Himalayan 450' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'MT-15 V2',
        brand: 'Yamaha',
        price: 168000,
        fuelType: 'Petrol',
        mileage: 48,
        engineCapacity: 155,
        description: 'The Dark Warrior of Japan. An aggressive hyper-naked bike with a potent engine and agile handling.',
        images: [{ url: '/images/yamahamt15v2.webp', alt: 'MT-15 V2' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Ntorq 125',
        brand: 'TVS',
        price: 84000,
        fuelType: 'Petrol',
        mileage: 42,
        engineCapacity: 125,
        description: 'A sporty scooter with sharp styling, smart features, and peppy performance.',
        images: [{ url: '/images/tvsntorq125.webp', alt: 'Ntorq 125' }],
        type: 'Scooter', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Ather 450X',
        brand: 'Ather Energy',
        price: 128000,
        fuelType: 'Electric',
        batteryRange: 150,
        power: 6.4,
        description: 'One of the quickest electric scooters in India, offering a thrilling ride and a host of smart features.',
        images: [{ url: '/images/ather450x.webp', alt: 'Ather 450X' }],
        type: 'EV', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Access 125',
        brand: 'Suzuki',
        price: 80000,
        fuelType: 'Petrol',
        mileage: 50,
        engineCapacity: 124,
        description: 'A comfortable and practical scooter with a smooth engine and classic styling.',
        images: [{ url: '/images/suzukiaccess125.webp', alt: 'Access 125' }],
        type: 'Scooter', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Raider 125',
        brand: 'TVS',
        price: 95000,
        fuelType: 'Petrol',
        mileage: 57,
        engineCapacity: 125,
        description: 'The wicked ride for the Gen Z, with a sporty design and packed with features.',
        images: [{ url: '/images/tvsraider125.webp', alt: 'Raider 125' }],
        type: 'Bike', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Hunter 350 (Used)',
        brand: 'Royal Enfield',
        price: 150000,
        fuelType: 'Petrol',
        mileage: 36,
        engineCapacity: 349,
        description: 'A modern-classic roadster with a powerful engine and comfortable ergonomics.',
        images: [{ url: '/images/royalenfieldhunter350.webp', alt: 'Hunter 350' }],
        type: 'Bike', condition: 'used', sellerContact: 'seller@example.com'
    },
    {
        name: 'Simple One',
        brand: 'Simple Energy',
        price: 165000,
        fuelType: 'Electric',
        batteryRange: 212,
        power: 8.5,
        description: 'An electric scooter that boasts the longest range in its class, with a removable battery.',
        images: [{ url: '/images/simpleenergyone.webp', alt: 'Simple One' }],
        type: 'EV', condition: 'new', upcomingLaunch: false
    },
    {
        name: 'Activa Electric',
        brand: 'Honda',
        price: 110000,
        fuelType: 'Electric',
        batteryRange: 100,
        power: 4,
        description: 'Honda\'s much-anticipated entry into the electric scooter market, based on the reliable Activa platform.',
        images: [{ url: '/images/hondaactivaelectirc.webp', alt: 'Activa Electric' }],
        type: 'EV', condition: 'new', upcomingLaunch: true, launchDate: new Date('2025-11-15')
    },
    {
        name: 'Burgman Electric',
        brand: 'Suzuki',
        price: 120000,
        fuelType: 'Electric',
        batteryRange: 90,
        power: 4,
        description: 'An electric version of the popular maxi-scooter, promising comfort and style.',
        images: [{ url: '/images/Suzuki%20Burgman%20Electric.webp', alt: 'Burgman Electric' }],
        type: 'EV', condition: 'new', upcomingLaunch: true, launchDate: new Date('2026-01-10')
    },
    {
        name: 'Scrambler 650',
        brand: 'Royal Enfield',
        price: 350000,
        fuelType: 'Petrol',
        mileage: 25,
        engineCapacity: 648,
        description: 'A new scrambler based on the successful 650cc twin-cylinder platform.',
        images: [{ url: '/images/Royal%20Enfield%20Scrambler%20650.jpg', alt: 'Scrambler 650' }],
        type: 'Bike', condition: 'new', upcomingLaunch: true, launchDate: new Date('2026-03-01')
    }
];

module.exports = twoWheelers;