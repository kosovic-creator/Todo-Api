'use client';

import { useState } from 'react';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number | ''>('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        const data = await response.json();
        setSuccess('Todo added successfully!');
        setTitle('');
        setPriority('');
        setDetails('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add todo.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input
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
        <input
          id="priority"
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="details" className="block font-medium">Details</label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
}