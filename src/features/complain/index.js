import React, { useState } from "react";
import Firebase from "../../config/firebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "../../components/CitiesDropdown";
import Input from "../../components/Input";
const Complain = () => {
  const [state, setState] = useState({
    name: "",
    date: "",
    description: "",
    contact: "",
    city: "",
    againstName: "",
  });
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    state.userId = currentUser.uid;
    Firebase.database()
      .ref("complains")
      .push(state)
      .then((docRef) => {
        history.push("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container className="min-height">
      <div className="text-center my-5">
        <h1>Complain form</h1>
      </div>
      <Form onSubmit={onSubmit}>
        <Input
          label={"complainants name"}
          value={state.name}
          onChange={onChange}
          type={"text"}
          name={"name"}
          required={true}
        />
        <Input
          type={"date"}
          value={state.date}
          onChange={onChange}
          label={"Date of complain:"}
          name={"date"}
          required={true}
        />
        <Input
          type={"text"}
          value={state.againstName}
          onChange={onChange}
          label={
            "Name of the company/person against which/whom the complaint is filed:"
          }
          name={"againstName"}
          required={true}
        />
        <Input
          type={"number"}
          value={state.contact}
          onChange={onChange}
          label={"Contact:"}
          name={"contact"}
          required={true}
        />
        <Input
          type={"text"}
          value={state.description}
          onChange={onChange}
          label={"The complaint is regarding:"}
          name={"description"}
          required={true}
        />
        <Dropdown value={state.city} name={"city"} onChange={onChange} />
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Button className="w-100" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Complain;
