'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { FC, useReducer } from 'react';
import  { useState } from 'react';

// Definišemo tipove za stanje i akcije
type State = {
  count: number;
  odobrenje: string;
};

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setCount'; payload: number };


// Inicijalno stanje
const initialState: State = { count: 0 , odobrenje: 'nije odobren' };

// Reducer funkcija
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        odobrenje: state.count + 1 > 5 ? 'odobren' : 'nije odobren'
      };
    case 'decrement':
      return {
        count: state.count - 1,
        odobrenje: state.count - 1 > 5 ? 'odobren' : 'nije odobren'
      };
      case "setCount":
        return {
          ...state,
          count: action.payload!,
          odobrenje: action.payload > 5 ? 'odobren' : 'nije odobren'
        };
        case 'reset':
      return { count: 0, odobrenje: 'nije odobren' };
    default:
      throw new Error('Unknown action type');
  }
}

const Counter: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
};

  return (
    <div>
      <h1>Count: {state.count}</h1> <h1>Count: {state.odobrenje}</h1>
      <Button onClick={() => dispatch({ type: 'increment' })}>Increment</Button>
      <Button onClick={() => dispatch({ type: 'decrement' })}>Decrement</Button>
      <Button onClick={() => dispatch({ type: 'reset' })}>Reset</Button>
      <Input value={state.count} onChange={defineCount} />
    </div>
  );
};



export default Counter;





