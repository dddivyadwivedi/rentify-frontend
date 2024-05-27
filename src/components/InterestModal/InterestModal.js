import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InterestModal = ({ show, handleClose, emailSuccess }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Interest Registered</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {emailSuccess ? (
          <>
            <p><strong>Seller Name:</strong> {emailSuccess.userName}</p>
            <p><strong>Seller Email:</strong> {emailSuccess.email}</p>
            <p><strong>Seller Phone:</strong> {emailSuccess.phone}</p>

            <p>Your interest has been successfully registered!An email has been sent to both interested parties in their registered emails.</p>
          </>
        ) : (
          <p>No information available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InterestModal;
