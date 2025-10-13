export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  location: string;
  zone: string;
  category: string;
  price: number;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  sku: string;
  type: 'inbound' | 'outbound';
  quantity: number;
  location: string;
  timestamp: string;
  notes?: string;
  operator: string;
}

export interface KPIData {
  totalItems: number;
  lowStockAlerts: number;
  stockValue: number;
  totalMovements: number;
}