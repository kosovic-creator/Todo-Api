'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReactNode, useState } from 'react'
import { usePathname,useRouter } from "next/navigation"


export default function ClientComponent() {
const [state, setState] = useState('')
  const [count, setCount] = useState(0)

  // This will be the URL: /client-server/client-sever-components?search=state



  return (
    <>

    <div className='bg-gray-100 p-4'>

      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <p>{count}</p>
      <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <p>{state}</p>
      <div>

     
      </div>
    </div>
    </>
  )
}
