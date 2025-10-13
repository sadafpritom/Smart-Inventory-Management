import { InventoryItem, StockMovement } from '../types/inventory';

export const initialInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Industrial Steel Brackets',
    sku: 'ISB-001',
    quantity: 150,
    minQuantity: 50,
    location: 'A1-B3',
    zone: 'Zone A',
    category: 'Hardware',
    price: 25.99,
    lastUpdated: '2025-01-27T10:30:00Z',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Premium LED Light Strips',
    sku: 'LED-002',
    quantity: 25,
    minQuantity: 30,
    location: 'B2-C1',
    zone: 'Zone B',
    category: 'Electronics',
    price: 89.50,
    lastUpdated: '2025-01-27T09:15:00Z',
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Hydraulic Pump Assembly',
    sku: 'HPA-003',
    quantity: 0,
    minQuantity: 5,
    location: 'C1-A2',
    zone: 'Zone C',
    category: 'Machinery',
    price: 450.00,
    lastUpdated: '2025-01-26T16:45:00Z',
    status: 'out-of-stock'
  },
  {
    id: '4',
    name: 'Safety Helmets - White',
    sku: 'SH-004',
    quantity: 200,
    minQuantity: 20,
    location: 'D1-A1',
    zone: 'Zone D',
    category: 'Safety',
    price: 18.75,
    lastUpdated: '2025-01-27T08:20:00Z',
    status: 'in-stock'
  },
  {
    id: '5',
    name: 'Precision Ball Bearings',
    sku: 'PBB-005',
    quantity: 75,
    minQuantity: 100,
    location: 'A2-C3',
    zone: 'Zone A',
    category: 'Components',
    price: 12.30,
    lastUpdated: '2025-01-27T11:00:00Z',
    status: 'low-stock'
  }
];

export const initialStockMovements: StockMovement[] = [
  {
    id: '1',
    itemId: '1',
    itemName: 'Industrial Steel Brackets',
    sku: 'ISB-001',
    type: 'inbound',
    quantity: 50,
    location: 'A1-B3',
    timestamp: '2025-01-27T10:30:00Z',
    notes: 'Weekly restock from supplier',
    operator: 'John Smith'
  },
  {
    id: '2',
    itemId: '2',
    itemName: 'Premium LED Light Strips',
    sku: 'LED-002',
    type: 'outbound',
    quantity: 15,
    location: 'B2-C1',
    timestamp: '2025-01-27T09:15:00Z',
    notes: 'Order #ORD-2025-001',
    operator: 'Maria Garcia'
  },
  {
    id: '3',
    itemId: '4',
    itemName: 'Safety Helmets - White',
    sku: 'SH-004',
    type: 'inbound',
    quantity: 100,
    location: 'D1-A1',
    timestamp: '2025-01-27T08:20:00Z',
    notes: 'Safety equipment restocking',
    operator: 'David Wilson'
  },
  {
    id: '4',
    itemId: '3',
    itemName: 'Hydraulic Pump Assembly',
    sku: 'HPA-003',
    type: 'outbound',
    quantity: 5,
    location: 'C1-A2',
    timestamp: '2025-01-26T16:45:00Z',
    notes: 'Emergency maintenance order',
    operator: 'Sarah Johnson'
  }
];