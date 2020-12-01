import React, { useState } from "react";
import Firebase from "../config/firebase";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "./Dropdown";
import Input from "./Input";
import validationFunc from "../utils/validation";
import cities from "../constants/cities";
const MissingPerson = () => {
  const [state, setState] = useState({
    name: "",
    personName: "",
    missingSince: "",
    reportDate: "",
    details: "",
    contact: "",
    city: "Huntsville",
    status: "pending",
  });
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [inputErr, setInputErr] = useState({
    nameErr: "",
    descErr: "",
    contactErr: "",
    personNameErr: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    state["userId"] = currentUser.uid;
    const isError = validationFunc(inputErr, state, setInputErr);
    if (!isError) {
      Firebase.database()
        .ref("missingPersons")
        .child(state.city)
        .push(state)
        .then((docRef) => {
          history.push("/");
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Container className="min-height">
      <div className="text-center my-5">
        <h1>Missing person report form</h1>
      </div>
      <Form onSubmit={onSubmit}>
        <Input
          label={"Complainant's name"}
          value={state.name}
          onChange={onChange}
          type={"text"}
          name={"name"}
          required={true}
          error={inputErr.nameErr}
        />
        <Input
          label={"Name of missing person:"}
          value={state.personName}
          onChange={onChange}
          type={"text"}
          name={"personName"}
          required={true}
          error={inputErr.personNameErr}
        />
        <Input
          label={"Person is missing since:"}
          value={state.missingSince}
          onChange={onChange}
          type={"datetime-local"}
          name={"missingSince"}
          required={true}
        />
        <Input
          label={"Date and time of report:"}
          value={state.reportDate}
          onChange={onChange}
          type={"datetime-local"}
          name={"reportDate"}
          required={true}
        />
        <Input
          label={"Contact:"}
          value={state.contact}
          onChange={onChange}
          type={"number"}
          name={"contact"}
          required={true}
          error={inputErr.contactErr}
        />
        <Input
          label={"Details of a person:"}
          value={state.details}
          onChange={onChange}
          type={"text"}
          name={"details"}
          required={true}
          error={inputErr.descErr}
        />
        <Dropdown
          value={state.city}
          name={"city"}
          options={cities}
          label={"city"}
          onChange={onChange}
        />
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Button className="w-100" type="submit">
          Report
        </Button>
      </Form>
    </Container>
  );
};

export default MissingPerson;
