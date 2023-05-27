import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

const EditUserModal = ({
  showEditUserModal,
  setShowEditUserModal,
  editUserID,
}) => {
  const [status, setStatus] = useState('');

  const [formValues, setFormValues] = useState({
    _id: '',
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    axios.get(`/api/users/${editUserID}`).then((response) => {
      const userData = response.data;
      setFormValues({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
      });
    });
  });

  const HandleEditUser = () => {
    useEffect(() => {
      axios
        .put(`/api/users/${formValues._id}`, formValues)
        .then((response) => {
          console.log('User updated successfully:', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }, []);
  };

  return (
    <Modal
      show={showEditUserModal}
      onHide={() => {
        setShowEditUserModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Uredi korisnika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Korisničko ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite korisničko ime"
            value={formValues.username}
            name="username"
            onChange={(event) =>
              setFormValues({ ...formValues, username: event.target.value })
            }
          />
          <Form.Group controlId="formEmail">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email adresu"
              value={formValues.email}
              name="email"
              onChange={(event) =>
                setFormValues({ ...formValues, email: event.target.value })
              }
            />
          </Form.Group>

          <Form.Label>Uloga</Form.Label>
          <Form.Control
            as="select"
            value={formValues.role}
            name="role"
            onChange={(event) =>
              setFormValues({ ...formValues, role: event.target.role })
            }
          >
            <option value="user">Korisnik</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form>
      </Modal.Body>
      <Alert show={status} variant="danger" className="mt-3">
        <Alert.Heading>{status}</Alert.Heading>
        <p>Pokušajte ponovo!</p>
      </Alert>
      <Modal.Footer>
        <Button variant="primary" onClick={(event) => HandleEditUser(event)}>
          Spremi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
