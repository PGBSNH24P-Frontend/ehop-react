import { create } from "zustand";

export const useStore = create((set) => ({
    // State som håller koll på alla produkter från DummyJSON
    products: [],

    // State som håller koll på alla produkter i varukorgen
    // Struktur: { product: product, amount: int }
    cart: [],

    // State som håller koll på om varukorgen är öppen eller inte
    cartOpen: false,

    // Öppna eller stäng varukorgen
    setCartOpen: (open) => set(state => ({ ...state, cartOpen: open })),

    // Ladda in produkter (görs i App från DummyJSON)
    setProducts: (products) => set(state => ({ ...state, products })),

    // Lägg till en produkt i varukorgen
    addCartItem: (product) => set(state => {
        // Hämta potentiell existerande produkt i varukorgen
        const existing = state.cart.find(item => item.product.id === product.id);
        // Kolla om produkten redan finns i varukorgen
        if (existing !== undefined) {
            // Öka antalet för existerande produkt
            // (istället för att lägga in den på nytt)
            return { // Kopiera all information och ändra bara på 'cart'
                ...state, cart: state.cart.map(item => {
                    // Öka för produkten
                    if (item.product.id === product.id) {
                        return { product, amount: item.amount + 1 };
                    }

                    // Andra produkter förblir demsamma
                    return item;
                })
            };
        }

        // Lägg till en ny produkt i varukorgen
        return { ...state, cart: [...state.cart, { product, amount: 1 }] };
    }),

    // Ta bort en hel produkt från varukorgen
    // genom filter.
    removeCartItem: (product) => set(state => ({ ...state, cart: state.cart.filter(item => item.product.id !== product.id) })),

    // Öka antalet av en viss produkt i varukorgen
    incrementCartItemAmount: (product) => set(state => (
        {
            ...state, cart: state.cart.map(item => {
                if (item.product.id === product.id) {
                    // Öka för produkten
                    return { product, amount: item.amount + 1 };
                }

                // Andra produkter förblir demsamma
                return item;
            })
        })),

    // Minska antalet av en viss produkt i varukorgen
    // Eller radera den om antalet är 1
    decrementCartItemAmount: (product) => set(state => {
        // Hämta produkten och kolla om antalet är 1
        const existing = state.cart.find(item => item.product.id === product.id);
        if (existing !== undefined && existing.amount <= 1) {
            // Antalet är 1 så radera produkten istället
            return { ...state, cart: state.cart.filter(item => item.product.id !== product.id) };
        }

        return {
            ...state, cart: state.cart.map(item => {
                if (item.product.id === product.id) {
                    // Minska för produkten
                    return { product, amount: item.amount - 1 };
                }

                // Andra produkter förblir demsamma
                return item;
            })
        };
    }),

    // Töm hela varukorgen genom att sätta 'cart' till en tom array
    clearCart: () => set(state => ({ ...state, cart: [] }))
}));