import { useState } from 'react';
import './assets/styles.css';
import SkinCareModal from './components/SkinCareModal';
import Timer from './components/Clock';

const App = () => {
  const [isSkinCareOpen, setIsSkinCareOpen] = useState(false);

  return (
    <div className="app-container">
      <Timer />
      <button className="open-modal-btn" onClick={() => setIsSkinCareOpen(true)}>
        Open Skin Care Modal
      </button>

      {/* Modal */}
      <SkinCareModal isOpen={isSkinCareOpen} onClose={() => setIsSkinCareOpen(false)} />
    </div>
  );
};

export default App;
