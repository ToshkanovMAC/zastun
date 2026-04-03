import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Cart = () => {
  const { t } = useTranslation();
  const { items, total, removeFromCart } = useCartStore();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1100px] mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-8 dark:text-white">{t('cart.title') || 'Bag'}</h1>
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-6">{t('cart.empty') || 'There are no items in your bag.'}</p>
                <Link
                  to="/"
                  className="inline-block bg-white dark:bg-black text-black dark:text-white px-8 py-3 rounded-full font-medium hover:opacity-70 transition-opacity">
                  {t('cart.shopNow') || 'Shop Now'}
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4 pb-8 border-b border-gray-200 dark:border-gray-800">
                      <div className="w-24 h-24 sm:w-40 sm:h-40 bg-gray-100 dark:bg-[#1a1a1a] rounded-sm overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h2 className="text-base font-medium dark:text-white">{item.name}</h2>
                            <p className="text-base font-medium dark:text-white">${item.price}</p>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.category}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{item.color}</p>
                        </div>
                        <div className="flex items-center gap-6 mt-4">
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="lg:w-[350px]">
            <h2 className="text-2xl font-medium mb-8 dark:text-white">{t('summary.title') || 'Summary'}</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between dark:text-white">
                <span>{t('summary.subtotal') || 'Subtotal'}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between dark:text-white">
                <span>{t('summary.delivery') || 'Estimated Delivery & Handling'}</span>
                <span>{t('summary.free') || 'Free'}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-medium text-lg dark:text-white">
                <span>{t('summary.total') || 'Total'}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full bg-white dark:bg-black text-black dark:text-white py-4 rounded-full font-medium text-lg hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {t('summary.checkout') || 'Member Checkout'}
            </button>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-100 dark:border-gray-800">
              <p className="text-sm font-medium mb-2 dark:text-white">Free Delivery</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Applies to orders of $50 or more. <Link to="/" className="underline font-bold">Learn more</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Cart;
