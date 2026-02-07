
import React from 'react';
import { ShoppingCart, ExternalLink, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { SMMOrder } from '../types';

interface OrdersProps {
  orders: SMMOrder[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      default: return <AlertCircle size={16} className="text-slate-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500';
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'processing': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Link</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Charge</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">
                    Your Aaayafuj_SMM order history is currently empty.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white font-mono">#{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-white">{order.serviceName}</p>
                      <p className="text-xs text-slate-500">{order.quantity.toLocaleString()} quantity</p>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={order.targetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                      >
                        <span className="text-xs truncate max-w-[150px]">{order.targetUrl}</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white">${order.cost.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-slate-500 text-xs">
                        <Calendar size={12} />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
