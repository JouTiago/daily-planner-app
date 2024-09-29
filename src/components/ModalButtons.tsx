import '../assets/styles.css';
import skinIcon from '../images/SkinIcon.png';
import medIcon from '../images/MedIcon.png';
import calendarIcon from '../images/CalendarIcon.png';
import alarmIcon from '../images/AlarmIcon.png';
import appleIcon from '../images/AppleIcon.png';
import gymIcon from '../images/GymIcon.png';
import waterIcon from '../images/WaterIcon.png';
import stepIcon from '../images/SetpsIcon.png';
import cronometerIcon from '../images/CronometerIcon.png';
import kcalIcon from '../images/KcalIcon.png';


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

const ModalButtonsLeft = ({ onButtonClick }: ModalButtonsProps) => {
    return (
        <div className='modal-box'>

            <div className='modal-box-left-top'>

                <div className="button-item" onClick={() => onButtonClick('DietModal')}>
                    <img src={appleIcon} alt="Diet" />
                </div>

                <div className="button-item" onClick={() => onButtonClick('GymModal')}>
                    <img src={gymIcon} alt="Gym" />
                </div>

            </div>

            <div className='modal-box-left-bottom'>
                <div className="gym-related-itens-container">

                    <div className="divider-T"></div>

                    <div className='gym-container-column'>
                        <div className="button-item-small" onClick={() => onButtonClick('WaterModal')}>
                            <img src={waterIcon} alt="Water" />
                        </div>

                        <div className="button-item-small" onClick={() => onButtonClick('KcalModal')}>
                            <img src={kcalIcon} alt="Kcal" />
                        </div> 
                    </div>

                    <div className='gym-container-column'>
                        <div className="button-item-small" onClick={() => onButtonClick('StepCounterModal')}>
                            <img src={stepIcon} alt="StepCounter" />
                        </div>

                        <div className="button-item-small" onClick={() => onButtonClick('CronometerModal')}>
                            <img src={cronometerIcon} alt="Cronometer" />
                        </div> 
                    </div>

                </div>

                <div className='decor'></div>
                <div className='decor'></div>
                <div className='status-container'></div>
            </div>
        </div>
    );
};

export {ModalButtonsRight, ModalButtonsLeft};

