import { useState } from 'react';
import './assets/styles.css';
import SkinCareModal from './components/modals/SkinCareModal';
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
    
    </div>
  );
};

export default App;
