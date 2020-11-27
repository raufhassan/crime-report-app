import React, { useState } from "react";
import Firebase from "../config/firebase";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "./Dropdown";
import Input from "./Input";
import validationFunc from "../utils/validation";
import cities from "../constants/cities";
const CrimeReport = () => {
  const [state, setState] = useState({
    name: "",
    complainTime: "",
    incidentTime: "",
    contact: "",
    details: "",
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
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const isvalid = validationFunc(inputErr, state, setInputErr);
    if (isvalid.length === 0) {
      state.userId = currentUser.uid;
      Firebase.database()
        .ref("crimes")
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
        <h1>Crime report form</h1>
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
          label={"Date and time of complain:"}
          value={state.complainTime}
          onChange={onChange}
          type={"datetime-local"}
          name={"complainTime"}
          required={true}
        />
        <Input
          label={"Date and time of incident:"}
          value={state.incidentTime}
          onChange={onChange}
          type={"datetime-local"}
          name={"incidentTime"}
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
          label={"Details of incident:"}
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

export default CrimeReport;
