import { ChangeEvent, createContext, ReactElement, useCallback, useContext, useReducer } from "react";

type State = {
  count: number,
  text: string,
}

export const initState = {
  count: 0,
  text: ''
}

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE,
  payload?: string,
}

function reducer(state: State, action: ReducerAction): State {
  switch(action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT: {
      return {...state, count: state.count + 1}
    }
    case REDUCER_ACTION_TYPE.DECREMENT: {
      return {...state, count: state.count - 1}
    }
    case REDUCER_ACTION_TYPE.NEW_INPUT: {
      return {...state, text: action.payload ?? ''}
    }
    default: throw new Error();
  }
}

const useCounterContext = (initState: State) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const increment = useCallback(() => dispatch({
    type: REDUCER_ACTION_TYPE.INCREMENT,
  }), []);
  const decrement = useCallback(() => dispatch({
    type: REDUCER_ACTION_TYPE.DECREMENT,
  }), []);
  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value
    })
  }, []);

  return { 
    state,
    increment,
    decrement,
    handleInput
  }
}

type useContextType = ReturnType<typeof useCounterContext>

const initContextState: useContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  handleInput: (e: ChangeEvent<HTMLInputElement>) => {},
}

export const CounterContext = createContext<useContextType>(initContextState)

type ChildrenType = {
  children?: ReactElement | undefined
}

export const ContextProvider = ({children, ...initState}: ChildrenType & State): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)} >
      {children}
    </CounterContext.Provider>
  )
}

type UseCounterHookType = {
  count: number,
  increment: () => void,
  decrement: () => void,
}

export const useCounter = (): UseCounterHookType => {
  const { state: { count }, increment, decrement } = useContext(CounterContext);
  return { count, increment, decrement }
}

type UseTextHookType = {
  text: string,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const useCounterText = (): UseTextHookType => {
  const { state: { text }, handleInput } = useContext(CounterContext);
  return { text, handleInput }
}