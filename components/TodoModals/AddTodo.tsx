import { FC, useState } from 'react';

type AddTodoProps = {
  onAdd: (title: string, priority: number, details: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
};

const AddTodo: FC<AddTodoProps> = ({ onAdd, onClose, isOpen }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState(1);
  const [newDetails, setNewDetails] = useState('');

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await onAdd(newTitle, newPriority, newDetails);
    setNewTitle('');
    setNewDetails('');
    setNewPriority(1);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="text-center pb-3">Dodaj novu Napomenu</h2>
        <input
          className="mr-5"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Naslov"
        />
        <input
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          placeholder="Detalji"
        />
        <input
          className="ml-3 mr-5"
          type="number"
          min={1}
          max={5}
          value={newPriority}
          onChange={(e) => setNewPriority(Number(e.target.value))}
          placeholder="Prioritet"
        />
        <button className="text-lime-500 mr-4" type="submit" onClick={handleAdd}>
          Dodaj
        </button>
        <button className="text-red-600 ml-4" onClick={onClose}>
          Otkaži
        </button>
      </div>
    </div>
  );
};

export default AddTodo;