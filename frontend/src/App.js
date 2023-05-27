import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeScreen from './screens/Homescreen';
import ObjectScreen from './screens/ObjectScreen';
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import CartScreen from './screens/CartScreen';
import TestScreen from './screens/TestScreen';
import SignInScreen from './screens/SigninScreen';
import SignUpScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserList from './screens/UserList';
import ShippingAddressForm from './screens/ShippingAddressScreen';

function App() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || user?.cartItems || []
  );

  if (!cartItems) {
    setCartItems([]);
  }

  console.log(localStorage);

  const compareToppings = (array1, array2) => {
    array1.sort();
    array2.sort();

    return JSON.stringify(array1) === JSON.stringify(array2);
  };

  const addToCart = (product) => {
    const existingItems = cartItems.find(
      (x) =>
        x.slug === product.slug &&
        x.size === product.size &&
        compareToppings(x.toppings, product.toppings)
    );
    if (existingItems) {
      setCartItems(
        cartItems.map((x) =>
          x.slug === product.slug &&
          x.size === product.size &&
          compareToppings(x.toppings, product.toppings)
            ? { ...existingItems, quantity: existingItems.quantity + 1 }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const takeFromCart = (product) => {
    const existingItems = cartItems.find(
      (x) =>
        x.slug === product.slug &&
        x.size === product.size &&
        compareToppings(x.toppings, product.toppings)
    );

    setCartItems(
      cartItems.map((x) =>
        x.slug === product.slug &&
        x.size === product.size &&
        compareToppings(x.toppings, product.toppings)
          ? { ...existingItems, quantity: existingItems.quantity - 1 }
          : x
      )
    );
  };

  function removeFromCart(product) {
    const updatedCartItems = cartItems.filter(
      (x) =>
        x._id !== product._id ||
        x.size !== product.size ||
        !compareToppings(x.toppings, product.toppings)
    );
    setCartItems(updatedCartItems);
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(query);
    navigate('/');
  };

  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Dobar tek</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="pt-2" id="basic-navbar-nav">
              <Form className="d-flex " onSubmit={handleSubmit}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Pretraži
                </Button>
              </Form>

              <Nav className=" w-100 justify-content-end">
                <Nav.Link href="/kosarica">
                  <Nav.Link href="/kosarica" style={{ padding: 0 }}>
                    <FaShoppingCart /> Košarica
                    <Badge pill bg="danger">
                      {cartItems.length}
                    </Badge>
                  </Nav.Link>
                </Nav.Link>
                {!user && <Nav.Link href="/signin">Prijava</Nav.Link>}

                {user && user.role === 'admin' && (
                  <Nav.Link href="/userlist">Lista korisnika i admina</Nav.Link>
                )}
                {user && <Nav.Link href="/profile">{user.username}</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main style={{ paddingBottom: 20, marginTop: 50 }}>
        <Routes>
          <Route path="/" element={<HomeScreen query={query} />} />
          <Route
            path="/restorani/:slug"
            element={
              <ObjectScreen addToCart={addToCart} cartItems={cartItems} />
            }
          />
          <Route
            path="/kosarica"
            element={
              <CartScreen
                addToCart={addToCart}
                takeFromCart={takeFromCart}
                removeFromCart={removeFromCart}
                cartItems={cartItems}
              />
            }
          />
          <Route path="/test" element={<TestScreen />} />
          <Route
            path="/profile"
            element={<ProfileScreen user={user} cartItems={cartItems} />}
          />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/shipping" element={<ShippingAddressForm />}></Route>
        </Routes>
      </main>
      <footer className="bg-dark py-2 pt-3">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="text-white">
                Copyright &copy; {new Date().getFullYear()} Dobar tek
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
