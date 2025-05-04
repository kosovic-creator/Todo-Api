'use client';
import { useEffect, useState } from "react";
import { useGlobalContext } from '@/app/context/GlobalContext';
import Link from "next/link";
import { Todo } from '@prisma/client';
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/TodoModals/ConfirmDeleteModal";



const GetTodoByIdForm = () => {
  const [todoId, setTodoId] = useState("");
  const [todo, setTodo] = useState<any | null>(null);
  const [error, setError] = useState("");
  const { user, setUser } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
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
    }

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
  const openDeleteConfirmModal = (id: string | number) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const closeDeleteConfirmModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };
  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // Toast nestaje posle 2.5s
  }
  const router = useRouter();
  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== Number(id)));
    setIsModalOpen(false);
    showToast('Napomena je uspešno obrisana!');
    setTimeout(() => router.push('/todo'), 2000);
  };

  return (
    <div className=" w-full mx-auto p-4 bg-white">
      <div className=" w-full mx-auto p-4 bg-white ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {todo && (
            <div className="flex-col text-left p-2 ">
              <h1 className="text-2xl font-bold-1 p-2 text-left">Detalji Napomene</h1>

              <p className="p-3" ><>Zadatak:</> {todo.title}</p>
              <p className="p-3"><>Prioritet:</> {todo.priority}</p>
              <p className="p-3"><>Završeno:</> {todo.done ? "Da" : "Ne"}</p>
              <p className="p-3"><>Detalji:</> {todo.details || "N/A"}</p>
              <Link href="/todo/update" onClick={() => setUser((todo.id))}>
                <button className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition">Izmjeni</button>
              </Link>
              <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition " onClick={() => openDeleteConfirmModal(todo.id)}>Briši</button>
              <Link href="/todo">
                <button className="flex items-center hover:text-zinc-600 p-2 mt-4 rounded">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Nazad
                </button>
              </Link>

            </div>
          )}
        </form>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteConfirmModal}
          onConfirm={() => deleteTodo(String(selectedItemId!))}
          itemId={selectedItemId!}
          title={todo?.title} // <-- OVO JE KLJUČNO
        />


      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 60,
            right: 20,
            background: 'white',
            color: 'black',
            padding: '12px 24px',
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  </div>
  );
};
export default GetTodoByIdForm;