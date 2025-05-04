'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ReactNode, useState } from 'react'
import { usePathname,useRouter } from "next/navigation"


export default function ClientComponent({ children }: { children: ReactNode }) {
const [state, setState] = useState('')
  const [count, setCount] = useState(0)
  const router = useRouter()



  // Returns the current URL's pathname as a string
  const pathname = usePathname()
  // Now we can use the active route for our business logic
  const isActive = pathname === "/client-server/client-sever-components"
  const activityText = isActive ? "active" : "not active"
  const searchParams = new URLSearchParams({ search: state }).toString();
  const url1 = `${pathname}?${searchParams}`;
  // This will be the URL: /client-server/client-sever-components?search=state



  return (
    <>
      <div>My route is {activityText} {url1}</div>
    <div className='bg-gray-100 p-4'>

      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <p>{count}</p>
      <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <p>{state}</p>
      <div>

        {children}
      </div>
    </div>
    </>
  )
}
