import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Badge,
  Dropdown,
  DropdownButton,
  Button,
} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Product from '../components/Product';
import restaurantStatus from '../utility/restaurantStatus';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddProductModal from '../components/AddProductModal';
import Rating from '../components/Rating';
import { FaStar } from 'react-icons/fa';
import SubmitRatingModal from '../components/SubmitRatingModal';
import UserRatingsModal from '../components/UserRatingsModal';

const ObjectScreen = (props) => {
  const { addToCart } = props;
  const { slug } = useParams();
  const [object, setData] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showUserRatingsModal, setShowUserRatingsModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(`/api/restorani/${slug}`);
      setData(response);
    };

    fetchData();
  }, [slug]);

  if (object === 'Error 404 - restoran ne postoji') {
    return <div>{object}</div>;
  }

  const translatedDaysOfWeek = {
    Nedjelja: 'Sunday',
    Ponedjeljak: 'Monday',
    Utorak: 'Tuesday',
    Srijeda: 'Wednesday',
    Cetvrtak: 'Thursday',
    Petak: 'Friday',
    Subota: 'Saturday',
  };

  const daysOfWeek = [
    'Nedjelja',
    'Ponedjeljak',
    'Utorak',
    'Srijeda',
    'Cetvrtak',
    'Petak',
    'Subota',
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  var wt = '';
  if (object.workTime) {
    wt = object.workTime[translatedDaysOfWeek[dayOfWeek]];
  }
  const categories = [];
  if (object.products) {
    object.products.forEach((product) => {
      if (!categories.includes(product.Category)) {
        categories.push(product.Category);
      }
    });
  }

  return (
    <Container className="pt-4">
      <Row>
        <Col xs={6} sm={6} md={6} lg={4}>
          <Image
            className="square bg-primary rounded object-image"
            src={object.image}
            fluid
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={4}>
          <Container>
            <strong>Adresa restorana:</strong>
            <p>{object.adresa}</p>
            <strong>Cijena dostave:</strong>
            <p>
              {object.cijenaDostave ? object.cijenaDostave + '€' : 'Besplatna'}
            </p>
            <strong>Radno vrijeme:</strong>
            <p style={{ margin: 0 }}>danas</p>
            <Dropdown
              onToggle={() => setShow(!show)}
              show={show}
              style={{ minWidth: '500' }}
            >
              <DropdownButton title={wt} id="nav-dropdown">
                {daysOfWeek.map((day, index) => (
                  <p
                    className="text-center"
                    style={day === dayOfWeek ? { fontWeight: '700' } : {}}
                  >
                    {object.workTime ? (
                      <p>
                        {day}: {object.workTime[translatedDaysOfWeek[day]]}
                      </p>
                    ) : (
                      day
                    )}
                  </p>
                ))}
              </DropdownButton>
            </Dropdown>
            <strong>Status:</strong>
            <p>
              {object.status === 'open' && restaurantStatus(wt) ? (
                <Badge bg="success">Otvoren</Badge>
              ) : (
                <Badge bg="danger">Zatvoren</Badge>
              )}
            </p>
            <Button
              variant="outline-secondary"
              className="mt-1"
              onClick={() => {
                setShowUserRatingsModal(true);
              }}
              style={{
                color: '#ffcc00',
                borderColor: '#ffcc00',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0px 0px 10px 2px rgba(255, 204, 0, 0.6)')
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <Rating rating={object.rating} reviews={object.reviews}></Rating>
            </Button>
            <Button
              variant="outline-secondary"
              className="mt-1"
              onClick={() => {
                setShowRatingModal(true);
              }}
              style={{
                color: '#ffcc00',
                borderColor: '#ffcc00',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0px 0px 10px 2px rgba(255, 204, 0, 0.6)')
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <FaStar className="mr-2" style={{ color: '#ffcc00' }} />
              <span style={{ color: '#ffcc00', fontWeight: '600' }}>
                Ocijeni!
              </span>
            </Button>
          </Container>
        </Col>
      </Row>
      <Row className="pt-3">
        {user && (user.role === 'admin' || object.user === user._id) && (
          <Button
            variant="light"
            onClick={() => {
              setShowAddProductModal(true);
            }}
          >
            Add Product
          </Button>
        )}
        <Col>
          <Card className="border-0">
            <ListGroup variant="">
              {categories.length ? (
                categories.map((category) => (
                  <div key={category}>
                    <hr />
                    <h4 style={{ marginBottom: 20, fontWeight: 'bold' }}>
                      {category}
                    </h4>
                    <Row>
                      {object.products
                        .filter((product) => product.Category === category)
                        .map((product) => (
                          <Col xs={12} sm={12} md={6} lg={6}>
                            <Product
                              key={product.slug}
                              product={product}
                              addToCart={addToCart}
                              object={object}
                            ></Product>
                          </Col>
                        ))}
                    </Row>
                  </div>
                ))
              ) : (
                <h4 className="mt-3">Nema proizvoda :(</h4>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <AddProductModal
        objectId={object._id}
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
      />
      <SubmitRatingModal
        objectId={object._id}
        showRatingModal={showRatingModal}
        setShowRatingModal={setShowRatingModal}
      />
      <UserRatingsModal
        objectId={object._id}
        showUserRatingsModal={showUserRatingsModal}
        setShowUserRatingsModal={setShowUserRatingsModal}
      />
    </Container>
  );
};

export default ObjectScreen;
