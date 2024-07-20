import { useContext } from "react";
import { UseProductsContextType } from "../context/Types";
import ProductsContext from "../context/ProductProvider";

export default function useProducts():UseProductsContextType {
  return useContext(ProductsContext);
}