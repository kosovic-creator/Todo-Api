'use client'
import { ReactNode } from 'react'

export default function ClientComponent({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Ovo je client komponenta</h1>
      {children}
    </div>
  )
}
