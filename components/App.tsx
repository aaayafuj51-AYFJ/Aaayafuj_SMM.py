
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  List, 
  MessageSquareText, 
  Settings, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle2,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { INITIAL_SERVICES, INITIAL_STATS } from './constants';
import { SMMService, SMMOrder, ServiceCategory, DashboardStats } from './types';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Orders from './components/Orders';
import AIConsultant from './components/AIConsultant';

type View = 'dashboard' | 'services' | 'orders' | 'ai' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState<SMMOrder[]>([]);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);

  const handlePlaceOrder = (service: SMMService, quantity: number, url: string) => {
    const cost = (service.pricePer1k / 1000) * quantity;
    const newOrder: SMMOrder = {
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      serviceId: service.id,
      serviceName: service.name,
      targetUrl: url,
      quantity,
      status: 'pending',
      createdAt: new Date().toISOString(),
      cost
    };
    
    setOrders([newOrder, ...orders]);
    setStats(prev => ({
      ...prev,
      totalSpent: prev.totalSpent + cost,
      activeOrders: prev.activeOrders + 1,
      balance: prev.balance - cost
    }));
    setCurrentView('orders');
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: View, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(id);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === id 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
            <Zap className="text-white" size={24} fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Aaayafuj SMM
          </h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="services" icon={List} label="Services" />
          <SidebarItem id="orders" icon={ShoppingCart} label="My Orders" />
          <SidebarItem id="ai" icon={MessageSquareText} label="AI Consultant" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-2xl">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Your Balance</p>
            <p className="text-2xl font-bold text-white">${stats.balance.toFixed(2)}</p>
            <button className="mt-3 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
              Add Funds
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center space-x-2">
          <Zap className="text-blue-500" size={20} />
          <span className="font-bold text-white">Aaayafuj SMM</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-400 p-1">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950 z-40 pt-20 px-6">
          <nav className="space-y-4">
            <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem id="services" icon={List} label="Services" />
            <SidebarItem id="orders" icon={ShoppingCart} label="My Orders" />
            <SidebarItem id="ai" icon={MessageSquareText} label="AI Consultant" />
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto pt-20 md:pt-0">
        <header className="hidden md:flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-900/20">
          <h2 className="text-2xl font-semibold capitalize text-white">
            {currentView.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700 text-sm text-slate-300">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>API Status: Online</span>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1">
          {currentView === 'dashboard' && <Dashboard stats={stats} orders={orders} />}
          {currentView === 'services' && <Services services={INITIAL_SERVICES} onPlaceOrder={handlePlaceOrder} />}
          {currentView === 'orders' && <Orders orders={orders} />}
          {currentView === 'ai' && <AIConsultant />}
        </div>
      </main>
    </div>
  );
};

export default App;
