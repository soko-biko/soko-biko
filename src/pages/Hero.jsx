import React from 'react';
import Button from '../components/ui/Button';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-sand text-forest-green">
      <img
        src="https://via.placeholder.com/1920x1080?text=Kenyan+Safari"
        alt="Scenic Kenyan Landscape"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-xl max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Discover the Wild Heart of Kenya
        </h1>
        <p className="text-xl mb-8">
          Unforgettable journeys await. Explore breathtaking landscapes, diverse wildlife, and rich cultural heritage.
        </p>
        <Button onClick={() => console.log('Explore Clicked')}>
          Start Your Adventure
        </Button>
      </div>
    </section>
  );
};

export default Hero;
