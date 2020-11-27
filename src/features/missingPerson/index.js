import React, { useState } from "react";
import Firebase from "../../config/firebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "../../components/CitiesDropdown";
import Input from "../../components/Input";
import { phoneReg } from "../../constants/regex";

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
    if (state.personName.length < 5) {
      err.personNameErr = "name must be greater than 5 words";
      errors.push("descErr");
    } else {
      err.personNameErr = "";
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
        .ref("missingPersons")
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
        <Dropdown value={state.city} name={"city"} onChange={onChange} />
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Button className="w-100" type="submit">
          Report
        </Button>
      </Form>
    </Container>
  );
};

export default MissingPerson;
