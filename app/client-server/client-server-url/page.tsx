'use client';
import { useSearchParams } from 'next/navigation'
import React from 'react';

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get('kapacitet'); // npr. /dashboard?search=my-project
  return <>Search: {search}</>;
}
