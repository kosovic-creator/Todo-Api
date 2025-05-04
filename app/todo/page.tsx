'use client';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { useEffect, useState, useTransition } from 'react';

import ConfirmDeleteModal from '@/components/TodoModals/ConfirmDeleteModal';
import Link from 'next/link';
import { Todo } from '@prisma/client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LoadingDots from '@/components/loading-dots';

export default function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const { user, setUser } = useGlobalContext();
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    startTransition(() => {
      fetch('/api/todo')
        .then(res => res.json())
        .then(setTodos);
    });
  }, []);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // Toast disappears after 2.5s
  }

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === Number(id) ? updated : t)));
    showToast('Napomena je uspešno izmjenjena!');
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  const brojZapisa = todos.length;
  const brojKompletiranih = todos.filter(todo => todo.done).length;
  const procenatKompletiranih = brojZapisa === 0 ? 0 : Math.round((brojKompletiranih / brojZapisa) * 100);

  return (
    <>
      <div className='container mx-auto p-0 w-full'>
        <div className='text-gray-500 p-0 flex justify-between items-center w-full'>
          <div className="flex items-center relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </span>
            <Input
              type="search"
              placeholder="Pretraga..."
              className="pl-10"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Link href="/todo/add" className='mr-0 p-3'>
              <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition p-4">Dodaj</button>
            </Link>
          </div>
        </div>
        <table className="table-auto w-full">
          <thead className='bg-black text-white font-thin'>
            <tr className='border-b border-gray-300 text-white'>
              <th className='p-3 text-center'>Naslov</th>
              <th className='p-3 text-center'>Detalji</th>
              <th className="p-3 text-center">Prioritet</th>
              <th className="p-3 text-left">Završeno</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700 bg-white divide-y divide-gray-300'>
            {currentTodos.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">{isPending ? <LoadingDots /> : <p>Učitano</p>}</td>
              </tr>
            ) : (
                currentTodos.map(todo => (
                  <tr key={todo.id}>
                    <td className='p-2 text-center'>{todo.title}</td>
                    <td className='p-2 text-center'>{todo.details}</td>
                  <td className='text-center'>{todo.priority}</td>
                  <td>
                    <input
                      className='ml-5'
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => updateTodo(String(todo.id), { done: !todo.done })}
                    />
                  </td>
                  <td>
                    <div className="flex gap-2 flex-row-reverse w-full">
                      <Link href="/todo/form" onClick={() => setUser(String(todo.id))}>
                        <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Pregled</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prethodna
          </button>
          <span>Stranica {currentPage} od {totalPages}</span>
          <button
            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sledeća
          </button>
        </div>
      </div>
      <footer>
        <a>Procenat kompletiranih zadataka: {procenatKompletiranih}%</a>
      </footer>
    </>
  );
}
