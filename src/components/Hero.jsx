import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import heroImage from '../assets/hero-image.png';
const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center pb-[84px] dark:bg-black transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative px-10"
      >
        <img 
          src={heroImage} 
          alt="Nike Air Max Pulse" 
          className="w-full object-cover object-center bg-[#f5f5f5] dark:bg-[#111] transition-colors"
          style={{ height: '700px' }}
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 flex flex-col items-center text-center max-w-[800px] px-4"
      >
        <p className="text-[15px] font-medium mb-1 dark:text-gray-400">First Look</p>
        <h1 className="text-[56px] font-black leading-[60px] uppercase mb-6 tracking-tight dark:text-white">
          {t('hero.title')}
        </h1>
        <p className="text-[15px] leading-6 mb-8 text-[#111111] dark:text-gray-300">
          {t('hero.description')}
        </p>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:opacity-80 transition-all shadow-lg active:scale-95">
            Notify Me
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:opacity-80 transition-all shadow-lg active:scale-95">
            {t('hero.cta')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default Hero;
