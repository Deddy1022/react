import React, { useState } from 'react'
import useCart from '../hooks/useCart';
import CartLineItem from './CartLineItem';

export default function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart();
  const pageContent =  confirm ? <h2>Thank you for your order.</h2> : <>
    <h2 className="offscreen">Cart</h2>
    <ul className="cart">
      {cart.map(item => <CartLineItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />)}
    </ul>
    <div className="cart__totals">
      <p>Total Items: { totalItems }</p>
      <p>Total Items: { totalPrice }</p>
      <button className="cart__submit" disabled={!totalItems} onClick={() => {
        dispatch({type: REDUCER_ACTIONS.SUBMIT});
        setConfirm(true);
      }} >Place Order</button>
    </div>
  </>

  const content = (
    <main className="main main--cart">
      {pageContent}
    </main>
  )
  return (
    <div>
      {content}
    </div>
  )
}
