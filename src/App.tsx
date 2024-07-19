import Counter from "./Counter";
import { ContextProvider, initState } from "./CounterContext";

export default function App() {
  return (
    <div>
      <ContextProvider count={initState.count} text={initState.text} >
        <Counter>{ (n: number) => <>Counter: {n}</> }</Counter>
      </ContextProvider>
    </div>
  )
}