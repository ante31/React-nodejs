import { Col, Container, Image, Row, Dropdown, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddRestaurantModal from '../components/AddRestaurantModal';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditRestaurantModal from '../components/EditRestaurantModal';

const HomeScreen = ({ query }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [data, setData] = useState([]);
  const [editObjectID, setEditObjectID] = useState();
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = (objectID) => {
    setEditObjectID(objectID);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) || query === ''
  );

  function onDelete(objectID) {
    axios
      .delete(`/api/${objectID}`)
      .then((response) => {
        // handle successful response, e.g. update UI
        console.log(`Restaurant with ID ${objectID} deleted successfully`);
        window.location.reload(); // refresh the page
      })
      .catch((error) => {
        // handle error response, e.g. show error message
        console.error(
          `Failed to delete restaurant with ID ${objectID}: ${error.message}`
        );
      });
  }

  const sortData = (field, order) => {
    const sortedData = filteredData.sort((a, b) => {
      if (field === 'name') {
        if (order === 'asc') {
          return a[field].localeCompare(b[field]);
        } else {
          return b[field].localeCompare(a[field]);
        }
      } else {
        if (order === 'asc') {
          return b[field] - a[field];
        } else {
          return a[field] - b[field];
        }
      }
    });

    return sortedData;
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = sortData(sortField, sortOrder);

  return (
    <Container className="objects">
      <Row style={{ width: 100000 }}>
        <Container>
          <p style={{ fontSize: 24 }} className="pt-3">
            {query ? `Rezultati pretraživanja za: ${query}` : 'Popis restorana'}
          </p>
        </Container>

        <Container className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {sortField === 'name' ? 'Naziv' : 'Ocjena'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('name')}>
                Naziv
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('rating')}>
                Ocjena
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="light" onClick={() => handleSort(sortField)}>
            <i
              className={`fas ${
                sortOrder === 'desc' ? 'fa-chevron-up' : 'fa-chevron-down'
              }`}
            ></i>
          </Button>
          {user && user.role === 'admin' && (
            <Button variant="light" onClick={handleShowAddModal}>
              Dodaj novi restoran
            </Button>
          )}
        </Container>

        {sortedData.length === 0 ? (
          <Container>
            <p>Nema ništa</p>
          </Container>
        ) : (
          sortedData.map((item) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.slug}
              style={{ paddingTop: 20 }}
            >
              <div
                className="item-container grow"
                style={{ position: 'relative' }}
              >
                <div
                  className="icon-container"
                  style={{ position: 'absolute', top: 0, right: 0 }}
                >
                  {user &&
                    (user.role === 'admin' || item.user === user._id) && (
                      <Button
                        variant="light"
                        onClick={() => handleShowEditModal(item._id)}
                      >
                        <FaEdit />
                      </Button>
                    )}
                  {user &&
                    (user.role === 'admin' || item.user === user._id) && (
                      <Button
                        variant="light"
                        onClick={() => onDelete(item._id)}
                        style={{ marginLeft: '1rem' }}
                      >
                        <FaTrash />
                      </Button>
                    )}
                </div>
                <Link
                  to={`/restorani/${item.slug}`}
                  state={item}
                  style={{ textDecoration: 'none' }}
                >
                  <Image
                    className="full-width-image"
                    src={item.image}
                    alt={item.name}
                    fluid
                  />
                  <div className="item-content">
                    <strong>{item.name}</strong>
                    <Rating
                      rating={item.rating}
                      reviews={item.reviews}
                    ></Rating>
                  </div>
                </Link>
              </div>
            </Col>
          ))
        )}
      </Row>
      <AddRestaurantModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
      />
      <EditRestaurantModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        objectID={editObjectID}
      />
    </Container>
  );
};

export default HomeScreen;
