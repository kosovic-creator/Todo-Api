'use client';
import { useEffect, useState } from "react";
import { useGlobalContext } from '@/app/context/GlobalContext';
import Link from "next/link";
import { useRouter } from "next/navigation";

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

          {todo && (
            <div className="todo-details p-4 rounded w-full max-w-md align-baseline bg-white shadow-md text-left flex-row-reverse" >
              <h2 className="text-lg font-semibold mb-4">Todo </h2>
              <p ><>Title:</> {todo.title}</p>
              <p><>Priority:</> {todo.priority}</p>
              <p><>Done:</> {todo.done ? "Yes" : "No"}</p>
              <p><>Details:</> {todo.details || "N/A"}</p>
              <Link href="/todo">
                <button  className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Nazad
                </button>
              </Link>

            </div>
          )}
        </form>


      </div>
    </div>
  );
};

export default GetTodoByIdForm;