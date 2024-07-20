import { useContext } from "react";
import { CartContext, useCartContextType } from "../context/CartProvider";

export default function useCart(): useCartContextType {
  return useContext(CartContext)
}