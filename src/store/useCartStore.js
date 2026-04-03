import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addToCart: (item) => set((state) => ({
    items: [...state.items, item],
    total: state.total + item.price,
  })),
  removeFromCart: (item) => set((state) => {
    const index = state.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      const newItems = [...state.items];
      newItems.splice(index, 1);
      return {
        items: newItems,
        total: state.total - state.items[index].price,
      };
    }
    return state;
  }),
}));
