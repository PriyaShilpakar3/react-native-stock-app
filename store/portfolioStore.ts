import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchStockPrice } from '../api/stocks';

export const usePortfolioStore = create((set, get) => ({

  stocks: [],

  // 🟢 LOAD FROM STORAGE
  loadStocks: async () => {
    const data = await AsyncStorage.getItem('stocks');
    if (data) {
      set({ stocks: JSON.parse(data) });
    }
  },

  // 🟢 ADD STOCK (WITH LIVE PRICE API)
  addStock: async (stock) => {
    try {
      const livePrice = await fetchStockPrice(stock.ticker);

      const newStock = {
        ...stock,
        currentPrice: livePrice || stock.currentPrice,
      };

      const updated = [...get().stocks, newStock];

      set({ stocks: updated });
      await AsyncStorage.setItem('stocks', JSON.stringify(updated));

    } catch (error) {
      console.log("Add Stock Error:", error);

      const updated = [...get().stocks, stock];
      set({ stocks: updated });
      await AsyncStorage.setItem('stocks', JSON.stringify(updated));
    }
  },

  // 🟢 DELETE STOCK
  deleteStock: async (id) => {
    const updated = get().stocks.filter((s) => s.id !== id);

    set({ stocks: updated });
    await AsyncStorage.setItem('stocks', JSON.stringify(updated));
  },

  // 🟢 UPDATE STOCK
  updateStock: async (updatedStock) => {
    const updated = get().stocks.map((s) =>
      s.id === updatedStock.id ? updatedStock : s
    );

    set({ stocks: updated });
    await AsyncStorage.setItem('stocks', JSON.stringify(updated));
  },

  // 🟢 REFRESH ALL PRICES (OPTIONAL BUT POWERFUL)
  refreshPrices: async () => {
    try {
      const updatedStocks = await Promise.all(
        get().stocks.map(async (s) => {
          const livePrice = await fetchStockPrice(s.ticker);

          return {
            ...s,
            currentPrice: livePrice || s.currentPrice,
          };
        })
      );

      set({ stocks: updatedStocks });
      await AsyncStorage.setItem('stocks', JSON.stringify(updatedStocks));

    } catch (error) {
      console.log("Refresh Error:", error);
    }
  },

}));