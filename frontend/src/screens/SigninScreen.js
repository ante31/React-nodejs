import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SignInScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    const { data } = await axios.post('/api/signin', null, {
      params: {
        email: email,
        password: password,
      },
    });
    console.log(data);
    if (data.message) {
      // Show error message
      setShow(true);
    } else {
      setShow(false);
      localStorage.removeItem('cartItems');
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <Container>
      <Form
        onSubmit={submitHandler}
        className="d-flex justify-content-center pt-3"
      >
        <Col xs={12} md={8} lg={6}>
          <h2>Prijava</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email adresa:</Form.Label>
            <Form.Control type="email" placeholder="Unesite email adresu" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Lozinka:</Form.Label>
            <Form.Control type="password" placeholder="Unesite lozinku" />
          </Form.Group>
          <Alert show={show} variant="danger" className="mt-3">
            <Alert.Heading>Netočna email adresa ili lozinka!</Alert.Heading>
            <p>Pokušajte ponovo!</p>
          </Alert>
          <Button variant="primary" type="submit" className="mt-2 mb-2">
            Prijava
          </Button>
          <p>
            Nemaš račun? <a href="/signup">Registriraj se</a>
          </p>
        </Col>
      </Form>
    </Container>
  );
}

export default SignInScreen;
