import React, { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';

const AddRestaurantModal = ({ show, handleClose }) => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('open');
  const [workTime, setWorkTime] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });
  const [image, setImage] = useState('');
  const [minimalDelivery, setMinimalDelivery] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const daysOfWeek = {
    Monday: 'Ponedjeljak',
    Tuesday: 'Utorak',
    Wednesday: 'Srijeda',
    Thursday: 'Cetvrtak',
    Friday: 'Petak',
    Saturday: 'Subota',
    Sunday: 'Nedjelja',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const slug = name.replace(/\s+/g, '').toLowerCase();
    const rating = 0;
    const reviews = 0;

    fetch('/api/addRestaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        name,
        slug,
        location,
        status,
        workTime,
        image,
        minimalDelivery,
        deliveryPrice,
        products,
        rating,
        reviews,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Data sent successfully:', data))
      .catch((error) => console.error('Error sending data:', error));
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj novi restoran</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formUser">
          <Form.Label>Admin restorana</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi ID korisnika"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </Form.Group>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi naziv"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Lokacija</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi naziv"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="open">Otvoren</option>
              <option value="closed">Zatvoren</option>
            </Form.Control>
          </Form.Group>

          <Row className="mt-1">
            <Col></Col>
            <Col>
              <Form.Label>Otvaranje:</Form.Label>
            </Col>
            <Col>
              <Form.Label>Zatvaranje:</Form.Label>
            </Col>
          </Row>
          {Object.keys(workTime).map((day) => (
            <Row key={day} className="mb-1">
              <Col xs={4}>
                <Form.Label>{daysOfWeek[day]}:</Form.Label>
              </Col>
              <Col xs={4}>
                <Form.Control
                  name={day}
                  placeholder="00:00"
                  type="text"
                  onChange={(event) => {
                    const openingTime = event.target.value;
                    const closingTime = workTime[day].split(' - ')[1] || '';
                    setWorkTime((prevWorkTimes) => ({
                      ...prevWorkTimes,
                      [day]: `${openingTime} - ${closingTime}`,
                    }));
                  }}
                />
              </Col>
              <Col xs={4}>
                <Form.Control
                  name={day}
                  placeholder="00:00"
                  type="text"
                  onChange={(event) => {
                    const openingTime = workTime[day].split(' - ')[0] || '';
                    const closingTime = event.target.value;
                    setWorkTime((prevWorkTimes) => ({
                      ...prevWorkTimes,
                      [day]: `${openingTime} - ${closingTime}`,
                    }));
                  }}
                />
              </Col>
            </Row>
          ))}

          <Form.Group controlId="formImage">
            <Form.Label>Slika</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi putanju slike"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNumber">
            <Form.Label>Minimalni iznos dostave</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unesi minimalni iznos dostave"
              value={minimalDelivery}
              onChange={(event) => setMinimalDelivery(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNumber">
            <Form.Label>Cijena dostave</Form.Label>
            <Form.Control
              type="number"
              placeholder="Unesi cijenu dostave"
              value={deliveryPrice}
              onChange={(event) => setDeliveryPrice(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Dodaj
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRestaurantModal;
