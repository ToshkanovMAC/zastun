import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import api from '../../api/axios';
import { Package, ShoppingBag, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

// Custom plugins to give charts a unique look (canvas background color/image + glow)
const customCanvasBackgroundColor = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options?.color || 'rgba(250,250,255,0.98)';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
};

const customCanvasBackgroundImage = {
  id: 'customCanvasBackgroundImage',
  beforeDraw: (chart, args, options) => {
    if (!options?.src) return;
    const img = new Image();
    img.src = options.src;
    const ctx = chart.ctx;
    const { top, left, width, height } = chart.chartArea || { top: 0, left: 0, width: chart.width, height: chart.height };
    if (img.complete) {
      const scale = Math.min(width / img.width, height / img.height, 1);
      const imgW = img.width * scale;
      const imgH = img.height * scale;
      const x = left + (width - imgW) / 2;
      const y = top + (height - imgH) / 2;
      ctx.save();
      ctx.globalAlpha = options.opacity ?? 0.08;
      ctx.drawImage(img, x, y, imgW, imgH);
      ctx.restore();
    } else {
      img.onload = () => chart.draw();
    }
  }
};

const fancyGlow = {
  id: 'fancyGlow',
  beforeDatasetDraw: (chart, args, options) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = options?.shadowColor || 'rgba(0,0,0,0.12)';
    ctx.shadowBlur = options?.shadowBlur ?? 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = options?.shadowOffsetY ?? 8;
  },
  afterDatasetDraw: (chart) => {
    chart.ctx.restore();
  }
};

// Register plugins globally so they can be configured per-chart via options.plugins
ChartJS.register(customCanvasBackgroundColor, customCanvasBackgroundImage, fancyGlow);

const AdminDashboard = () => {
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await api.get('/orders');
      return res.data;
    },
  });

  // Calculate statistics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.total || 0), 0);
  }, [orders]);

  const categoriesData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Number of Products by Category',
          data: Object.values(counts),
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderWidth: 0,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(0, 0, 0, 1)',
        },
      ],
    };
  }, [products]);

    // Shared plugin configuration to produce a distinct visual style
    const chartPluginsConfig = {
      customCanvasBackgroundColor: { color: 'rgba(250,250,255,1)' },
      customCanvasBackgroundImage: { src: 'https://www.chartjs.org/img/chartjs-logo.svg', opacity: 0.06 },
      fancyGlow: { shadowColor: 'rgba(34,197,94,0.08)', shadowBlur: 18, shadowOffsetY: 8 }
    };

  const orderStatusData = useMemo(() => {
    const counts = orders.reduce((acc, order) => {
      const status = order.status || 'Pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Orders by Status',
          data: Object.values(counts),
          backgroundColor: [
            'rgb(249, 115, 22)',
            'rgb(34, 197, 94)',
            'rgb(239, 68, 68)',
            'rgb(168, 162, 158)',
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [orders]);

  const revenueOverTimeData = useMemo(() => {
    const revenueByDate = orders.reduce((acc, order) => {
      const dateStr = order.date ? new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Unknown Date';
      const amount = order.total || 0;
      acc[dateStr] = (acc[dateStr] || 0) + amount;
      return acc;
    }, {});
    
    return {
      labels: Object.keys(revenueByDate),
      datasets: [
        {
          label: 'Daily Revenue ($)',
          data: Object.values(revenueByDate),
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [orders]);

  const productsByColorData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      const color = product.color || 'Unknown';
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: 'Products by Color',
          data: Object.values(counts),
          backgroundColor: [
            '#111111', '#444444', '#777777', '#aaaaaa', '#dddddd', '#ff6600', '#0066ff'
          ],
          borderWidth: 1,
          borderColor: '#ffffff'
        },
      ],
    };
  }, [products]);

  if (loadingProducts || loadingOrders) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">Overview of your store's performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold dark:text-white">{products.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold dark:text-white">{orders.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold dark:text-white">${totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Products by Category</h3>
          <div className="h-72 flex items-center justify-center">
             {products.length > 0 ? (
               <Bar 
                 data={categoriesData} 
                 options={{ 
                   responsive: true, 
                   maintainAspectRatio: false,
                   plugins: {
                     legend: { display: false },
                     ...chartPluginsConfig
                   },
                   scales: {
                     y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                     x: { grid: { display: false } }
                   }
                 }} 
                 
               />
             ) : (
               <p className="text-gray-500">No products available</p>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Orders Status Distribution</h3>
          <div className="h-72 flex items-center justify-center">
             {orders.length > 0 ? (
               <Pie 
                 data={orderStatusData} 
                 options={{ 
                   responsive: true, 
                   maintainAspectRatio: false,
                   plugins: {
                     legend: { position: 'right' },
                     ...chartPluginsConfig
                   }
                 }} 
               />
             ) : (
               <p className="text-gray-500">No orders available</p>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Revenue Over Time</h3>
          <div className="h-72 flex items-center justify-center">
             {orders.length > 0 ? (
               <Line 
                 data={revenueOverTimeData} 
                 options={{ 
                   responsive: true, 
                   maintainAspectRatio: false,
                   plugins: {
                     legend: { display: false },
                     ...chartPluginsConfig
                   },
                   scales: {
                     y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                     x: { grid: { display: false } }
                   }
                 }} 
               />
             ) : (
               <p className="text-gray-500">No revenue data available</p>
             )}
          </div>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold mb-6 dark:text-white">Products by Color</h3>
          <div className="h-72 flex items-center justify-center">
             {products.length > 0 ? (
               <Doughnut 
                 data={productsByColorData} 
                 options={{ 
                   responsive: true, 
                   maintainAspectRatio: false,
                   plugins: {
                     legend: { position: 'right' },
                     ...chartPluginsConfig
                   }
                 }} 
               />
             ) : (
               <p className="text-gray-500">No products available</p>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
