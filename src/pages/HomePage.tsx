import { Users, CreditCard, Phone, Battery } from 'lucide-react';
import { mockOwners } from '../lib/mockOwners';
import { mockPayments } from '../lib/mockData';
import { mockCallLogs } from '../lib/mockData';
import { mockChargerStations } from '../lib/mockChargerStations';

export default function HomePage() {
  // Calculate statistics
  const totalRiders = mockOwners.length;

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Count successful transactions this month
  const successfulTransactionsThisMonth = mockPayments.filter(payment => {
    const paymentDate = new Date(payment.transaction_date);
    return payment.status === 'completed' &&
           paymentDate.getMonth() === currentMonth &&
           paymentDate.getFullYear() === currentYear;
  }).length;

  // Total hotline calls
  const totalHotlineCalls = mockCallLogs.length;

  // Total charger stations
  const totalChargerStations = mockChargerStations.length;

  const stats = [
    {
      title: 'Total Riders',
      value: totalRiders.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      description: 'Registered motor owners'
    },
    {
      title: 'Successful Transactions',
      value: successfulTransactionsThisMonth.toLocaleString(),
      icon: CreditCard,
      color: 'bg-green-500',
      description: 'This month'
    },
    {
      title: 'Hotline Calls',
      value: totalHotlineCalls.toLocaleString(),
      icon: Phone,
      color: 'bg-orange-500',
      description: 'Total support calls'
    },
    {
      title: 'Charger Stations',
      value: totalChargerStations.toLocaleString(),
      icon: Battery,
      color: 'bg-purple-500',
      description: 'Available charging locations'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to Maka EV Motor Monitoring System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900">Manage Owners</h4>
            <p className="text-sm text-gray-600 mt-1">View and manage motor owners</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900">Charger Stations</h4>
            <p className="text-sm text-gray-600 mt-1">Monitor charging infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}