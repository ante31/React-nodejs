import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import ProductModal from './ProductModal';
import EditProductModal from './EditProductModal';

function Product(props) {
  const { addToCart } = props;
  const { product } = props;
  const { object } = props;

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const [show, setShow] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setShow(false);
  };

  function handleDelete(objectId, productId) {
    axios
      .put(`/api/${objectId}/products/${productId}`)
      .then((response) => {
        console.log(`Product with ID ${productId} deleted successfully`);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload(); // refresh the page
  }

  return (
    <Card key={product._id} className="grow">
      <div
        class="parent-element"
        style={{ cursor: 'pointer' }}
        onClick={handleShowModal}
      >
        <div
          className="icon-container"
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          {user && (user.role === 'admin' || object.user === user._id) && (
            <Button
              variant="light"
              style={{ fontSize: '0.75rem', padding: '0.25rem' }}
              onClick={(event) => {
                event.stopPropagation();
                setShowEditModal(true);
              }}
            >
              <FaEdit />
            </Button>
          )}
          {user && (user.role === 'admin' || object.user === user._id) && (
            <Button
              variant="light"
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem',
                marginLeft: '0.5rem',
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(object._id, product._id);
              }}
            >
              <FaTrash />
            </Button>
          )}
        </div>

        <div>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
          </Card.Body>
        </div>
        <Card.Img
          src={product.productImage}
          style={{ maxWidth: '100px', height: '100px', margin: 2 }}
        />
      </div>
      <ProductModal
        product={product}
        handleCloseModal={handleCloseModal}
        addToCart={addToCart}
        show={show}
        showModal={showModal}
        setShow={setShow}
      />
      <EditProductModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        product={product}
        objectId={object._id}
      />
    </Card>
  );
}
export default Product;
