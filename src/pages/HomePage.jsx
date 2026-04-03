import React from 'react';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import Featured from '../components/Featured';
import GearUp from '../components/GearUp';
import DontMiss from '../components/DontMiss';
import Essentials from '../components/Essentials';
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 pb-12 dark:bg-black transition-colors duration-300">
      <Hero />
      <ProductSlider />
      <Featured />
      <GearUp />
      <DontMiss />
      <Essentials />
    </div>
  );
};
export default HomePage;
