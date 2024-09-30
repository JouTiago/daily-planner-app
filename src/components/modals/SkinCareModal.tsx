interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkinCareModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Rotina de Skin Care</h2>
        <p>Defina sua rotina aqui</p>
      </div>
    </div>
  );
};

export default SkinCareModal;
