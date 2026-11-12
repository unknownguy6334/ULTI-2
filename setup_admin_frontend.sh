mkdir -p src/components/admin

cat << 'INNER_EOF' > src/components/admin/AdminLayout.tsx
import React from 'react';
import { 
  LayoutDashboard, Users, CreditCard, Box, Settings, 
  Bell, LifeBuoy, FileText, Database, Shield, Monitor, 
  Activity, CalendarDays, PowerSquare, Package, Search, Key
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navGroups = [
  {
    title: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }]
  },
  {
    title: 'Customers',
    items: [
      { id: 'students', label: 'Students', icon: Users },
      { id: 'support', label: 'Support Issues', icon: LifeBuoy },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ]
  },
  {
    title: 'Revenue',
    items: [
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'entitlements', label: 'Entitlements', icon: Key },
      { id: 'products', label: 'Products & Pricing', icon: Package },
      { id: 'payment-methods', label: 'Payment Methods', icon: Monitor },
      { id: 'financials', label: 'Financial Reports', icon: FileText }
    ]
  },
  {
    title: 'Product',
    items: [
      { id: 'schedules', label: 'Schedule Generation', icon: Box },
      { id: 'ocr', label: 'OCR', icon: FileText },
      { id: 'free-runs', label: 'Free Runs', icon: PowerSquare }
    ]
  },
  {
    title: 'Academic',
    items: [
      { id: 'academic', label: 'Academic Terms', icon: CalendarDays }
    ]
  },
  {
    title: 'Operations',
    items: [
      { id: 'health', label: 'System Health', icon: Activity },
      { id: 'maintenance', label: 'Maintenance Mode', icon: Settings },
      { id: 'audit', label: 'Audit Log', icon: Database }
    ]
  },
  {
    title: 'Security',
    items: [
      { id: 'security', label: 'Security Center', icon: Shield },
      { id: 'admins', label: 'Administrators', icon: Users }
    ]
  },
  {
    title: 'Configuration',
    items: [
      { id: 'settings', label: 'App Settings', icon: Settings }
    ]
  }
];

export function AdminLayout({ activeTab, setActiveTab, children }: { activeTab: string, setActiveTab: (t: string) => void, children: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-paper font-sans text-ink">
      {/* Sidebar */}
      <div className="w-64 bg-mist border-r border-line flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-black tracking-tight text-ink">Gadwal</h1>
          </div>
          <p className="text-xs font-bold text-text-secondary tracking-widest uppercase">Owner Console</p>
        </div>
        
        <div className="px-4 pb-8 space-y-6 flex-1">
          {navGroups.map(group => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-2">{group.title}</h3>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        isActive 
                          ? 'bg-ink text-white shadow-sm' 
                          : 'text-text-secondary hover:bg-white hover:text-ink'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-text-muted'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-line bg-mist/50">
          <div className="text-sm font-semibold truncate">{user?.name}</div>
          <div className="text-xs text-text-secondary truncate">{user?.email}</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  );
}
INNER_EOF
