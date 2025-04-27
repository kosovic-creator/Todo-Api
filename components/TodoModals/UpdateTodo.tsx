import { FC, useState, useEffect } from 'react';

type Todo = {
  id: string;
  title: string;
  priority: number;
  done: boolean;
  details?: string;
};

type UpdateTodoProps = {
  isOpen: boolean;
  todo: Todo | null;
  onUpdate: (id: string, data: Partial<Todo>) => Promise<void>;
  onClose: () => void;
};

const UpdateTodo: FC<UpdateTodoProps> = ({ isOpen, todo, onUpdate, onClose }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState(1);
  const [editDetails, setEditDetails] = useState('');

  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title);
      setEditPriority(todo.priority);
      setEditDetails(todo.details ?? '');
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    await onUpdate(todo.id, {
      title: editTitle,
      priority: editPriority,
      details: editDetails,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="pb-2 text-center text-xl">Izmeni Napomenu</h2>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Naslov"
        />
        <input
          className="ml-5"
          value={editDetails}
          onChange={(e) => setEditDetails(e.target.value)}
          placeholder="Detalji"
        />
        <input
          className="ml-5 mr-5"
          type="number"
          min={1}
          max={5}
          value={editPriority}
          onChange={(e) => setEditPriority(Number(e.target.value))}
          placeholder="Prioritet"
        />
        <button className="text-lime-500 mr-4" type="submit" onClick={handleUpdate}>
          Sačuvaj
        </button>
        <button className="text-slate-500" onClick={onClose}>
          Otkaži
        </button>
      </div>
    </div>
  );
};

export default UpdateTodo;