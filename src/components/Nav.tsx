import { PropsType } from "../context/Types";

export default function Nav({ viewCart, setViewCart }: PropsType) {
  const button = (<button onClick={() => setViewCart!(!viewCart)}>View {viewCart ? "Products": "Cart"}</button>);
  const content = (
    <nav className="nav">
      { button }
    </nav>
  )
  return content;
}
