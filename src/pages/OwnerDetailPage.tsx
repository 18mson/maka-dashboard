import { ArrowLeft, Download, DollarSign, Phone } from 'lucide-react';
import { downloadCSV } from '../lib/downloadCSV';
import { mockOwners } from '../lib/mockOwners';
import { mockPayments, mockCallLogs } from '../lib/mockData';
import type { Database } from '../lib/database.types';

type Owner = Database['public']['Tables']['owners']['Row'];
type Payment = Database['public']['Tables']['payment_history']['Row'];
type CallLog = Database['public']['Tables']['call_center_logs']['Row'];

interface OwnerDetailPageProps {
  ownerId: string;
  onBack: () => void;
}

export default function OwnerDetailPage({ ownerId, onBack }: OwnerDetailPageProps) {
  const owner: Owner | undefined = mockOwners.find(o => o.id === ownerId);
  const payments: Payment[] = mockPayments.filter(p => p.owner_id === ownerId).sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
  const callLogs: CallLog[] = mockCallLogs.filter(c => c.owner_id === ownerId).sort((a, b) => new Date(b.call_date).getTime() - new Date(a.call_date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority] || 'bg-gray-100 text-gray-800'}`}>
        {priority}
      </span>
    );
  };

  if (!owner) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Owner not found</p>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-800">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Owners
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{owner.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{owner.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{owner.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Motor Model</p>
            <p className="font-medium text-gray-900">{owner.motor_model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Serial Number</p>
            <p className="font-medium text-gray-900 font-mono">{owner.motor_serial}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Purchase Date</p>
            <p className="font-medium text-gray-900">{new Date(owner.purchase_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-gray-900">{getStatusBadge(owner.status)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
            </div>
            <button
              onClick={() => downloadCSV(payments, `payment-history-${owner.name}`)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No payment history
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(payment.transaction_date)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {payment.payment_type}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {getStatusBadge(payment.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Call Center History</h3>
            </div>
            <button
              onClick={() => downloadCSV(callLogs, `call-history-${owner.name}`)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {callLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No call center history
                    </td>
                  </tr>
                ) : (
                  callLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(log.call_date)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {log.issue_type}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {getPriorityBadge(log.priority)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {getStatusBadge(log.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
