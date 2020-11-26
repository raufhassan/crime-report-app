import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import app from "../../config/firebase";
import Loading from "../../components/Loader";

export default function Home() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const [complains, setComplains] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const todoRef = app.database().ref("complains");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      var dbComplains = Object.keys(todos).map((key, index) => {
        return todos[key];
      });
      setComplains(dbComplains);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Home</h2>
            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
        </Card>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Complainant's name</th>
              <th>Date of complain</th>
              <th>Name of the company/person against</th>
              <th>Complain desciption</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(complains).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item?.name}</td>
                  <td>{item?.date}</td>
                  <td>{item?.againstName}</td>
                  <td>{item?.description}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </>
    );
  }
}
