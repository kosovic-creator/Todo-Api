'use client';
import { useSearchParams } from 'next/navigation'
import React from 'react';

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Client(searchParams: SearchParams) {
  // searchParams je objekat sa svim query parametrima
  // const { kapacitet } = await searchParams
  const params = useSearchParams();
  const search = params?.get('kapacitet') ?? ''; // npr. /dashboard?search=my-project
  return <>Search: {search}</>;
}
