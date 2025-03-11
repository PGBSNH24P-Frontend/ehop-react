import { useStore } from "../states/store";

export function CartItem({ cartItem }) {
    const { product, amount } = cartItem;
    // Hämta funktioner för att öka, minska och radera produkten från varukorgen
    const incrementCartItemAmount = useStore(state => state.incrementCartItemAmount);
    const decrementCartItemAmount = useStore(state => state.decrementCartItemAmount);
    const removeCartItem = useStore(state => state.removeCartItem);

    return (
        <>
            <h1>{product.title}</h1>
            <span>
                <button onClick={() => decrementCartItemAmount(product)}>-</button>
                <span>{amount}</span>
                <button onClick={() => incrementCartItemAmount(product)}>+</button>
            </span>
            <button onClick={() => removeCartItem(product)}>Delete</button>
            <p>{product.price}</p>
        </>
    );
}