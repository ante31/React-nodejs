import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ListGroup,
  Row,
  Col,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';

function UserList() {
  const [data, setData] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUserID, setEditUserID] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/users');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  function onDelete(userID) {
    axios
      .delete(`/api/users/${userID}`)
      .then((response) => {
        console.log(`User with ID ${userID} deleted successfully`);
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          `Failed to delete user with ID ${userID}: ${error.message}`
        );
      });
  }

  return (
    <Container>
      <h1 className="mb-4 mt-4">Lista korisnika i admina</h1>
      <Button
        className="mb-4"
        onClick={() => {
          setShowAddUserModal(true);
        }}
      >
        Dodaj novog korisnika
      </Button>
      <ListGroup style={{ maxWidth: '800px' }}>
        <ListGroup.Item className="d-none d-sm-block">
          <Row>
            <Col md={3} sm={3} xs={12}>
              <strong>Korisničko ime</strong>
            </Col>
            <Col md={6} sm={6}>
              <strong>Email</strong>
            </Col>
            <Col md={1} sm={1}>
              <strong>Uloga</strong>
            </Col>
          </Row>
        </ListGroup.Item>
        {data.map((user) => (
          <ListGroup.Item key={user.id}>
            <Row>
              <Col md={9} sm={9} xs={9}>
                <Row>
                  <Col md={3} sm={3} xs={12}>
                    <OverlayTrigger
                      overlay={<Tooltip id="tooltip">{user._id}</Tooltip>}
                      placement="top"
                    >
                      <strong>{user.username}</strong>
                    </OverlayTrigger>
                  </Col>
                  <Col md={7} sm={7} xs={12}>
                    {user.email}
                  </Col>
                  <Col md={2} sm={2} xs={12}>
                    {user.role}
                  </Col>
                </Row>
              </Col>
              <Col md={3} sm={3} xs={3}>
                <Row>
                  <Col md={6} sm={6} xs={6}>
                    <button
                      onClick={() => {
                        setShowEditUserModal(true);
                        setEditUserID(user._id);
                      }}
                      className="btn btn-link"
                    >
                      <FaEdit />
                    </button>
                  </Col>
                  <Col md={6} sm={6} xs={6}>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="btn btn-link"
                    >
                      <FaTrash />
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddUserModal
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
      />
      <EditUserModal
        showEditUserModal={showEditUserModal}
        setShowEditUserModal={setShowEditUserModal}
        editUserID={editUserID}
      />
    </Container>
  );
}

export default UserList;
