import React, { useState } from 'react';
import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import DragAndDrop from '../utility/Dropzone.js';

const AddProductModal = ({
  showAddProductModal,
  setShowAddProductModal,
  objectId,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableToppings, setAvailableToppings] = useState([]);
  const [prices, setPrices] = useState([]);
  const [sizeInput, setSizesInput] = useState('');
  const [priceInput, setPriceInput] = useState();
  const [toppingInput, setToppingInput] = useState('');

  const handleSizesKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (setSizesInput !== '') {
        setAvailableSizes([...availableSizes, sizeInput]);
        setSizesInput('');
      }
    }
  };

  const handlePricesKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (setPriceInput !== '') {
        setPrices([...prices, priceInput]);
        setPriceInput('');
      }
    }
  };

  const handleToppingsKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (toppingInput !== '') {
        setAvailableToppings([...availableToppings, toppingInput]);
        setToppingInput('');
      }
    }
  };

  const handleToppingInputChange = (event) => {
    setToppingInput(event.target.value);
  };

  const handlePriceInputChange = (event) => {
    setPriceInput(event.target.value);
  };

  const handleSizeInputChange = (event) => {
    setSizesInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    fetch(`/api/${objectId}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        Category: category,
        productImage,
        availableSizes,
        availableToppings,
        prices,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Data sent successfully:', data))
      .catch((error) => console.error('Error sending data:', error));
    window.location.reload();
  };

  return (
    <Modal
      style={{ zIndex: 9999 }}
      show={showAddProductModal}
      onHide={() => {
        setShowAddProductModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Dodaj novi proizvod</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Form.Label>Kategorija</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi kategoriju"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Slika</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi putanju slike"
              value={productImage}
              onChange={(event) => setProductImage(event.target.value)}
            />
          </Form.Group>
          <DragAndDrop setProductImage={setProductImage} />
          <Row>
            <Col>
              <Form.Group controlId="sizesInput">
                <Form.Label>Veličina:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesi veličinu"
                  value={sizeInput}
                  onChange={handleSizeInputChange}
                  onKeyPress={handleSizesKeyPress}
                />
              </Form.Group>
              {availableSizes.length > 0 &&
                availableSizes.map((size) => (
                  <p style={{ margin: 0 }}>-{size}</p>
                ))}
            </Col>
            <Col>
              <Form.Group controlId="sizesInput">
                <Form.Label>Cijena:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Unesi cijenu"
                  value={priceInput}
                  onChange={handlePriceInputChange}
                  onKeyPress={handlePricesKeyPress}
                />
              </Form.Group>
              {prices.length > 0 &&
                prices.map((price) => <p style={{ margin: 0 }}>€{price}</p>)}
            </Col>
          </Row>
          <Form.Group controlId="toppingInput">
            <Form.Label>Prilog:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesi prilog"
              value={toppingInput}
              onChange={handleToppingInputChange}
              onKeyPress={handleToppingsKeyPress}
            />
          </Form.Group>
          {availableToppings.length > 0 &&
            availableToppings.map((topping) => (
              <p style={{ margin: 0 }}>+{topping}</p>
            ))}

          <Button variant="primary" type="submit" className="mt-3">
            Dodaj
          </Button>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => {
              console.log('Name:', name);
              console.log('Category:', category);
              console.log('Product Image:', productImage);
            }}
          >
            Console.log
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
