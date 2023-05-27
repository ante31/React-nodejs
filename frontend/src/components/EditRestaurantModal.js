import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function EditRestaurantModal({ objectID, show, handleClose }) {
  const [objectData, setObjectData] = useState({});
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

  useEffect(() => {
    axios.get(`/api/${objectID}`).then((response) => {
      setObjectData(response.data);
    });
  }, [objectID]);

  useEffect(() => {
    setName(objectData.name);
    setLocation(objectData.location);
    setStatus(objectData.status);
    setWorkTime(objectData.workTime);
    setImage(objectData.image);
    setMinimalDelivery(objectData.minimalDelivery);
    setDeliveryPrice(objectData.deliveryPrice);
    setProducts(objectData.products);
  }, [objectData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateData = {
      name: name,
      location: location,
      status: status,
      workTime: workTime,
      image: image,
      minimalDelivery: minimalDelivery,
      deliveryPrice: deliveryPrice,
      products: products,
    };

    axios
      .put(`/api/${objectID}`, updateData)
      .then((response) => {
        console.log('Object updated successfully:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating object:', error);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Uredi restoran</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Form.Group controlId="formName">
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              type="text"
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
            Spremi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditRestaurantModal;
