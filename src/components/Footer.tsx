import { PropsType } from "../context/Types";
import useCart from "../hooks/useCart";

export default function Footer({ viewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();
  const year: number = new Date().getFullYear();
  const pageContent = viewCart ? <p>Shopping cart &copy; { year }</p>: (
    <>
      <p>Total Items: { totalItems }</p>
      <p>Total Price: { totalPrice }</p>
      <p>Shopping cart &copy; { year }</p>
    </>
  )
  const content = (
    <footer className="footer">
      { pageContent }
    </footer>
  )
  return content;
}
