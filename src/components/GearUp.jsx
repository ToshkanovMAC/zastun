import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';
import leftArrowIcon from '../assets/left-arrow.svg';
import rightArrowIcon from '../assets/right-arrow.svg';
import { Link } from 'react-router-dom';
const GearCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="min-w-[300px] flex-shrink-0 cursor-pointer group block">
      <div className="bg-[#f5f5f5] dark:bg-[#1a1a1a] w-[300px] h-[300px] mb-4 transition-colors overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="flex justify-between items-start pe-4">
        <div>
          <h3 className="font-medium text-[15px] dark:text-white">{product.name}</h3>
          <p className="text-[#757575] dark:text-gray-400 text-[15px]">{product.category}</p>
        </div>
        <p className="font-medium text-[15px] dark:text-white">₹ {product.price}</p>
      </div>
    </Link>
  );
};
const GearUp = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'clothing'],
    queryFn: async () => {
      const response = await api.get('/products?category=Clothing');
      return response.data;
    }
  });
  const mensGear = products.slice(0, 2);
  const womensGear = products.slice(2, 4);
  return (
    <div className="px-10 mb-20 dark:bg-black transition-colors duration-300">
      <h2 className="text-[23px] font-medium mb-6 dark:text-white">{t('home.gearUp')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex justify-end items-center mb-4 space-x-3">
             <span className="text-[15px] font-medium dark:text-white">{t('home.shopMens')}</span>
             <div className="flex space-x-2">
                <button className="bg-[#f5f5f5] dark:bg-[#222] p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <img src={leftArrowIcon} alt="Prev" className="w-5 h-5 dark:invert" />
                </button>
                <button className="bg-[#f5f5f5] dark:bg-[#222] p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <img src={rightArrowIcon} alt="Next" className="w-5 h-5 dark:invert" />
                </button>
             </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar">
            {isLoading && <p className="dark:text-white">{t('loading')}</p>}
            {mensGear.map(product => <GearCard key={product.id} product={product} />)}
          </div>
        </div>
        <div>
          <div className="flex justify-end items-center mb-4 space-x-3">
             <span className="text-[15px] font-medium dark:text-white">{t('home.shopWomens')}</span>
             <div className="flex space-x-2">
                <button className="bg-[#f5f5f5] dark:bg-[#222] p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <img src={leftArrowIcon} alt="Prev" className="w-5 h-5 dark:invert" />
                </button>
                <button className="bg-[#f5f5f5] dark:bg-[#222] p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <img src={rightArrowIcon} alt="Next" className="w-5 h-5 dark:invert" />
                </button>
             </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar">
            {isLoading && <p className="dark:text-white">{t('loading')}</p>}
            {womensGear.map(product => <GearCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GearUp;
