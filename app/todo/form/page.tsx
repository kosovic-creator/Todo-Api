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
    <div className=" w-full mx-auto p-4 bg-white shadow-md rounded">


      <div className=" w-full mx-auto p-4 bg-white shadow-md rounded">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {todo && (
            <div className="flex-col text-left p-2 ">
              <h1 className="text-2xl font-bold-1 p-2 text-left">Detalji Napomene</h1>

              <p className="p-3" ><>Zadatak:</> {todo.title}</p>
              <p className="p-3"><>Prioritet:</> {todo.priority}</p>
              <p className="p-3"><>Završeno:</> {todo.done ? "Da" : "Ne"}</p>
              <p className="p-3"><>Detalji:</> {todo.details || "N/A"}</p>
              <Link href="/todo">
                <button  className="flex items-center hover:text-zinc-600 p-2 mt-4 rounded">
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