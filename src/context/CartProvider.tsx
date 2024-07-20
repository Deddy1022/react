import { createContext, ReactElement, useMemo, useReducer } from "react";
import { CartItemType, CartStateType, ChildrenType } from "./Types";

const initCartState: CartStateType = {
  cart: []
}

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string,
  payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch(action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if(!action.payload) {
        throw new Error('action.payload missing Add action')
      }
      const {sku, name, price} = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      const itemExists: CartItemType | undefined = state.cart.find(i => i.sku === sku);
      const qty = itemExists ? itemExists.qty + 1: 1
      return {
        ...state,
        cart: [
          ...filteredCart,
          {
            sku, name, price, qty
          }
        ]
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if(!action.payload) {
        throw new Error('action.payload missing REMOVE action')
      }
      const {sku} = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      return {
        ...state,
        cart: [...filteredCart]
      }
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if(!action.payload)
        throw new Error('action.payload missing QUANTITY action')
      const {sku, qty} = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku);
      const itemExists: CartItemType | undefined = state.cart.find(i => i.sku === sku);
      if(!itemExists)
        throw new Error('Item must exist in order to update quantity');
      const updated = {...itemExists, qty};
      return {...state, cart: [...filteredCart, updated]}
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return {
        ...state,
        cart: []
      }
    }
    default:
      throw new Error('Unidentified');
  }
}

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);
  const REDUCER_ACTIONS = useMemo(() => REDUCER_ACTION_TYPE, []);
  const totalItems = state.cart.reduce((prev, next) => prev + next.qty, 0);
  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    state.cart.reduce((prev, next) => prev + (next.qty * next.price), 0)
  )
  const cart = state.cart.sort((a, b) => {
    const itemA = +(a.sku.slice(4));
    const itemB = +(b.sku.slice(4));
    return itemA - itemB;
  })
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: []
}

export const CartContext = createContext<useCartContextType>(initCartContextState);

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return(
    <CartContext.Provider value={useCartContext(initCartState)}>
      { children }
    </CartContext.Provider>
  );
}