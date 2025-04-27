'use client';
import { useGlobalContext } from '@/app/context/GlobalContext';
import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '@/components/TodoModals/ConfirmDeleteModal';
import Link from 'next/link';

type Todo = {
  id: string;
  title: string;
  priority: number;
  done: boolean;
  details?: string; // Added optional 'details' property
};

export default function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const { user, setUser } = useGlobalContext();

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
const brojZapisa=todos.length;

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

  const addTodo = async (title: string, priority: number, details: string) => {
    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority, details }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    showToast('Napomena je uspješno dodata!');
  };
  const brojKompletiranih=todos.filter(todo => todo.done).length;
  const procenatKompletiranih = brojZapisa === 0 ? 0 : Math.round((brojKompletiranih / brojZapisa) * 100);

  const setMessage = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // Toast nestaje posle 2.5s
  };


  return (
    <>
<a>Procenat kompletiranih zadataka:  {procenatKompletiranih}%</a>
      <div className='container mx-auto p-4'>
        <h1 className="text-2xl font-bold mb-4">Lista Napomena</h1>
        <Link className=' text-blue-600' href="/todo/add">Dodaj novi Podsjetnik</Link>
        <table className="todo-table table-auto w-full border-collapse border border-gray-300 ">
          <thead className='bg-gray-800  text-gray-700 text-sm uppercase font-bold '>
            <tr className='border-b border-gray-300  text-gray-50 '>
              <th className='p-3 text-center'>Naslov</th>
              <th className='p-3 text-center'>Detalji</th>
              <th className="p-3 text-center">Prioritet</th>
              <th className="p-3 text-left">Završeno</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700 bg-white divide-y divide-gray-300'>
            {todos.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">Nema zadataka</td>
              </tr>
            ) : (
              todos.map(todo => (
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
                    <button className='mr-2 text-red-700 underline hover:text-red-500' onClick={() => openDeleteConfirmModal(todo.id)}>Obriši</button>
                    <Link href="/todo/form" onClick={() => setUser( (todo.id))} className='ml-5 text-blue-600 underline hover:text-blue-500'>Detalji</Link>
                    <Link href="/todo/update" onClick={() => setUser( (todo.id))} className='ml-5 text-green-600 underline hover:text-green-500'>Izmjeni</Link>
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
              top: 40,
              right: 20,
              background: 'green',
              color: '#fff',
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
    </>
  );
}

