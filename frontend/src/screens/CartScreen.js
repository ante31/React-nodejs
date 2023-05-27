import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { BsPlus, BsDash, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CartScreen = (props) => {
  const navigate = useNavigate();
  const { addToCart, takeFromCart, removeFromCart, cartItems } = props;

  const handleCheckoutClick = () => {
    navigate('/shipping');
  };

  return (
    <Container>
      <Row>
        <Col md={8} sm={12} xs={12}>
          <Container className="py-3 h-100">
            {cartItems.map((item) => (
              <Card className="mt-1">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={2} sm={2} xs={12}>
                      <img
                        src={item.productImage}
                        alt={item.name}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </Col>
                    <Col md={4} sm={3} xs={12}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Title>({item.size})</Card.Title>
                      <Card.Text>
                        {item.toppings.map((topping) => (
                          <p style={{ margin: 0 }}>+{topping}</p>
                        ))}
                      </Card.Text>
                    </Col>
                    <Col md={4} sm={4} xs={10}>
                      <Button
                        variant="light"
                        onClick={() => takeFromCart(item)}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span> {item.quantity} </span>
                      <Button
                        variant="light"
                        onClick={() => addToCart(item)}
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={2} sm={2} xs={2}>
                      <Button
                        variant="light"
                        onClick={() => removeFromCart(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Container>
        </Col>
        <Col md={4} sm={12} xs={12}>
          <Container className="py-3 h-100">
            <Card>
              <Card.Body>
                <h3>
                  Ukupno <br></br>(
                  {cartItems.reduce((a, c) => a + c.quantity, 0)} proizvoda) : €
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>

                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckoutClick}
                  >
                    Dalje na plaćanje
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
