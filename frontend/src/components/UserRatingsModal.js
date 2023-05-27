import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Rating from './Rating';

const UserRatingsModal = ({
  objectId,
  showUserRatingsModal,
  setShowUserRatingsModal,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`/api/rate/${objectId}`);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [objectId]);

  return (
    <Modal show={showUserRatingsModal} onHide={setShowUserRatingsModal}>
      <Modal.Header closeButton>
        <Modal.Title>Recenzije</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.map((rating) => (
          <div key={rating.id}>
            <hr />
            <Row className="my-3">
              <Col className="d-flex align-items-center ">
                <Username userId={rating.userId} />
              </Col>
              <Col className="d-flex align-items-center">
                <Rating rating={rating.rating}></Rating>
              </Col>
              <Col className="d-flex align-items-center text-muted">
                {rating.comment}
              </Col>
              <Col className="d-flex align-items-center text-muted">
                {new Date(rating.createdAt).toLocaleString()}
              </Col>
            </Row>
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={setShowUserRatingsModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Username = ({ userId }) => {
  const [user, setUser] = useState({});
  const currentUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`);
        setUser(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <>
      <span className="fw-bold">{user.username}</span>{' '}
      {userId === currentUser._id ? '(Vi)' : ''}
    </>
  );
};

export default UserRatingsModal;
