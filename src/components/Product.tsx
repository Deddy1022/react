import React, { Dispatch, ReactElement } from 'react'
import { ProductType } from '../context/Types'
import { ReducerAction, ReducerActionType } from '../context/CartProvider'

type PropsType = {
  product: ProductType,
  dispatch: Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

export default function Product({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement {
  const onAddCart = () => dispatch({
    type: REDUCER_ACTIONS.ADD,
    payload: {
      ...product,
      qty: 1
    }
  })

  const itemInCart = inCart ? '-> In Cart 😘': null
  return (
    <article className="product">
      <h3>{ product.name }</h3>
      <img src="" alt="" className='product__img' />
      <p>{ new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(product.price) } { itemInCart }</p>
      <button onClick={onAddCart}>Add to Cart</button>
    </article>
  )
}
