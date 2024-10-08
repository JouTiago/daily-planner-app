import { useState, useEffect } from 'react';
import { getTodosByTarget, getAllTargets } from '../utils/BaseRequest';
import SelfMemosModal from './modals/SelfMemosModal';

const SelfMemos: React.FC = () => {
  const [todosByDay, setTodosByDay] = useState<{ [key: string]: { title: string; description: string }[] }>({});
  const [selectedDayTodos, setSelectedDayTodos] = useState<{ title: string; description: string }[]>([]);
  const [currentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const fetchTodosForMonth = async () => {
    try {
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
  
      const groupedTodos: { [key: string]: { title: string; description: string }[] } = {};
  
      const allTargets = await getAllTargets();
      const filteredTargets = allTargets.filter((target) => {
        const targetMonthYear = target.id.toString().slice(-6);
        return targetMonthYear === `${currentMonth}${currentYear}`;
      });
  
      for (const target of filteredTargets) {
        const todos = await getTodosByTarget(target.id);
        if (todos.length > 0) {
          groupedTodos[target.id.toString()] = todos.map((todo) => ({
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

  useEffect(() => {
    fetchTodosForMonth();
  }, [currentDate]);


  const handleRefresh = () => {
    fetchTodosForMonth();
  };


  const generateDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const targetId = formatID(i, currentDate.getMonth() + 1, currentDate.getFullYear());

      days.push(
        <div
            className='self-memos-day'
            key={targetId}
            onClick={() => handleDayClick(i)}
            style={{
            color: todosByDay[targetId] && todosByDay[targetId].length > 0 ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.1)',
            }}
            >
            {i}
      </div>

      );
    }

    return days;
  };



  const handleDayClick = async (day: number) => {
    const targetId = formatID(day, currentDate.getMonth() + 1, currentDate.getFullYear());
    setSelectedDay(targetId);
    setIsModalOpen(true);

    try {
      const todos = await getTodosByTarget(parseInt(targetId));
      if (todos && todos.length > 0) {
        setSelectedDayTodos(
          todos.map((todo) => ({
            title: todo.title,
            description: todo.description,
          }))
        );
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
        
        <div className='self-memos-container-header'>
            <h2>SELF - MEMOS</h2>
            <button onClick={handleRefresh}></button>
        </div>
      
        <div className='memos-sec-container'>
            <div className="self-memos-grid">{generateDays()}</div>   
        </div>

      <SelfMemosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todos={selectedDayTodos}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default SelfMemos;