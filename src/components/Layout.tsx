import { Users, Battery, Menu, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'owners', label: 'Motor Owners', icon: Users },
    { id: 'stations', label: 'Charger Stations', icon: Battery },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Maka Dashboard</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">EV Motor Monitoring System</div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform' : 'relative bg-white border-r border-gray-200'} ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : (isSidebarOpen ? 'w-64' : 'w-0')} transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); if (isMobile) setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
        )}

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
