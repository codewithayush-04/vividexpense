import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = ({ user, onLogout }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">VividSpend</h1>
          <p className="text-sm text-[#64748B] mt-1">Track smarter, save more</p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-[#64748B] hover:bg-slate-50'
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-slate-50 rounded-xl mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#0F172A] truncate">{user?.name}</p>
                <p className="text-sm text-[#64748B] truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full rounded-full border-slate-200 hover:bg-slate-50"
            data-testid="logout-button"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 px-4 flex items-center justify-between z-50">
        <h1 className="text-2xl font-heading font-bold text-primary">VividSpend</h1>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </header>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around z-50">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-primary' : 'text-[#64748B]'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;