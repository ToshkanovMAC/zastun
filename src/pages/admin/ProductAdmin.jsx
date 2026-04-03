import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { Plus, Edit2, Trash2, Search, X, Loader2, Save } from 'lucide-react';
const ProductAdmin = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products', 'admin'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });
  const createMutation = useMutation({
    mutationFn: (newProduct) => api.post('/products', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowModal(false);
      resetForm();
      alert('Product created successfully.');
    },
  });
  const updateMutation = useMutation({
    mutationFn: (updatedProduct) => api.patch(`/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowModal(false);
      resetForm();
      alert('Product updated successfully.');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product deleted successfully.');
    },
    onError: (err) => {
      console.error(err);
      alert('Failed to delete product. Please try again.');
    }
  });
  const [formData, setFormData] = useState({
    name: '',
    category: 'Shoes',
    price: '',
    description: '',
    image: '',
    stock: '',
    rating: 4.5,
  });
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Shoes',
      price: '',
      description: '',
      image: '',
      stock: '',
      rating: 4.5,
    });
    setEditingProduct(null);
    setIsEditing(false);
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsEditing(true);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      id: isEditing ? editingProduct.id : undefined,
    };
    if (isEditing) {
      updateMutation.mutate(productData);
    } else {
      productData.id = Date.now().toString();
      createMutation.mutate(productData);
    }
  };
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-1">Products Management</h1>
          <p className="text-gray-500 font-medium">Manage your product catalog, prices, and inventory.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-white dark:bg-black text-black dark:text-white px-6 py-4 rounded-xl flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold uppercase tracking-widest text-sm shadow-lg active:scale-95"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4">
            Total: {filteredProducts.length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-widest text-[10px] border-b border-gray-100">
                <th className="px-8 py-4 w-20">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr className="hover:bg-transparent">
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                      <Loader2 className="animate-spin" size={40} />
                      <p className="font-bold uppercase tracking-widest text-xs">Loading Catalog...</p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="w-16 h-16 bg-[#F5F5F5] rounded-xl overflow-hidden flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                      <img src={product.image} alt="" className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-black group-hover:underline underline-offset-4 cursor-pointer">{product.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1 opacity-60">ID: {product.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-tight">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-black italic">₹ {product.price.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className={`font-mono font-bold text-sm ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>{product.stock}</p>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-3 bg-white text-gray-400 hover:text-black hover:bg-gray-100 border border-transparent rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-transparent rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-center p-8 border-b border-gray-100">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Product Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                    placeholder="e.g. Nike Air Max 270"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium"
                  >
                    <option value="Shoes">Shoes</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-mono font-bold"
                    placeholder="9995"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Inventory (Stock)</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-mono font-bold"
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Image URL</label>
                <input 
                  type="text" 
                  required 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-mono text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block ml-1">Description</label>
                <textarea 
                  rows="3"
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all placeholder:text-gray-300 font-medium no-scrollbar"
                  placeholder="Enter product details..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-all text-sm active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all text-sm shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductAdmin;
