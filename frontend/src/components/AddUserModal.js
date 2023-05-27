import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Col,
  Row,
  Dropdown,
  Alert,
} from 'react-bootstrap';

const AddUserModal = ({ showAddUserModal, setShowAddUserModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState('user');
  const [status, setStatus] = useState('');

  const handleAddUser = (event) => {
    event.preventDefault();
    setStatus('');

    // Validate the form data
    if (!username || !email || !password || !repeatPassword || !role) {
      setStatus('Morate unijeti sva polja!');
      return;
    }

    if (password !== repeatPassword) {
      setStatus('Lozinke se ne podudaraju!');
      return;
    }

    // Send a POST request to the server to add the user
    fetch('/api/registracija', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, role }),
    })
      .then((response) => response.json())
      .then((data) => setStatus(data.message))

      .catch((error) => console.error(error));
    window.location.reload();
  };

  return (
    <Modal
      show={showAddUserModal}
      onHide={() => {
        setShowAddUserModal(false);
        setStatus('');
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Dodaj novog korisnika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Korisničko ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite korisničko ime"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Group controlId="formEmail">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email adresu"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              placeholder="Unesite lozinku"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRepeatPassword">
            <Form.Label>Ponovite lozinku</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ponovite lozinku"
              name="repeatPassword"
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Label>Uloga</Form.Label>
          <Form.Control
            as="select"
            name="role"
            onChange={(event) => setRole(event.target.value)}
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
        <Button variant="primary" onClick={(event) => handleAddUser(event)}>
          Dodaj korisnika
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
