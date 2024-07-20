import { ChangeEvent, Dispatch, memo, ReactElement } from "react"
import { CartItemType } from "../context/Types"
import { ReducerAction, ReducerActionType } from "../context/CartProvider"

type PropsType = {
  item: CartItemType,
  dispatch: Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
}

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropsType): ReactElement {
  const lineTotal: number = (item.qty * item.price);

  const highestQty: number = 20 > item.qty ? 20: item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1);

  const options: ReactElement[] = optionValues.map(val => <option key={`opt${val}`} value={val}>{ val }</option>)

  const content = (<li className="cart__item">
    <div aria-label="Item Name">{ item.name }</div>
    <div aria-label="Price per Item">{ new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price) }</div>
    <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
    <select name="itemQty" id="itemQty" className="cart__select" value={item.qty} aria-label="Item Quantity" onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: {...item, qty: +(e.target.value)}
    })}>{options}</select>

    <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
      { new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal) }
    </div>

    <button className="cart__button" aria-label="Remove Item Form Cart"
    onClick={() => {
      dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item
      })
    }}
    >✖️</button>
  </li>)
  return content;

}

const areCartEquals = ({item: prev}: PropsType, {item: next}: PropsType) => {
  return Object.keys(prev).every(key => prev[key as keyof CartItemType] === next[key as keyof CartItemType])
}

const MemoizeCart = memo<typeof CartLineItem>(CartLineItem, areCartEquals);
export default MemoizeCart;
