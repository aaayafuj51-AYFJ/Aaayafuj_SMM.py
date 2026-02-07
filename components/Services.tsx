
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Globe, Info } from 'lucide-react';
import { SMMService, ServiceCategory } from '../types';

interface ServicesProps {
  services: SMMService[];
  onPlaceOrder: (service: SMMService, quantity: number, url: string) => void;
}

const Services: React.FC<ServicesProps> = ({ services, onPlaceOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [selectedService, setSelectedService] = useState<SMMService | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [url, setUrl] = useState('');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && quantity >= selectedService.minOrder && url) {
      onPlaceOrder(selectedService, quantity, url);
      // Reset
      setSelectedService(null);
      setQuantity(0);
      setUrl('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Aaayafuj services..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', ...Object.values(ServiceCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div key={service.id} className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-6 rounded-3xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">
                {service.category}
              </span>
              <p className="text-xl font-bold text-white">${service.pricePer1k.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 1k</span></p>
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {service.name}
            </h4>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">
              {service.description}
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Min Order</span>
                <span className="text-slate-300 font-medium">{service.minOrder.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Max Order</span>
                <span className="text-slate-300 font-medium">{service.maxOrder.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setSelectedService(service);
                setQuantity(service.minOrder);
              }}
              className="w-full py-3 bg-slate-800 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={18} />
              <span>Order Now</span>
            </button>
          </div>
        ))}
      </div>

      {/* Order Modal (Simplified inline conditional) */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[60] overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Create New Order</h3>
              <p className="text-slate-400">Node: {selectedService.name}</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Link / URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    required
                    type="url" 
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-300">Quantity</label>
                  <span className="text-xs text-slate-500">Min: {selectedService.minOrder.toLocaleString()}</span>
                </div>
                <input 
                  required
                  type="number" 
                  min={selectedService.minOrder}
                  max={selectedService.maxOrder}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-400 uppercase font-bold tracking-wider">Total Charge</p>
                  <p className="text-2xl font-bold text-white">${((selectedService.pricePer1k / 1000) * quantity).toFixed(2)}</p>
                </div>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for modal close
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default Services;
