import { useState } from 'react';
import { Search, Plus, QrCode, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '../../types/inventory';
import { AddItemModal } from './AddItemModal';
import { AddMovementModal } from '../logs/AddMovementModal';

interface InventoryTableProps {
  items: InventoryItem[];
  onAddItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated' | 'status'>) => void;
  onAddMovement: (movement: any) => void;
}

export const InventoryTable = ({ items, onAddItem, onAddMovement }: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'low-stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'out-of-stock':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'in-stock': 'default',
      'low-stock': 'secondary',
      'out-of-stock': 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const handleBarcodeIntegration = (item: InventoryItem) => {
    // Mock barcode integration
    alert(`Barcode scan initiated for ${item.name} (SKU: ${item.sku})`);
  };

  const handleQuickMovement = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowMovementModal(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Inventory Management</span>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search items by name, SKU, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Item Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                      <div className="text-xs text-gray-400">{item.category}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.location}</div>
                      <div className="text-xs text-gray-500">{item.zone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.quantity}</div>
                      <div className="text-xs text-gray-500">Min: {item.minQuantity}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">${(item.quantity * item.price).toFixed(2)}</div>
                      <div className="text-xs text-gray-500">${item.price}/unit</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBarcodeIntegration(item)}
                        className="text-teal-600 border-teal-600 hover:bg-teal-50"
                      >
                        <QrCode className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickMovement(item)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Move
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No items found matching your criteria.
          </div>
        )}
      </CardContent>

      <AddItemModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={onAddItem}
      />

      <AddMovementModal
        isOpen={showMovementModal}
        onClose={() => setShowMovementModal(false)}
        onAdd={onAddMovement}
        selectedItem={selectedItem}
      />
    </Card>
  );
};