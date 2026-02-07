
import React from 'react';
import { TrendingUp, ShoppingCart, CheckCircle2, DollarSign, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardStats, SMMOrder } from '../types';

interface DashboardProps {
  stats: DashboardStats;
  orders: SMMOrder[];
}

const data = [
  { name: 'Mon', engagement: 4000, reach: 2400 },
  { name: 'Tue', engagement: 3000, reach: 1398 },
  { name: 'Wed', engagement: 2000, reach: 9800 },
  { name: 'Thu', engagement: 2780, reach: 3908 },
  { name: 'Fri', engagement: 1890, reach: 4800 },
  { name: 'Sat', engagement: 2390, reach: 3800 },
  { name: 'Sun', engagement: 3490, reach: 4300 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
          +{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ stats, orders }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Spent" 
          value={`$${stats.totalSpent.toFixed(2)}`} 
          icon={DollarSign} 
          color="bg-emerald-500" 
          trend="12"
        />
        <StatCard 
          title="Active Orders" 
          value={stats.activeOrders} 
          icon={Clock} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Completed" 
          value={stats.completedOrders} 
          icon={CheckCircle2} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Engagement Boost" 
          value="24.8K" 
          icon={TrendingUp} 
          color="bg-purple-500" 
          trend="8"
        />
      </div>

      {/* Analytics Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Campaign Performance</h3>
            <p className="text-sm text-slate-400">Aggregated reach across all Aaayafuj_SMM nodes</p>
          </div>
          <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders List (Mini) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-500 italic text-sm">No recent orders placed via Aaayafuj_SMM interface.</p>
            </div>
          ) : (
            orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <ShoppingCart size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{order.serviceName}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{order.targetUrl}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${order.cost.toFixed(2)}</p>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
