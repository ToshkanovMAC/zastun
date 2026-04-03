import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';
import { useCartStore } from '../store/useCartStore';
import { Heart, ShoppingBag } from 'lucide-react';
const SHOE_SIZES = ['UK 3.5', 'UK 4', 'UK 4.5', 'UK 5', 'UK 5.5', 'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 12'];
const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });
  const relatedProducts = allProducts
    .filter(p => p.id !== id)
    .slice(0, 8);
  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: product.color,
      size: selectedSize
    });
    navigate('/cart');
  };
  const scrollSlider = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    }
  };
  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 dark:bg-black transition-colors duration-500">
       <div className="w-12 h-12 border-4 border-gray-100 border-t-black dark:border-gray-800 dark:border-t-white rounded-full animate-spin" />
       <p className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">LOADING...</p>
    </div>
  );
  if (isError || !product) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 dark:bg-black transition-colors duration-500">
      <p className="text-lg text-[#666] dark:text-gray-400">Product not found.</p>
      <Link to="/" className="underline text-[#111] dark:text-white">Back to Home</Link>
    </div>
  );
  const sizes = product.category === 'Clothing' ? CLOTHING_SIZES : SHOE_SIZES;
  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="bg-[#f6f6f6] dark:bg-[#1a1a1a] rounded-xl overflow-hidden aspect-square transition-colors duration-500">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-[#f6f6f6] dark:bg-[#1a1a1a] rounded-md flex-shrink-0 cursor-pointer overflow-hidden border-2 border-transparent hover:border-black dark:hover:border-white transition-all">
                    <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-[400px] lg:w-[450px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-orange-600 font-medium mb-2">{t('product.sustainable') || 'Member Access'}</h3>
              <h1 className="text-3xl font-medium mb-1 dark:text-white">{product.name}</h1>
              <p className="text-lg mb-6 dark:text-gray-300">{product.category}</p>
              <p className="text-xl font-medium mb-8 dark:text-white">${product.price}</p>
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <span className={`font-medium ${showSizeError ? 'text-red-500' : 'dark:text-white'}`}>
                    {showSizeError ? 'Please select a size' : t('product.selectSize') || 'Select Size'}
                  </span>
                  <button className="text-gray-500 dark:text-gray-400 underline text-sm">{t('product.sizeGuide') || 'Size Guide'}</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setShowSizeError(false);
                      }}
                      className={`py-3 border rounded-md text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black' 
                          : 'border-gray-200 dark:border-gray-800 dark:text-gray-400 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mb-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                    className="w-full bg-white dark:bg-black text-black dark:text-white py-4 rounded-full font-medium text-lg hover:opacity-70 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  {t('product.addToBag') || 'Add to Bag'}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFavourite(!isFavourite)}
                  className="w-full border border-gray-300 dark:border-gray-700 dark:text-white py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:border-black dark:hover:border-white transition-all"
                >
                  {t('product.favourite') || 'Favourite'}
                  <Heart size={20} fill={isFavourite ? "currentColor" : "none"} />
                </motion.button>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  {product.description || 'This product provides high performance and comfort for your everyday needs. Step into the future with Nike technology.'}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-500 list-disc pl-4">
                  <li>{t('product.color') || 'Shown'}: {product.color}</li>
                  <li>{t('product.style') || 'Style'}: {product.id}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="mt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium dark:text-white">{t('product.youMightLike') || 'You Might Also Like'}</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollSlider(-1)} className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button onClick={() => scrollSlider(1)} className="p-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-9-6"/></svg>
              </button>
            </div>
          </div>
          <div ref={sliderRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="min-w-[300px] group">
                <div className="aspect-square bg-[#f6f6f6] dark:bg-[#1a1a1a] rounded-lg overflow-hidden mb-4 transition-colors duration-500">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-medium dark:text-white">{p.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{p.category}</p>
                <p className="font-medium mt-2 dark:text-white">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
