cat << 'INNER_EOF' > src/components/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { fetchJson } from '../../utils/api';
import { Users, CreditCard, Activity, Box } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/api/admin/owner/dashboard').then(({ response, data }) => {
      if (response.ok) setStats((data as any).stats);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (!stats) return <div className="p-8 text-alert">Failed to load stats.</div>;

  const totalRevenue = stats.payments.reduce((acc: number, p: any) => p.status === 'APPROVED' ? acc + (Number(p.totalAmount) || 0) : acc, 0);

  return (
    <div className="p-8 space-y-8 animate-in fade-in">
      <h2 className="text-2xl font-black tracking-tight">Business Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-paper border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-text-secondary">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold uppercase tracking-wider">Total Students</span>
          </div>
          <div className="text-3xl font-black">{stats.students.total}</div>
        </div>
        <div className="bg-paper border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-text-secondary">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold uppercase tracking-wider">Approved Revenue</span>
          </div>
          <div className="text-3xl font-black">{totalRevenue} EGP</div>
        </div>
        <div className="bg-paper border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-text-secondary">
            <Activity className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold uppercase tracking-wider">Total Usage Runs</span>
          </div>
          <div className="text-3xl font-black">{stats.usage.reduce((a:number, b:any) => a + Number(b.count), 0)}</div>
        </div>
        <div className="bg-paper border border-line rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-text-secondary">
            <Box className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold uppercase tracking-wider">Active Entitlements</span>
          </div>
          <div className="text-3xl font-black">{stats.entitlements.reduce((a:number, b:any) => b.status === 'ACTIVE' ? a + Number(b.count) : a, 0)}</div>
        </div>
      </div>
      
      {/* Pending Action Items Section */}
      <h3 className="text-xl font-bold mt-12 mb-4">Attention Required</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-sm text-amber-800 font-medium">No urgent issues at this time.</p>
      </div>
    </div>
  );
}
INNER_EOF
