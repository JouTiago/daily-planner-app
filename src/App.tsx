import { useState } from 'react';
import './assets/styles.css';
import SkinCareModal from './components/modals/SkinCareModal';
import CalendarModal from './components/modals/CalendarModal';
import Timer from './components/Clock';
import {ModalButtonsRight, ModalButtonsLeft} from './components/ModalButtons';

const App = () => {

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleButtonClick = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => setActiveModal(null);


  return (

    <div className="app-container">      

      <Timer />

      <div className='modal-container'>
        <ModalButtonsLeft onButtonClick={handleButtonClick} />
        <ModalButtonsRight onButtonClick={handleButtonClick} />
      </div>

      {activeModal === 'SkinCareModal' && <SkinCareModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'CalendarModal' && <CalendarModal isOpen={true} onClose={closeModal} />}

      <div className='assets-container'>

        <div className='self-memos'>
          <div className="header">SELF - MEMOS</div>
        </div>

      </div>

    </div>
  );
};

export default App;
