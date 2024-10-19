import React, { useEffect, useState } from 'react';
import { getTodosByTarget, deleteTodo, deleteTarget, getTodoById } from '../utils/BaseRequest';
import TodoDetail from './modals/TodoDetail';

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number;
}

const TopPriority: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDate] = useState(new Date());
  const [selectedTodos, setSelectedTodos] = useState<{ [key: number]: Todo | null }>({});
  const [modalOpenStatus, setModalOpenStatus] = useState<{ [key: number]: boolean }>({});

  const formatID = () => {
    const day = currentDate.getDate().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const year = currentDate.getFullYear().toString();
    return parseInt(`${day}${month}${year}`);
  };

  const fetchTodosForCurrentDay = async () => {
    try {
      const targetId = formatID();
      const todosForToday = await getTodosByTarget(targetId);
      setTodos(todosForToday);
    } catch (error) {
      console.error('Erro ao buscar todos para hoje:', error);
    }
  };

  useEffect(() => {
    fetchTodosForCurrentDay();
  }, [currentDate]);

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));

      if (todos.length === 1) {
        await deleteTarget(formatID());
      }
    } catch (error) {
      console.error('Erro ao deletar todo:', error);
    }
  };

  const handleShowTodoDetails = async (todoId: number) => {
    try {
      const todoDetails = await getTodoById(todoId);
      setSelectedTodos((prev) => ({ ...prev, [todoId]: todoDetails }));
      setModalOpenStatus((prev) => ({ ...prev, [todoId]: true }));
    } catch (error) {
      console.error('Erro ao pegar detalhes do todo:', error);
    }
  };

  const handleCloseTodoDetailModal = (todoId: number) => {
    setModalOpenStatus((prev) => ({ ...prev, [todoId]: false }));
    setSelectedTodos((prev) => ({ ...prev, [todoId]: null }));
  };

  return (
    <div className="top-priority-container">
      <h2> - TODAY - </h2>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="todo-item" key={todo.id}>

                <div className='todo-container-title'>
                    <div className="todo-title" onClick={() => handleShowTodoDetails(todo.id)} style={{ cursor: 'pointer' }}>
                    <strong>{todo.title}</strong>
                    </div>
                    <button className="mark-done-btn" onClick={() => handleDeleteTodo(todo.id)}>✓</button>
                </div>              

              <TodoDetail
                isOpen={modalOpenStatus[todo.id] || false}
                onClose={() => handleCloseTodoDetailModal(todo.id)}
                todo={selectedTodos[todo.id]}
              />

            </div>
          ))
        ) : (
          <p>HOJE TA DE BOA, VAI PESCAR</p>
        )}
      </div>
    </div>
  );
};

export default TopPriority;
