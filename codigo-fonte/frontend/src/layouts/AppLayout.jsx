import { useState } from 'react';
import { Logo, Button } from '../components/ui';
import { useAuthStore } from '../stores/authStore';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-body-medium text-gray-700">
                    Bem-vindo, {user.name || user.email}
                  </span>
                  <Button variant="outline" size="small" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
