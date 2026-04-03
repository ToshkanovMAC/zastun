import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import nikeLogo from '../assets/nike-logo.svg';
import searchIcon from '../assets/search-icon.svg';
import heartIcon from '../assets/heart-icon.svg';
import bagIcon from '../assets/bag-icon.svg';
const Header = () => {
  const { t, i18n } = useTranslation();
  const { items } = useCartStore();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <div className="w-full bg-[#f5f5f5] dark:bg-[#1a1a1a] px-10 py-1.5 flex justify-between items-center text-[11px] font-medium transition-colors duration-500">
        <div className="flex items-center gap-4 text-[#111] dark:text-[#ccc]">
          <Link to="/" className="hover:opacity-70">{t('nav.findStore')}</Link>
          <span className="text-gray-300">|</span>
          <Link to="/" className="hover:opacity-70">{t('nav.help')}</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group relative cursor-pointer text-[#111] dark:text-[#ccc]">
            <Globe size={14} />
            <span className="uppercase">{i18n.language}</span>
            <div className="absolute top-full right-0 py-1 bg-white dark:bg-[#222] shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-[100] border border-gray-100 dark:border-gray-800">
              {['en', 'ru', 'uz'].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left uppercase"
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-4 text-[#111] dark:text-[#ccc]">
            <Link to="/" className="hover:opacity-70">{t('nav.joinUs')}</Link>
            <span className="text-gray-300">|</span>
            <Link to="/admin/login" className="hover:opacity-70">{t('nav.signIn')}</Link>
          </div>
        </div>
      </div>
      <header className="h-[96px] w-full bg-white flex items-center justify-between px-10 relative z-50 transition-colors duration-500">
        <Link to="/" className="flex items-center">
          <img src={nikeLogo} alt="Nike Logo" className="w-[60px] h-[60px] dark:invert transition-all" />
        </Link>
        <nav className="hidden md:flex space-x-6 text-[15px] font-medium text-[#111111] dark:text-white">
          <Link to="/" className="hover:text-gray-500">{t('nav.new')}</Link>
          <Link to="/" className="hover:text-gray-500">{t('nav.men')}</Link>
          <Link to="/" className="hover:text-gray-500">{t('nav.women')}</Link>
          <Link to="/" className="hover:text-gray-500">{t('nav.kids')}</Link>
          <Link to="/" className="hover:text-gray-500">{t('nav.sale')}</Link>
          <Link to="/" className="hover:text-gray-500">{t('nav.snkrs')}</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center">
            <img src={searchIcon} alt="Search" className="absolute left-3 w-5 h-5 dark:invert" />
            <input
              type="text"
              placeholder={t('nav.search')}
              className="bg-[#f5f5f5] dark:bg-[#1a1a1a] dark:text-white rounded-full pl-10 pr-4 py-2 text-[15px] font-medium outline-none hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
            />
          </div>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-all duration-300">
            <img src={heartIcon} alt="Heart" className="w-6 h-6 dark:invert" />
          </button>
          <Link to="/cart" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-all duration-300 relative">
            <img src={bagIcon} alt="Bag" className="w-6 h-6 dark:invert" />
            {items.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-white dark:bg-black text-black dark:text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {items.length}
              </motion.span>
            )}
          </Link>
        </div>
      </header>
      <div className="bg-[#f5f5f5] dark:bg-[#111] dark:text-white w-full py-2 flex flex-col items-center justify-center border-b border-[#e5e5e5] dark:border-gray-800 transition-colors duration-300">
        <span className="text-[15px] font-medium">{t('hero.hello')}</span>
        <span className="text-[11px] underline font-medium opacity-80">{t('hero.download')}</span>
      </div>
    </>
  );
};
export default Header;
