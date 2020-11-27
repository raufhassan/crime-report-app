import React, { useState } from "react";
import Firebase from "../../config/firebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "../../components/CitiesDropdown";
import Input from "../../components/Input";
import { phoneReg } from "../../constants/regex";

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

  const validate = () => {
    let errors = [];
    let err = { ...inputErr };
    if (state.name.length < 5) {
      err.nameErr = "name must be greater than 5 words";
      errors.push("nameErr");
    } else {
      err.nameErr = "";
    }
    if (state.details.length < 10) {
      err.descErr = "description must be greater than ten words";
      errors.push("descErr");
    } else {
      err.descErr = "";
    }
    if (!phoneReg.test(state.contact)) {
      err.contactErr = "invalid phone no";
      errors.push("phoneErr");
    } else {
      err.contactErr = "";
    }
    setInputErr({ ...err });
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isvalid = validate();
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
        <Dropdown value={state.city} name={"city"} onChange={onChange} />
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Button className="w-100" type="submit">
          Report
        </Button>
      </Form>
    </Container>
  );
};

export default CrimeReport;
