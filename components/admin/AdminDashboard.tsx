
import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, Database, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50">
      <Section>
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-zinc-900 rounded-xl text-white">
                <Shield size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-display font-bold text-zinc-900">Admin Dashboard</h1>
                <p className="text-zinc-500">Welcome back, {user?.name}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-500 uppercase">Total Users</span>
                    <Users className="text-brand-500" />
                </div>
                <div className="text-3xl font-bold text-zinc-900">1,245</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-500 uppercase">Revenue (MTD)</span>
                    <Activity className="text-green-500" />
                </div>
                <div className="text-3xl font-bold text-zinc-900">$42,300</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-500 uppercase">Database Status</span>
                    <Database className="text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> Online
                </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">System Content Management</h2>
            <p className="text-zinc-500 mb-6">This is a protected route. Only users with role 'admin' can see this.</p>
            <div className="flex gap-4">
                <Button>Manage Templates</Button>
                <Button variant="secondary">View Logs</Button>
            </div>
        </div>
      </Section>
    </div>
  );
};

export default AdminDashboard;
