import { createContext, ReactElement, useState } from "react";
import { ChildrenType, ProductType, UseProductsContextType } from "./Types";

// const initState: ProductType[] = [];

const initState: ProductType[] = [
  {
    "sku": "item001",
    "name": "Widget",
    "price": 9.99
  },
  {
    "sku": "item002",
    "name": "Premier Widget",
    "price": 19.99
  },
  {
    "sku": "item003",
    "name": "Deluxe Widget",
    "price": 29.99
  }
];

const initContextState: UseProductsContextType = {products: []};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, ] = useState<ProductType[]>(initState);

  // useEffect(() => {
  //   const fetchProducts = async(): Promise<ProductType[]> => {
  //     const response = await fetch('http://localhost:3000/products');
  //     const data = await response.json()
  //     return await data;
  //   }

  //   fetchProducts().then(p => setProducts(p));
  // })

  return(
    <ProductsContext.Provider value={{ products }}>
      { children }
    </ProductsContext.Provider>
  );
}

export default ProductsContext;