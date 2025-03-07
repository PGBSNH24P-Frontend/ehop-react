import { create } from "zustand";

export const useStore = create((set) => ({
    products: [],
    cart: {},

    setProducts: (products) => set(state => ({ ...state, products }))
}));