'use client';
import { useState, useEffect } from "react";
import AddTodoForm from "@/components/AddTodoForm";
import Link from "next/link";

type Todo = {
  id: string;
  title: string;
  priority: number;
  done: boolean;
  details?: string;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todo");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (title: string, priority: number, details: string) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, priority, details }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } else {
      console.error("Failed to add todo.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <AddTodoForm onAdd={addTodo} />

      <Link href="/todo" className='ml-5 text-blue-600'>Povratak</Link>


    </div>
  );
}