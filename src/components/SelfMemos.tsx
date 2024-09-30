import {useState, useEffect} from 'react';
import { getTodosByTarget } from '../utils/BaseRequest';

const SelfMemos: React.FC = () => {
    const [todosByDay, setTodosByDay] = useState<{ [key: string]: { title: string; description: string }[] }>({});
    const [selectedDayTodos, setSelectedDayTodos] = useState<{ title: string; description: string }[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodosForMonth = async () => {
            try {
                const currentMonth = currentDate.getMonth() + 1;
                const currentYear = currentDate.getFullYear();

                const groupedTodos: { [key:  string]: { title: string; description: string }[] } = {};

                for (let day = 1; day <= new Date(currentYear, currentMonth, 0).getDate(); day++) {
                    const targetId = formatID(day, currentMonth, currentYear);
                    const todos = await getTodosByTarget(parseInt(targetId));

                    if (todos.length > 0) {
                        groupedTodos[targetId] = todos.map((todo) => ({
                            title: todo.title,
                            description: todo.description,
                        }));
                    }
                }

                setTodosByDay(groupedTodos);
            } catch (error) {
                console.error('Erro ao buscar todos:', error);
            }
        };

        fetchTodosForMonth();
    }, [currentDate]);

    const generateDays = () => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const targetId = formatID(i, currentDate.getMonth() + 1, currentDate.getFullYear());

            days.push(
                <div className='calendar-day' key={targetId} onClick={() => handleDayClick(targetId)}>
                    {i}
                    {todosByDay[targetId] && <span className='todo-indicator'>●</span>}
                </div>
            );
        }

        return days;
    };

    const handleDayClick = async (day: number) => { 
        const targetId = day;
        setSelectedDay(targetId.toString());
      
        try {
          const todos = await getTodosByTarget(targetId);
          if (todos && todos.length > 0) {
            setSelectedDayTodos(todos.map((todo) => ({
              title: todo.title,
              description: todo.description,
            })));
          } else {
            setSelectedDayTodos([]);
          }
        } catch (error) {
          setSelectedDayTodos([]);
          console.error('Erro ao buscar todos:', error);
        }
      };

    const formatID = (day: number, month: number, year: number) => {
        return `${day}${month}${year}`;      
    };   

    return (
        <div className="self-memos-container">
          <h2>Self Memos - {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <div className="self-memos-grid">
            {generateDays()}
          </div>
    
          {selectedDay !== null && (
            <div className="todo-list">
              <h3>Todos para o dia {selectedDay}</h3>
              <ul>
                {selectedDayTodos.map((todo, index) => (
                  <li key={index}>
                    <strong>{todo.title}</strong>: {todo.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };
    
    export default SelfMemos;