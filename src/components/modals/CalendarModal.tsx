import Calendar from '../Calendar';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>        
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarModal;
