cat << 'INNER_EOF' > src/components/admin/AdminAuditLog.tsx
import React, { useEffect, useState } from 'react';
import { fetchJson } from '../../utils/api';
import { Database } from 'lucide-react';
import { formatTimeAgo } from '../../utils/dateFormatting';

export function AdminAuditLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/api/admin/owner/audit-logs').then(({ response, data }) => {
      if (response.ok) setLogs((data as any).logs);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Loading audit logs...</div>;

  return (
    <div className="p-8 space-y-6 animate-in fade-in">
      <div className="flex items-center gap-3">
        <Database className="w-6 h-6 text-text-muted" />
        <h2 className="text-2xl font-black tracking-tight">Audit Log</h2>
      </div>
      
      <div className="bg-paper border border-line rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-mist border-b border-line">
            <tr>
              <th className="p-4 font-bold text-text-secondary uppercase tracking-wider text-xs">Time</th>
              <th className="p-4 font-bold text-text-secondary uppercase tracking-wider text-xs">Admin</th>
              <th className="p-4 font-bold text-text-secondary uppercase tracking-wider text-xs">Action</th>
              <th className="p-4 font-bold text-text-secondary uppercase tracking-wider text-xs">Target</th>
              <th className="p-4 font-bold text-text-secondary uppercase tracking-wider text-xs">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-mist/50 transition-colors">
                <td className="p-4 whitespace-nowrap text-text-muted">{formatTimeAgo(log.timestamp)}</td>
                <td className="p-4 font-medium">{log.adminId}</td>
                <td className="p-4 font-bold text-emerald-700">{log.action}</td>
                <td className="p-4"><span className="text-xs bg-line px-2 py-1 rounded">{log.targetType}</span> {log.targetId}</td>
                <td className="p-4 text-xs text-text-secondary max-w-xs truncate" title={JSON.stringify(log.metadata)}>
                  {JSON.stringify(log.metadata)}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-text-muted">No audit logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
INNER_EOF
