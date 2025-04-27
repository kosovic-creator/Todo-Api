'use client';
import { useEffect, useState } from "react";
import { useGlobalContext } from '../context/GlobalContext';
import Link from "next/link";

const GetTodoByIdForm = () => {
  const [todoId, setTodoId] = useState("");
  const [todo, setTodo] = useState<any | null>(null);
  const [error, setError] = useState("");
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/api/todo/${user}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch todo.");
          return;
        }

        const data = await response.json();
        setTodo(data);
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    };

    fetchTodo();
  }
    , [user]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTodo(null);

    try {
      const response = await fetch(`/api/todo/${user}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch todo.");
        return;
      }

      const data = await response.json();
      setTodo(data);
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div>


      <div>
      <form onSubmit={handleSubmit} className="get-todo-form flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Get Todo by ID</h1>
        {todo && (
          <div className="todo-details">
            <h2>Todo Details</h2>
            <p><strong>Title:</strong> {todo.title}</p>
            <p><strong>Priority:</strong> {todo.priority}</p>
            <p><strong>Done:</strong> {todo.done ? "Yes" : "No"}</p>
            <p><strong>Details:</strong> {todo.details || "N/A"}</p>
            <Link href="/todo" className='ml-5 text-blue-700 hover:text-blue-400 underline'>Povratak</Link>
          </div>
        )}
      </form>
      <div>

      </div>
    </div>
  </div>
  );
};

export default GetTodoByIdForm;