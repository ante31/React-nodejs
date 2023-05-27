import { useState } from 'react';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
const products = [
  {
    id: 1,
    name: 'Product',
    category: 'Category',
    price: 10.99,
    image: 'img',
    description: 'abc',
  },
];
const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card
        className="flex-fill m-1 rounded"
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onClick={handleShowModal}
      >
        <div class="parent-element">
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.price} kn</Card.Text>
          </Card.Body>
          <Card.Img
            src={product.image}
            style={{ maxWidth: '100px', margin: 2 }}
          />
        </div>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img
              src={product.image}
              alt={product.name}
              style={{ maxHeight: '20rem' }}
            />
          </div>
          <p>{product.description}</p>
          <p>Cijena: {product.price} kn</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zatvori
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              alert(`Dodaj proizvod '${product.name}' u košaricu!`)
            }
          >
            Dodaj u košaricu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const TestScreen = () => {
  return (
    <>
      {products ? (
        <Row>
          {products.map((product) => (
            <Col xs={12} sm={12} md={6} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <h2>Nema proizvoda</h2>
      )}
    </>
  );
};

export default TestScreen;
