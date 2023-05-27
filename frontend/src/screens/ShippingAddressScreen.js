import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ShippingAddressForm() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  console.log(user);

  const [fullName, setFullName] = useState(user.fullName);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState('');

  const HandleSubmit = (e) => {
    e.preventDefault();
    useEffect(() => {
      axios
        .put(`/api/users/${user._id}`, {
          fullName: fullName,
          address: address,
          city: city,
        })
        .then((response) => {
          console.log('User updated successfully:', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }, []);
    console.log(`Submitted: ${fullName}, ${address}, ${city}`);
  };

  return (
    <Container className="col-md-6 mx-auto">
      <h1 className="mt-5">Adresa:</h1>
      <Form onSubmit={HandleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="mt-3">
          Dalje
        </Button>
      </Form>
    </Container>
  );
}

export default ShippingAddressForm;
