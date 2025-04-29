'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TodoSchema  from '@/types/index'; // Import your Zod schema from the appropriate file


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

    // Validate form data using Zod
    const result = TodoSchema.safeParse({ title, priority, details });

    if (!result.success) {
      // Map errors to display them
      const errorMessages = result.error.errors.map((err) => err.message).join(', ');
      setError(errorMessages);
      return;
    }

    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data), // Use validated data
      });

      if (response.ok) {
        setSuccess('Napomena uspješno dodata!');
        setTitle('');
        setPriority('');
        setDetails('');
        setTimeout(() => router.push('/todo'), 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Greška u dodavanju napomene.');
      }
    } catch (err) {
      setError('Greška prilikom slanja podataka.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold-3 p-6 text-center">Dodaj Napomenu</h1>

      <div>
        <label htmlFor="title" className="block font-medium">Zadatak</label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full form-control form-control-lg"
          placeholder="Unesite naziv napomene"

        />
      </div>

      <div>
        <label htmlFor="priority" className="block font-medium">Prioritet</label>
        <Input
          id="priority"
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="border rounded p-2 w-full"
          placeholder="Unesite prioritet (1-5)"
          min={1}
          max={5}

        />
      </div>

      <div>
        <label htmlFor="details" className="block font-medium">Detalji</label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Unesite detalje napomene"
          rows={4}
          maxLength={200} // Optional: Limit the number of characters
          minLength={10} // Optional: Minimum length for the details
         
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-black-700">
        Dodaj Napomenu
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}