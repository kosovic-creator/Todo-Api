'use client';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { useEffect, useState } from 'react';

import ConfirmDeleteModal from '@/components/TodoModals/ConfirmDeleteModal';
import Link from 'next/link';
import { Todo } from '@prisma/client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const { user, setUser } = useGlobalContext();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/todo')
      .then(res => res.json())
      .then(setTodos);
  }, []);

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

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
    setIsModalOpen(false);
    showToast('Napomena je uspešno obrisana!');
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  const brojZapisa = todos.length;
  const brojKompletiranih = todos.filter(todo => todo.done).length;
  const procenatKompletiranih = brojZapisa === 0 ? 0 : Math.round((brojKompletiranih / brojZapisa) * 100);
  return (
    <>

      <div className=' text-gray-500 p-4 flex justify-between items-center w-full'>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {/* Lucide Search ikona */}
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <Input
            type="search"
            placeholder="Pretraga..."
            className="pl-10"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <Link href="/todo/add">

          <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">Dodaj</button>
        </Link>
      </div>

      <div className='container mx-auto p-0'>

        <table className="todo-table table-auto w-full border-collapse border ">
          <thead className='bg-black  text-white  '>
            <tr className='border-b border-gray-300  text-white'>
              <th className='p-3 text-center'>Naslov</th>
              <th className='p-3 text-center'>Detalji</th>
              <th className="p-3 text-center">Prioritet</th>
              <th className="p-3 text-left">Završeno</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700 bg-white divide-y divide-gray-300'>
            {filteredTodos.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">Nema zadataka</td>
              </tr>
            ) : (
              filteredTodos.map(todo => (
                <tr className='flex-shrink-0' key={todo.id}>
                  <td className='p-2 text-center '>{todo.title}</td>
                  <td className='p-2 text-center '>{todo.details}</td>
                  <td className='text-center'>{todo.priority}</td>
                  <td>
                    <input
                      className='ml-5'
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => updateTodo(todo.id, { done: !todo.done })}
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">

                      <Link href="/todo/form" onClick={() => setUser((todo.id))} >
                        <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Pregled</button>
                      </Link>


                      <Link href="/todo/update" onClick={() => setUser((todo.id))} >


                        <button className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition">Izmjeni</button>

                      </Link>

                      {/* Delete dugme */}
                      <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition " onClick={() => openDeleteConfirmModal(todo.id)}>Briši</button>

                      {/* Add dugme */}

                    </div>
                    {/*
                    <button className='mr-2 text-red-700 underline hover:text-red-500' onClick={() => openDeleteConfirmModal(todo.id)}>Obriši</button>
                    <Link href="/todo/form" onClick={() => setUser((todo.id))} className='ml-5 text-blue-600 underline hover:text-blue-500'>Detalji</Link>
                    <Link href="/todo/update" onClick={() => setUser((todo.id))} className='ml-5 text-green-600 underline hover:text-green-500'>Izmjeni</Link> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteConfirmModal}
          onConfirm={() => deleteTodo(String(selectedItemId!))}
          itemId={selectedItemId!}
          title={todos.find(todo => todo.id === String(selectedItemId!))?.title || ''}
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
      <footer> <a>Procenat kompletiranih zadataka:  {procenatKompletiranih}%</a></footer>

    </>


  );
}

