import '../assets/styles.css';
import skinIcon from '../images/SkinIcon.png';
import medIcon from '../images/MedIcon.png';
import calendarIcon from '../images/CalendarIcon.png';
import alarmIcon from '../images/AlarmIcon.png';


interface ModalButtonsProps {
  onButtonClick: (modalName: string) => void;
}

const ModalButtonsRight = ({ onButtonClick }: ModalButtonsProps) => {
  return (
    <div className='modal-box'>        

        <div className="button-item" onClick={() => onButtonClick('SkinCareModal')}>
            <img src={skinIcon} alt="Skin Care" />
        </div>

        <hr className="divider" />

        <div className="button-item" onClick={() => onButtonClick('MedicationModal')}>
            <img src={medIcon} alt="Medication" />
        </div>

        <hr className="divider" />

        <div className="button-item" onClick={() => onButtonClick('CalendarModal')}>
            <img src={calendarIcon} alt="Calendar" />
        </div>

        <hr className="divider" />

        <div className="button-item" onClick={() => onButtonClick('AlarmModal')}>
            <img src={alarmIcon} alt="Alarm" />
        </div>   
             
    </div>    
  );
};

export default ModalButtonsRight;
