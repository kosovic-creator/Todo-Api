'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReactNode, useState } from 'react'

export default function ClientComponent({ children }: { children: ReactNode }) {
const [state, setState] = useState('')
  const [count, setCount] = useState(0)
  return (
    <>
    <div>
      <h1>Ovo je client komponenta</h1>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <p>{count}</p>
      <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <p>{state}</p>
    </div>

    </>
  )
}
