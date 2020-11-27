import React, { useState } from "react";
import Firebase from "../../config/firebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Dropdown from "../../components/CitiesDropdown";
import Input from "../../components/Input";
import { phoneReg } from "../../constants/regex";
const Complain = () => {
  const [state, setState] = useState({
    name: "",
    date: "",
    description: "",
    contact: "",
    city: "Huntsville",
    againstName: "",
    status: "pending",
  });
  const { currentUser } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [inputErr, setInputErr] = useState({
    nameErr: "",
    descErr: "",
    contactErr: "",
    againstNameErr: "",
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let errors = [];
    let err = { ...inputErr };
    if (state.name.length < 5) {
      err.nameErr = "name must be greater than 5 words";
      errors.push("nameErr");
    } else {
      err.nameErr = "";
    }
    if (state.description.length < 10) {
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
    if (state.againstName.length < 5) {
      err.againstNameErr = "name must be greater than 5 words";
      errors.push("descErr");
    } else {
      err.againstNameErr = "";
    }
    setInputErr({ ...err });
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid.length === 0) {
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
    }
  };

  return (
    <Container className="min-height">
      <div className="text-center my-5">
        <h1>Complain form</h1>
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
          error={inputErr.againstNameErr}
        />

        <Input
          type={"number"}
          value={state.contact}
          onChange={onChange}
          label={"Contact:"}
          name={"contact"}
          required={true}
          error={inputErr.contactErr}
        />
        <Input
          type={"text"}
          value={state.description}
          onChange={onChange}
          label={"The complaint is regarding:"}
          name={"description"}
          required={true}
          error={inputErr.descErr}
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
