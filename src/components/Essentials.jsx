import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import essentialMen from '../assets/essential-men.png';
import essentialWomen from '../assets/essential-women.png';
import essentialKids from '../assets/essential-kids.png';
const Essentials = () => {
  const { t } = useTranslation();
  return (
    <div className="px-10 mb-20 dark:bg-black transition-colors duration-300">
      <h2 className="text-[22px] font-medium mb-6 dark:text-white">{t('home.essentials')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer group"
        >
          <img 
            src={essentialMen} 
            alt="Men's Essentials" 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5] dark:bg-[#111] transition-colors" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg active:scale-95">
            {t('nav.men')}
          </button>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer group"
        >
          <img 
            src={essentialWomen} 
            alt="Women's Essentials" 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5] dark:bg-[#111] transition-colors" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg active:scale-95">
            {t('nav.women')}
          </button>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative h-[540px] cursor-pointer group"
        >
          <img 
            src={essentialKids} 
            alt="Kids' Essentials" 
            className="w-full h-full object-cover rounded-md bg-[#f5f5f5] dark:bg-[#111] transition-colors" 
          />
          <button className="absolute bottom-8 left-8 bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg active:scale-95">
            {t('nav.kids')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
export default Essentials;
