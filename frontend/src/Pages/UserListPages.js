import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getUserList, deleteUser } from "../redux/actions/userActions";
import MessageContainer from "../components/MessageContainer";
import Loader from "../components/Loader";

const UserListPage = ({ history, user, userList, userDelete }) => {
  const dispatch = useDispatch();

//Destructure from state
  const { loading, error, userInfo } = user;
  const { users } = userList;
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Är du säker')) {
      dispatch(deleteUser(id))
    }
  };

  return (
    <>
    
      <h1>Användarnas Lista</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageContainer variant="danger">{error}</MessageContainer>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

//mapStateToProps
const mapStateToProps = ({ user, userList, userDelete, }) => ({
  user: user,
  userList: userList,
  userDelete: userDelete,
});
export default connect(mapStateToProps, null)(UserListPage);

