import React, { useState } from 'react';
import { Button, Modal, Col, Row, Alert } from 'react-bootstrap';

const ProductModal = ({
  product,
  addToCart,
  handleCloseModal,
  showModal,
  show,
  setShow,
}) => {
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);

  const onOptionChange = (e) => {
    setSize(e.target.value);
  };

  const onToppingsChange = (e) => {
    if (toppings.includes(e.target.value)) {
      const newToppings = [...toppings];
      newToppings.splice(toppings.indexOf(e.target.value), 1);
      // Update the state with the new array
      setToppings(newToppings);
    } else {
      setToppings((toppings) => [...toppings, e.target.value]);
    }
  };

  product.size = size;
  product.toppings = toppings;
  if (product.size) {
    product.price =
      product.prices[product.availableSizes.indexOf(product.size)];
  }

  product.size = size;
  product.toppings = toppings;
  if (product.size) {
    product.price =
      product.prices[product.availableSizes.indexOf(product.size)];
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header
        style={{ padding: 0, margin: 0, backgroundColor: 'transparent' }}
      >
        <img
          src={product.productImage}
          alt={product.name}
          style={{
            width: '100%',
            height: '300px',
            overflow: 'hidden',
            borderTopLeftRadius: '6px',
            borderTopRightRadius: '6px',
          }}
        />
        <button
          type="button"
          className="btn-close modal-button"
          aria-label="Close"
          onClick={handleCloseModal}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title style={{ fontWeight: 'bold' }}>{product.name}</Modal.Title>
        <p>{product.description}</p>
        <Row>
          <Col lg={3} md={3} sm={4} xs={4}>
            {product.availableSizes.map((object) => (
              <div key={object}>
                <input
                  type="radio"
                  name={product.slug}
                  value={object}
                  onChange={onOptionChange}
                />
                <label>{object}</label>
              </div>
            ))}
          </Col>
          <Col>
            {product.availableToppings.map((object) => (
              <div key={object}>
                <input
                  type="checkbox"
                  name={product.slug}
                  value={object}
                  onChange={onToppingsChange}
                />
                <label>{object}</label>
              </div>
            ))}
          </Col>
          <Alert show={show} variant="danger" className="mt-3">
            <Alert.Heading>Veličina ne smije ostati prazna!</Alert.Heading>
            <p>Odaberite veličinu!</p>
          </Alert>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() =>
            size === '' ? setShow(true) : (addToCart(product), setShow(false))
          }
        >
          Dodaj u košaricu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
