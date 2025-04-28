'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // za app/

import { useState } from 'react';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number | ''>('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || typeof priority !== 'number') {
      setError('Title and priority are required, and priority must be a number.');
      return;
    }

    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, priority, details }),
      });

      if (response.ok) {

        setSuccess('Napomena uspješno dodata!');
        setTitle('');
        setPriority('');
        setDetails('');
        setTimeout(() => router.push('/todo'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Greška u dodavanju napomene.');
        <Link href="/todo" className="text-blue-700 hover:text-blue-400 underline">Nazad</Link>
      }
    } catch (err) {
      setError('Greška.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dodaj Napomenu</h1>

      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="priority" className="block font-medium">Priority</label>
        <Input
          id="priority"
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="details" className="block font-medium">Detalji</label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <Button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-black-600 transition duration-200"
      >
        Dodaj Napomenu
      </Button>
      {/* <Link href="/todo" className='ml-5 text-blue-700 hover:text-blue-400 underline'>Povratak</Link> */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}