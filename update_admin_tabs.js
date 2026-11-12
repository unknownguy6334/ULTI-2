import fs from 'fs';
let content = fs.readFileSync('src/AdminApp.tsx', 'utf-8');

// Add imports
content = content.replace(
  "import { ShieldCheck, Calendar, ArrowRight, ArrowRightLeft, CreditCard, Box, UserPlus, Settings, LifeBuoy, FileText } from 'lucide-react';",
  "import { ShieldCheck, Calendar, ArrowRight, ArrowRightLeft, CreditCard, Box, UserPlus, Settings, LifeBuoy, FileText } from 'lucide-react';\nimport { AdminLayout } from './components/admin/AdminLayout';\nimport { AdminDashboard } from './components/admin/AdminDashboard';\nimport { AdminAuditLog } from './components/admin/AdminAuditLog';\nimport { AdminPlaceholder } from './components/admin/AdminPlaceholder';"
);

// Modify activeTab state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'pending' | 'history' | 'access' | 'students' | 'settings' | 'system'>('pending');",
  "const [activeTab, setActiveTab] = useState<string>('dashboard');"
);

// Replace the main render block
// Let's find the start of the return statement for the authenticated state
const renderStart = content.indexOf('return (\n    <div className="min-h-screen');
const renderEnd = content.lastIndexOf(');\n}\n');

if (renderStart === -1 || renderEnd === -1) {
    console.error("Could not find render block");
    process.exit(1);
}

// We will inject the AdminLayout
let newRender = `return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <AdminDashboard />}
      {activeTab === 'audit' && <AdminAuditLog />}
      
      {activeTab === 'payments' && (
        <div className="p-8 space-y-8 animate-in fade-in">
           <h2 className="text-2xl font-black tracking-tight">Payments & Revenue</h2>
           <div className="flex gap-4 border-b border-line mb-6">
              <button onClick={() => setActiveTab('payments_pending')} className="px-4 py-2 font-bold text-text-secondary hover:text-ink border-b-2 border-transparent hover:border-line">Pending Reviews</button>
              <button onClick={() => setActiveTab('payments_history')} className="px-4 py-2 font-bold text-text-secondary hover:text-ink border-b-2 border-transparent hover:border-line">Payment History</button>
           </div>
           <p className="text-text-secondary">Please select a sub-category above.</p>
        </div>
      )}

      {/* Preserve existing tabs but route them via the new layout IDs */}
      {(activeTab === 'payments_pending' || activeTab === 'pending') && (
`;

// Now extract the existing tab content from the original
const oldRender = content.substring(renderStart, renderEnd);

// I'll use regex to grab the blocks
const getBlock = (tabName) => {
    const match = oldRender.match(new RegExp(`{\\s*activeTab === '${tabName}' && \\((.*?)\\)}`, 's'));
    return match ? match[1] : '';
};

const pendingBlock = getBlock('pending');
const historyBlock = getBlock('history');
const accessBlock = getBlock('access');
const studentsBlock = getBlock('students');
const settingsBlock = getBlock('settings');
const systemBlock = getBlock('system');

newRender += `
        ${pendingBlock}
      )}
      
      {(activeTab === 'payments_history' || activeTab === 'history') && (
        ${historyBlock}
      )}
      
      {activeTab === 'entitlements' && (
        ${accessBlock}
      )}
      
      {activeTab === 'students' && (
        ${studentsBlock}
      )}
      
      {activeTab === 'payment-methods' && (
        ${settingsBlock}
      )}
      
      {activeTab === 'academic' && (
        ${systemBlock}
      )}

      {/* Placeholders for new sections */}
      {activeTab === 'support' && <AdminPlaceholder title="Support Issues" description="Manage student support tickets and inquiries." />}
      {activeTab === 'notifications' && <AdminPlaceholder title="Notification Center" description="Send announcements and alerts to students." />}
      {activeTab === 'products' && <AdminPlaceholder title="Products & Pricing" description="Configure pricing plans and availability." />}
      {activeTab === 'financials' && <AdminPlaceholder title="Financial Reports" description="Export and analyze revenue data." />}
      {activeTab === 'schedules' && <AdminPlaceholder title="Schedule Generation Operations" description="Monitor optimizer performance and errors." />}
      {activeTab === 'ocr' && <AdminPlaceholder title="OCR Operations" description="Monitor extraction success and model usage." />}
      {activeTab === 'free-runs' && <AdminPlaceholder title="Free Run Management" description="Configure global free run allowances and policies." />}
      {activeTab === 'health' && <AdminPlaceholder title="System Health" description="View operational status of Gadwal components." />}
      {activeTab === 'maintenance' && <AdminPlaceholder title="Maintenance Mode" description="Enable or disable application maintenance." />}
      {activeTab === 'security' && <AdminPlaceholder title="Security Center" description="Monitor unauthorized access and suspicious behavior." />}
      {activeTab === 'admins' && <AdminPlaceholder title="Administrator Accounts" description="Manage owner and support accounts." />}
      {activeTab === 'settings' && <AdminPlaceholder title="Global Configuration" description="Manage safe business parameters." />}

    </AdminLayout>
  );
}
`;

content = content.substring(0, renderStart) + newRender;

fs.writeFileSync('src/AdminApp.tsx', content, 'utf-8');
console.log('Tabs updated');
