
import React from 'react';
import Modal from 'react-modal';
import "../Components.css"

const Popup = ({ isOpen, closeModal, onYes, onNo }) => {


    const handleYes = () => {
        onYes(true); // Set Anonymous to true
        closeModal(); // Close the modal
      };
    
      const handleNo = () => {
        onNo(false); // Set Anonymous to false
        closeModal(); // Close the modal
      };



  return (
    <div className='popup-container'>
    <Modal
     isOpen={isOpen}
     onRequestClose={closeModal}
      className="popup-content" 
      overlayClassName="popup-overlay"
      contentLabel="Popup Modal"
    >
        <div className="popup-content-wrapper">
        <h2>Welcome to MENTIC Community</h2>
        <p>Do you want to chat Anonymously</p>

        <div className="button-row">
          <button onClick={handleYes} className="submit-button">yes</button>
          <button onClick={handleNo} className="close-button">No</button>
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default Popup;

