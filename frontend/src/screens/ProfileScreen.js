import axios from 'axios';
import React from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = ({ user, cartItems }) => {
  const navigate = useNavigate();

  function onLogout() {
    const user = JSON.parse(localStorage.getItem('user'));

    // make API call to update cartItems for user on logout
    fetch('/api/updateCartItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        cartItems: cartItems,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // clear user data from localStorage
          console.log('User cartItems saved successfully');
          localStorage.removeItem('user');
          localStorage.removeItem('cartItems');
          navigate('/');
          window.location.reload();
        } else {
          alert('Ne valja nesto');
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h3>User Profile</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Name: {user.username}</ListGroup.Item>
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Address: {user.address}</ListGroup.Item>
            <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
          </ListGroup>
          <Button onClick={() => onLogout()} variant="danger">
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileScreen;
