import React, { useRef } from "react";
import app from "../../components/Firebase/firebase";
import { useAuth } from "../../components/context";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
function Complain() {
  const name = useRef();
  const date = useRef();
  const againstName = useRef();
  const description = useRef();
  const { currentUser } = useAuth();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    app
      .database()
      .ref("complains")
      .push({
        name: name.current.value,
        description: description.current.value,
        againstName: againstName.current.value,
        date: date.current.value,
        userId: currentUser.uid,
        status: "pending",
      })
      .then((docRef) => {
        console.log("submitted");
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <Container style={{ minHeight: "100vh" }}>
      <div className="text-center my-5">
        <h1>Complain form</h1>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Complainant's Name:</Form.Label>
          <Form.Control type="text" ref={name} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date of complain:</Form.Label>
          <Form.Control type="date" ref={date} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Name of the company/person against which/whom the complaint is
            filed:
          </Form.Label>
          <Form.Control type="text" ref={againstName} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>The complaint is regarding:</Form.Label>
          <Form.Control as="textarea" rows={3} ref={description} required />
        </Form.Group>
        <Button className="w-100" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default Complain;
