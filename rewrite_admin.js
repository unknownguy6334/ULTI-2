import fs from 'fs';

let content = fs.readFileSync('src/AdminApp.tsx', 'utf-8');

const renderStart = content.indexOf('return (\n    <AdminLayout');
if (renderStart === -1) {
  console.log("Could not find render start");
  process.exit(1);
}

const newRender = `return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <AdminDashboard />}
      {activeTab === 'audit' && <AdminAuditLog />}
      
      {activeTab === 'payments' && (
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-black tracking-tight">Payments & Revenue</h2>
          <div className="flex gap-4 border-b border-line mb-6">
            <button onClick={() => setActiveTab('pending')} className="px-4 py-2 font-bold text-text-secondary hover:text-ink border-b-2 border-transparent hover:border-line">Pending Reviews</button>
            <button onClick={() => setActiveTab('history')} className="px-4 py-2 font-bold text-text-secondary hover:text-ink border-b-2 border-transparent hover:border-line">Payment History</button>
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-bold">Pending Reviews</h2>
          <div className="bg-white border border-line rounded-2xl p-6">
            {pendingSubmissions.length === 0 ? (
              <p>No pending submissions.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead><tr><th>Student</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {pendingSubmissions.map((item: any) => (
                    <tr key={item.submission.id}>
                      <td>{item.studentDisplayName}</td>
                      <td>{item.submission.amount}</td>
                      <td>{item.submission.status}</td>
                      <td>
                        <button onClick={() => handleApprove(item.submission.id)} className="text-emerald-600 font-bold">Approve</button>
                        <button onClick={() => openRejectModal(item.submission.id)} className="text-red-600 font-bold ml-4">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-bold">Payment History</h2>
          <div className="bg-white border border-line rounded-2xl p-6">
             <table className="w-full text-left text-sm">
                <thead><tr><th>Student</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {allSubmissions.map((item: any) => (
                    <tr key={item.submission.id}>
                      <td>{item.studentDisplayName}</td>
                      <td>{item.submission.amount}</td>
                      <td>{item.submission.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      )}

      {activeTab === 'entitlements' && (
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-bold">Entitlements</h2>
          <div className="bg-white border border-line rounded-2xl p-6">
             <table className="w-full text-left text-sm">
                <thead><tr><th>Student</th><th>Plan</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {entitlements.map((item: any) => (
                    <tr key={item.entitlement.id}>
                      <td>{item.studentDisplayName}</td>
                      <td>{item.entitlement.plan}</td>
                      <td>{item.entitlement.status}</td>
                      <td>
                        {item.entitlement.status === 'ACTIVE' && (
                          <button onClick={() => handleRevokeEntitlement(item.entitlement.id)} className="text-red-600 font-bold">Revoke</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
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
      {activeTab === 'students' && <AdminPlaceholder title="Students Directory" description="Manage student accounts." />}
      {activeTab === 'payment-methods' && <AdminPlaceholder title="Payment Methods" description="Configure available payment methods." />}
      {activeTab === 'academic' && <AdminPlaceholder title="Academic Terms" description="Configure academic years and terms." />}
      
      {/* Reject Modal */}
      {rejectingSubmissionId && (
        <div className="fixed inset-0 bg-ink/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-bold mb-4 text-lg">Reject Payment</h3>
            <textarea
              className="w-full border border-line rounded-lg p-3 text-sm min-h-[100px] mb-4"
              placeholder="Reason for rejection (sent to student)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setRejectingSubmissionId(null)} className="px-4 py-2 font-bold text-text-secondary">Cancel</button>
              <button onClick={handleConfirmReject} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg">Reject</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
`;

content = content.substring(0, renderStart) + newRender;
fs.writeFileSync('src/AdminApp.tsx', content, 'utf-8');
console.log('AdminApp.tsx completely repaired');
