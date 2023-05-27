import React, { useState } from 'react';
import { Button, Modal, Col, Row, Alert, Form, hr } from 'react-bootstrap';
import Dropzone from '../utility/Dropzone';

const EditProductModal = ({
  product,
  setShowEditModal,
  showEditModal,
  objectId,
}) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.Category);
  const [productImage, setProductImage] = useState(product.productImage);
  const [availableSizes, setAvailableSizes] = useState(product.availableSizes);
  const [availableToppings, setAvailableToppings] = useState(
    product.availableToppings
  );
  const [prices, setPrices] = useState(product.prices);
  const [sizeInput, setSizesInput] = useState('');
  const [priceInput, setPriceInput] = useState();
  const [toppingInput, setToppingInput] = useState('');

  const handleDeleteSize = (sizeToDelete) => {
    const newAvailableSizes = availableSizes.filter(
      (size) => size !== sizeToDelete
    );
    setAvailableSizes(newAvailableSizes);
  };

  const handleDeletePrice = (priceToDelete) => {
    const newPrices = prices.filter((price) => price !== priceToDelete);
    setPrices(newPrices);
  };

  const handleDeleteTopping = (toppingToDelete) => {
    const newAvailableToppings = availableToppings.filter(
      (topping) => topping !== toppingToDelete
    );
    setAvailableToppings(newAvailableToppings);
  };

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
    event.preventDefault();
    fetch(`/api/${objectId}/products/${product._id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        Category: category,
        productImage: productImage,
        availableSizes: availableSizes,
        availableToppings: availableToppings,
        prices: prices,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.reload();
  };

  return (
    <Modal
      style={{ zIndex: 9999 }}
      show={showEditModal}
      onHide={() => {
        setShowEditModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Uredi proizvod</Modal.Title>
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
          <Dropzone setProductImage={setProductImage} />

          <Row>
            <Col>
              <Form.Group controlId="sizesInput">
                <Form.Label>Veličina: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesi veličinu"
                  value={sizeInput}
                  onChange={handleSizeInputChange}
                  onKeyPress={handleSizesKeyPress}
                />
              </Form.Group>
              {availableSizes.length > 0 && (
                <div>
                  {availableSizes.map((size) => (
                    <p
                      key={size}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0',
                      }}
                    >
                      -{size}
                      <Button
                        variant="Light"
                        style={{ padding: '0 5px', marginLeft: '10px' }}
                        onClick={() => handleDeleteSize(size)}
                      >
                        x
                      </Button>
                    </p>
                  ))}
                </div>
              )}
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
                prices.map((price) => (
                  <p
                    key={price}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0',
                    }}
                  >
                    €{price}
                    <Button
                      variant="Light"
                      style={{ padding: '0 5px', marginLeft: '10px' }}
                      onClick={() => handleDeletePrice(price)}
                    >
                      x
                    </Button>
                  </p>
                ))}
            </Col>
          </Row>
          <Form.Group className="mt-3" controlId="toppingInput">
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
              <p
                key={topping}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '0',
                }}
              >
                +{topping}
                <Button
                  variant="Light"
                  style={{ padding: '0 5px', marginLeft: '10px' }}
                  onClick={() => handleDeleteTopping(topping)}
                >
                  x
                </Button>
              </p>
            ))}
          <Button variant="primary" type="submit" className="mt-3">
            Spremi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
