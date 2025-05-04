'use client';
import { useSearchParams } from 'next/navigation'
import React from 'react';

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface ClientProps {
  searchParams: Promise<SearchParams>;
}

export default function Client() {
  const [search, setSearch] = React.useState('');


  return <>Search: {search}</>;
}
