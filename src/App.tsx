import { useState } from 'react';
import { Header } from './components/layout/Header';
import { LoginPage } from './components/auth/LoginPage';
import { LandingPage } from './components/home/LandingPage';
import { InventoryTable } from './components/inventory/InventoryTable';
import { WarehouseLogs } from '@/components/logs/WarehouseLogs';
import { Reports } from './components/reports/Reports';
import { KPICard } from './components/dashboard/KPICard';
import { useInventoryData } from './hooks/useInventoryData';
import { useAuth } from './hooks/useAuth';
import { Package, AlertTriangle, DollarSign, Activity } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState('home');
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  const {
    inventoryItems,
    stockMovements,
    kpiData,
    chartData,
    addInventoryItem,
    addStockMovement
  } = useInventoryData();

  const handleLogin = (credentials: { email: string; password: string }) => {
    const success = login(credentials);
    if (!success) {
      alert('Invalid credentials. Please try the demo credentials provided.');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveView('home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading SmartInventory...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <LandingPage onNavigate={setActiveView} />;
      
      case 'inventory':
        return (
          <div className="space-y-6">
            {/* KPI Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Items"
                value={kpiData.totalItems}
                icon={Package}
                color="teal"
                trend="up"
                trendValue="+5.2%"
              />
              <KPICard
                title="Low Stock Alerts"
                value={kpiData.lowStockAlerts}
                icon={AlertTriangle}
                color={kpiData.lowStockAlerts > 0 ? "red" : "green"}
                trend={kpiData.lowStockAlerts > 0 ? "up" : "down"}
                trendValue={kpiData.lowStockAlerts > 0 ? "Needs attention" : "All good"}
              />
              <KPICard
                title="Stock Value"
                value={`$${kpiData.stockValue.toLocaleString()}`}
                icon={DollarSign}
                color="green"
                trend="up"
                trendValue="+12.3%"
              />
              <KPICard
                title="Movements Today"
                value={kpiData.totalMovements}
                icon={Activity}
                color="blue"
                trend="up"
                trendValue="+8 today"
              />
            </div>
            
            {/* Inventory Table */}
            <InventoryTable 
              items={inventoryItems}
              onAddItem={addInventoryItem}
              onAddMovement={addStockMovement}
            />
          </div>
        );
      
      case 'logs':
        return (
          <WarehouseLogs 
            movements={stockMovements}
            onAddMovement={addStockMovement}
          />
        );
      
      case 'reports':
        return (
          <Reports 
            inventoryItems={inventoryItems}
            stockMovements={stockMovements}
            chartData={chartData}
          />
        );
      
      default:
        return <LandingPage onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header 
        activeView={activeView} 
        onViewChange={setActiveView}
        user={user}
        onLogout={handleLogout}
      />
      <main className={activeView === 'home' ? 'w-full' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 min-h-0'}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;