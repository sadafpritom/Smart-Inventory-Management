import { Download, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { InventoryItem, StockMovement } from '../../types/inventory';

interface ReportsProps {
  inventoryItems: InventoryItem[];
  stockMovements: StockMovement[];
  chartData: {
    stockByCategory: Array<{ name: string; value: number }>;
    movementTrend: Array<{ day: string; inbound: number; outbound: number }>;
  };
}

const COLORS = ['#14B8A6', '#10B981', '#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B'];

export const Reports = ({ inventoryItems, stockMovements, chartData }: ReportsProps) => {
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  const fastMovingItems = inventoryItems.slice(0, 5); // Mock fast-moving items

  const downloadCSV = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(item => Object.values(item).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadInventory = () => {
    downloadCSV(inventoryItems, 'inventory-report');
  };

  const handleDownloadMovements = () => {
    downloadCSV(stockMovements, 'movements-report');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={handleDownloadInventory}
            variant="outline"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Inventory CSV
          </Button>
          <Button 
            onClick={handleDownloadMovements}
            variant="outline"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Movements CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600">Total Stock Value</p>
                <p className="text-3xl font-bold text-teal-900">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Items</p>
                <p className="text-3xl font-bold text-blue-900">{inventoryItems.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Low Stock Alerts</p>
                <p className="text-3xl font-bold text-yellow-900">{lowStockItems.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.stockByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.stockByCategory.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Movement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.movementTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="inbound" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    dot={{ fill: '#14B8A6', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="outbound" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    dot={{ fill: '#EF4444', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fast Moving Items & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fast-Moving Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              {fastMovingItems.map((item,) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.quantity}</p>
                    <p className="text-xs text-gray-500">units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-red-600">
                      Current: {item.quantity} | Min: {item.minQuantity}
                    </p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              ))}
              {lowStockItems.length === 0 && (
                <p className="text-center text-gray-500 py-4">All items are well-stocked!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};