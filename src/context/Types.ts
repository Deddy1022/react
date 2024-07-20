import { ReactElement } from "react"

export type ProductType = {
  sku: string,
  name: string,
  price: number
}

export type CartItemType = {
  sku: string,
  name: string,
  price: number,
  qty: number,
}

export type UseProductsContextType = {
  products: ProductType[]
}

export type CartStateType = { cart: CartItemType[] }

export type ChildrenType = {
  children?: ReactElement | ReactElement[]
}

export type PropsType = {
  viewCart: boolean,
  setViewCart?: React.Dispatch<React.SetStateAction<boolean>>
}