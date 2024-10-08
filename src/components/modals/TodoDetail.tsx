import React from 'react';

interface TodoDetailProps {
  isOpen: boolean;
  onClose: () => void;
  todo: {
    title: string;
    description: string;
  } | null;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ isOpen, onClose, todo }) => {
  if (!isOpen || !todo) return null;

  return (
    <div className="todo-detail-modal-overlay">
      <div className="todo-detail-modal">        
        <p>{todo.description}</p>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default TodoDetail;
