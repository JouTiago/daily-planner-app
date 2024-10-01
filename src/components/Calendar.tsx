import { useState } from 'react';
import {createTarget, createTodo} from '../utils/BaseRequest';


const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    
    const formatID = () => {
        if (!selectedDate) return 0;      
        const [day, month, year] = selectedDate.split('-').map(Number); 
        return parseInt(`${day}${month}${year}`);
      };
      



    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div className="calendar-day" key={i} onClick={() => handleDayClick(i)}>
                    {i}
                </div>
            );
        }

        return days;
    };



    const handleDayClick = (day: number) => {
        const formatedDate =  `${day}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        setSelectedDate(formatedDate);
        setIsModalOpen(true);
    };



    const changeMonth = (direction: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction);
        setCurrentDate(newDate);           
    };
    

    const handleCreateTodo = async () => {
        if (!title || !description || !selectedDate) return;

        const targetId = formatID();

        const newTodo = {
            id: 0,            
            title,
            description,
            isComplete: false,
            targetId,
        };

        const newTarget = {
            id: targetId,
            title: `Target criado para ${selectedDate}`,
            isComplete: false,
            description: `Todos para ${selectedDate}`,
            todo: [newTodo],
        };

        try {
            const response = await createTarget(newTarget);

            if (response) {
                alert('Criou essa merda');
                console.log(targetId);               
            }
        } catch (error: any) {            
            try {

                const newTodo = {                                    
                    title,
                    description,
                    isComplete: false,
                    targetId,
                };
        
                await createTodo(newTodo);
                alert('Novo todo adicionado ao target existente');
                console.log(targetId);
            } catch (updateError) {
                console.error('Erro ao atualizar o target existente', error);
            }          
        } finally {
            setIsModalOpen(false);
            setTitle('');
            setDescription('');
        }       
    };

return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt; Ant.</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>Prox.&gt;</button>
      </div>
      <div className="calendar-grid">{generateDays()}</div>

      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar uma nota para {selectedDate}</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
            />
            <button onClick={handleCreateTodo}>Criar</button>
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
    );
};

export default Calendar;