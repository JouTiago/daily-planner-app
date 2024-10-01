import React from 'react';
import "../../assets/styles.css";

interface SelfMemosModalProps {
  isOpen: boolean;
  onClose: () => void;
  todos: { title: string; description: string }[];
  selectedDay: string | null;
}

const SelfMemosModal: React.FC<SelfMemosModalProps> = ({ isOpen, onClose, todos, selectedDay }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal-btn" onClick={onClose}>Fechar</button>
        <h2>Todos para o dia {selectedDay}</h2>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <strong>{todo.title}</strong>: {todo.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum todo cadastrado para esse dia.</p>
        )}
      </div>
    </div>
  );
};

export default SelfMemosModal;
