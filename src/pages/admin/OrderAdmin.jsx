import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { ShoppingBag, Clock, CheckCircle2, XCircle, Search, Calendar, User, MapPin, ChevronDown, Loader2 } from 'lucide-react';
const OrderAdmin = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders-admin'],
    queryFn: async () => {
      const res = await api.get('/orders');
      return res.data;
    },
  });
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/orders/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders-admin']);
    },
  });
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={14} />;
      case 'Delivered': return <CheckCircle2 size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };
  const filteredOrders = orders.filter(o => 
    o.id.toString().includes(searchTerm) || 
    (o.address && o.address.toLowerCase().includes(searchTerm.toLowerCase()))
  ).reverse(); 
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-1">Orders Management</h1>
          <p className="text-gray-500 font-medium">Track sales, update shipping status, and manage cancellations.</p>
        </div>
        <div className="bg-white dark:bg-black text-black dark:text-white px-6 py-4 rounded-xl flex items-center gap-3 font-bold uppercase tracking-widest text-sm shadow-lg">
          <ShoppingBag size={20} />
          Total Orders: {orders.length}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {isLoading && (
            <div className="py-20 text-center flex flex-col items-center gap-4 text-gray-400">
               <Loader2 className="animate-spin" size={40} />
               <p className="font-bold uppercase tracking-widest text-xs">Loading Orders...</p>
            </div>
          )}
          {filteredOrders.length === 0 && !isLoading && (
            <div className="py-20 text-center text-gray-400 font-medium italic">
              No orders found matching your search.
            </div>
          )}
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-8 hover:bg-gray-50/50 transition-all group">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">#{order.id}</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-400">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Order Date</p>
                        <p className="text-sm font-medium text-black">
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-400">
                        <MapPin size={16} />
                      </div>
                      <div className="max-w-[250px]">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Shipping Address</p>
                        <p className="text-sm font-medium text-black line-clamp-1">{order.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FBFAFA] p-4 rounded-xl border border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Order Items ({order.items.length})</p>
                    <div className="flex gap-2">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-xs font-bold text-gray-600 shadow-sm flex items-center gap-2">
                            <span className="bg-white dark:bg-black text-black dark:text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">{item.quantity}x</span>
                            <span>Product ID: {item.productId}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between min-w-[200px]">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                    <p className="text-2xl font-black italic tracking-tighter">₹ {order.total.toLocaleString()}</p>
                  </div>
                  <div className="relative group/select w-full mt-6 lg:mt-0">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2 lg:text-right">Update Order Status</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStatusMutation.mutate({ id: order.id, status: 'Delivered' })}
                        disabled={order.status === 'Delivered' || order.status === 'Cancelled'}
                        className="flex-1 bg-white dark:bg-black text-black dark:text-white px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all disabled:opacity-20 flex items-center justify-center gap-1 active:scale-95"
                      >
                        <CheckCircle2 size={12} />
                        Deliver
                      </button>
                      <button 
                         onClick={() => updateStatusMutation.mutate({ id: order.id, status: 'Cancelled' })}
                         disabled={order.status === 'Delivered' || order.status === 'Cancelled'}
                         className="flex-1 bg-white text-rose-500 border border-rose-100 px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-1 active:scale-95"
                      >
                        <XCircle size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OrderAdmin;
