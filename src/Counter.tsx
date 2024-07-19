import { ReactNode } from "react";
import { useCounter, useCounterText } from "./CounterContext";

type ChildrenType = {
  children: (n: number) => ReactNode;
}

export default function Counter({ children }: ChildrenType) {
  const { count, increment, decrement } = useCounter();
  const { text, handleInput } = useCounterText();
  return (
    <>
      <h1>{ children(count) }</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <br />
        <input type="text" onChange={handleInput} />
        <h2>{ text }</h2>
      </div>
    </>
  )
}
