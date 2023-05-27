import { useState } from 'react';
import { Form, Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignUpScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  function HandleSubmit(event) {
    event.preventDefault();

    setStatus('');
    if (!username || !email || !password) {
      setStatus('Niti jedno polje ne smije ostati prazno!');
    }

    if (!status) {
      const role = 'user';
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
    }
    if (!status) {
      navigate('/signin');
    }
    console.log(status);
  }

  return (
    <Container>
      <Form
        className="d-flex justify-content-center pt-3"
        onSubmit={HandleSubmit}
      >
        <Col xs={12} md={8} lg={6}>
          <h2>Registracija</h2>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite korisničko ime"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group></Form.Group>
          <Form.Group>
            <Form.Label>Email adresa:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email adresu"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lozinka:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Unesite lozinku"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              type="password"
              placeholder="Ponovo unesite lozinku"
            />
          </Form.Group>
          <Alert show={status} variant="danger" className="mt-3">
            <Alert.Heading>{status}</Alert.Heading>
            <p>Pokušajte ponovo!</p>
          </Alert>
          <Button variant="primary" type="submit" className="mt-2 mb-2">
            Registracija
          </Button>
          <p>
            Imaš račun? <a href="/signin">Prijavi se</a>
          </p>
        </Col>
      </Form>
    </Container>
  );
}

export default SignUpScreen;
