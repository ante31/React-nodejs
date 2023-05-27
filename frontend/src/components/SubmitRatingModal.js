import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const SubmitRatingModal = ({
  objectId,
  showRatingModal,
  setShowRatingModal,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(null); // Add state for user's rating

  useEffect(() => {
    const fetchUserRating = async () => {
      const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;

      try {
        const response = await fetch(`/api/rate/${objectId}/${user._id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user rating');
        }

        const ratingData = await response.json();
        setComment(ratingData.comment);
        setUserRating(ratingData.rating);
        setRating(ratingData.rating);
        setHover(ratingData.rating);
      } catch (error) {
        // TODO: Display error message to user
      }
    };

    fetchUserRating();
  }, [objectId]);

  const handleRatingSubmit = async () => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    try {
      const response = await fetch('/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectId: objectId,
          userId: user._id,
          rating: rating,
          comment: comment,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      // TODO: Update UI to indicate that rating was successfully submitted
    } catch (error) {
      // TODO: Display error message to user
    }
  };

  const updateObjectRating = async () => {
    try {
      const response = await axios.put(`/api/${objectId}/updateRating`);
      console.log('Object updated successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating object:', error);
    }
  };

  return (
    <Modal
      show={showRatingModal}
      onHide={() => {
        setShowRatingModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Ostavi recenziju!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="star-rating"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <Button
                key={index}
                style={{ background: 'transparent', border: 0 }}
                className={
                  index <= (hover || userRating || rating) ? 'on' : 'off'
                }
                onClick={() => {
                  setRating(index);
                  setUserRating(index);
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(userRating || rating)}
              >
                <span className="star" style={{ fontSize: '3rem' }}>
                  <i
                    className={
                      index <= (hover || rating)
                        ? `fa fa-star rating`
                        : 'far fa-star rating'
                    }
                  />
                </span>
              </Button>
            );
          })}
        </div>

        <Form.Group controlId="comment" className="mt-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ostavi komentar ovdje"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={async (event) => {
            await handleRatingSubmit();
            updateObjectRating();
          }}
        >
          Spremi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitRatingModal;
