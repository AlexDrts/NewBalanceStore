import  { useEffect, useReducer } from "react";
import { getCart, saveCart } from "../utils/cartStorage.js";
import { Cart } from "../entities/Cart.js";
import { cartReducer } from "../reducers/cartReducer.js";
import { CartContext } from "./CartContext.jsx";


export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(
        cartReducer,
        new Cart(getCart())
    );

    useEffect(() => {
        saveCart(cart.products);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

