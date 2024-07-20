import { PropsType } from "../context/Types"
import useCart from "../hooks/useCart";
import Nav from "./Nav"

export default function Header({ viewCart, setViewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();
  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>Acme.co</h1>
        <div className="header__price-box">
          <p>Total Items: { totalItems }</p>
          <p>Total Price: { totalPrice }</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )
  return content;
}
