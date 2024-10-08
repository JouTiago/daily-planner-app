import React, { useEffect, useState } from 'react';
import { getTodosByTarget, deleteTodo, deleteTarget } from '../utils/BaseRequest';

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number;
}

const TopPriority: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

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
      console.error('Error fetching todos for the current day:', error);
    }
  };

  useEffect(() => {
    fetchTodosForCurrentDay();
  }, [currentDate]);

  // Function to mark a todo as done and delete it
  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));

      // If all todos for the day are marked as done, delete the target
      if (todos.length === 1) {
        await deleteTarget(formatID());
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="top-priority-container">
      <h2> - TODAY - </h2>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="todo-item">
              <div className='todo-title'>
                <strong>{todo.title}</strong>
              </div>
              <button className="mark-done-btn" onClick={() => handleDeleteTodo(todo.id)}>✓</button>
            </div>
          ))
        ) : (
          <p>No todos for today!</p>
        )}
      </div>
    </div>
  );
};

export default TopPriority;
