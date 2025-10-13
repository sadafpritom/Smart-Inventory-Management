import { useState, useCallback, useMemo } from 'react';
import { InventoryItem, StockMovement, KPIData } from '../types/inventory';
import { initialInventoryItems, initialStockMovements } from '../data/mockData';

export const useInventoryData = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(initialStockMovements);

  const updateItemStatus = (item: InventoryItem): InventoryItem => {
    let status: 'in-stock' | 'low-stock' | 'out-of-stock';
    if (item.quantity === 0) {
      status = 'out-of-stock';
    } else if (item.quantity <= item.minQuantity) {
      status = 'low-stock';
    } else {
      status = 'in-stock';
    }
    return { ...item, status };
  };

  const addInventoryItem = useCallback((newItem: Omit<InventoryItem, 'id' | 'lastUpdated' | 'status'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
      status: 'in-stock'
    };
    const updatedItem = updateItemStatus(item);
    setInventoryItems(prev => [...prev, updatedItem]);
  }, []);

  const updateInventoryItem = useCallback((id: string, updates: Partial<InventoryItem>) => {
    setInventoryItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates, lastUpdated: new Date().toISOString() };
        return updateItemStatus(updatedItem);
      }
      return item;
    }));
  }, []);

  const addStockMovement = useCallback((movement: Omit<StockMovement, 'id' | 'timestamp'>) => {
    const newMovement: StockMovement = {
      ...movement,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setStockMovements(prev => [newMovement, ...prev]);
    
    // Update inventory quantity
    setInventoryItems(prev => prev.map(item => {
      if (item.id === movement.itemId) {
        const quantityChange = movement.type === 'inbound' ? movement.quantity : -movement.quantity;
        const newQuantity = Math.max(0, item.quantity + quantityChange);
        const updatedItem = { ...item, quantity: newQuantity, lastUpdated: new Date().toISOString() };
        return updateItemStatus(updatedItem);
      }
      return item;
    }));
  }, []);

  const kpiData: KPIData = useMemo(() => {
    const totalItems = inventoryItems.length;
    const lowStockAlerts = inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length;
    const stockValue = inventoryItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    const totalMovements = stockMovements.length;

    return {
      totalItems,
      lowStockAlerts,
      stockValue,
      totalMovements
    };
  }, [inventoryItems, stockMovements]);

  const getChartData = useMemo(() => {
    // Stock by category
    const categoryData = inventoryItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const stockByCategory = Object.entries(categoryData).map(([category, quantity]) => ({
      name: category,
      value: quantity
    }));

    // Movement trend (last 7 days)
    const movementTrend = stockMovements
      .slice(0, 7)
      .reverse()
      .map((movement, index) => ({
        day: `Day ${index + 1}`,
        inbound: movement.type === 'inbound' ? movement.quantity : 0,
        outbound: movement.type === 'outbound' ? movement.quantity : 0
      }));

    return { stockByCategory, movementTrend };
  }, [inventoryItems, stockMovements]);

  return {
    inventoryItems,
    stockMovements,
    kpiData,
    chartData: getChartData,
    addInventoryItem,
    updateInventoryItem,
    addStockMovement
  };
};