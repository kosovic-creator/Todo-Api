import { useState } from 'react';

interface UpdateFormProps {
  todoId: string; // ID todo stavke koja se ažurira
  initialTitle?: string;
  initialPriority?: number;
  initialDone?: boolean;
}

export default function FormTodo({
  todoId,
  initialTitle = '',
  initialPriority = 1,
  initialDone = false,
}: UpdateFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState(initialPriority);
  const [done, setDone] = useState(initialDone);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/todo/${todoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, priority, done }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setMessage('Todo successfully updated!');
        console.log('Updated Todo:', updatedTodo);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to update todo.'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="priority">Priority:</label>
        <input
          type="number"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="done">Done:</label>
        <input
          type="checkbox"
          id="done"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
      </div>

      <button type="submit">Update Todo</button>

      {message && <p>{message}</p>}
    </form>
  );
}