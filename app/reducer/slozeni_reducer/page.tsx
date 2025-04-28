
'use client';
import { Button } from '@/components/ui/button';
import React, { useReducer } from 'react';

export default function AppReducerSlozeni() {
  interface State {
    banka: string;
    iznos: number;
    odobrenje: string;


  }

  interface Action {
    type: 'UPLATA' | 'ISPLATA';
  }
  // const trenutni_iznos = ;
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'UPLATA':
        const newIznos = state.iznos + 100;
        return {
          ...state,
          iznos: newIznos,
          odobrenje: newIznos > 150 ? 'kredit je odobren' : state.odobrenje,
        };

        case 'ISPLATA':
          const newIznosIsplate = state.iznos - 100;
          return {
            ...state,
            iznos: newIznosIsplate,
            odobrenje: newIznosIsplate < 150 ? 'kredit je nije odobren' : state.odobrenje,
          };
      default:
        return state;
    }
  };

  const initialState = {
    banka: 'NLB',
    iznos: 100,
    odobrenje: 'nije odobren',

  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
 <div>
      <h1>Banka: {state.banka}</h1>
      <p>Sada je iznos na vašem računu: {state.iznos}</p>

      <p>kredit je : {state.odobrenje}</p>
      <Button className='bg-amber-950 size-fit' onClick={() => dispatch({ type: 'UPLATA' })}>Uplata</Button>
      <Button onClick={() => dispatch({ type: 'ISPLATA' })}>Ispalta</Button>
    </div>
    <input
      type="text"

      onChange={(e) => console.log(e.target.value)}
      className="mb-4 p-2 border border-gray-300 rounded"
      placeholder="Unesite iznos"


    />

    </>

  );
}
