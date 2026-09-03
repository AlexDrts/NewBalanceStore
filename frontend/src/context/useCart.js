import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";

export function useCart() {
    return useContext(CartContext);
}