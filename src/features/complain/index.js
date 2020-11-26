import React, { useRef, useState } from "react";
import app from "../../config/firebase";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Dropdown from "../../components/CitiesDropdown";
import Input from "../../components/Input";
function Complain() {
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

  const onChange = (e, Name) => {
    switch (Name) {
      case "name":
        setState({ ...state, name: e.target.value });
        break;
      case "date":
        setState({ ...state, date: e.target.value });
        break;
      case "description":
        setState({ ...state, description: e.target.value });
        break;
      case "contact":
        setState({ ...state, contact: e.target.value });
        break;
      case "againstName":
        setState({ ...state, againstName: e.target.value });
        break;
      case "city":
        setState({ ...state, city: e.target.value });
        break;
      default:
        console.log("no change");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    state.userId = currentUser.uid;
    app
      .database()
      .ref("complains")
      .push(state)
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
        <Input
          label={"complainants name"}
          value={state.name}
          onChange={onChange}
          type={"text"}
          name={"name"}
        />
        <Input
          type={"date"}
          value={state.date}
          onChange={onChange}
          label={"Date of complain:"}
          name={"date"}
        />
        <Input
          type={"text"}
          value={state.againstName}
          onChange={onChange}
          label={
            "Name of the company/person against which/whom the complaint is filed:"
          }
          name={"againstName"}
        />
        <Input
          type={"number"}
          value={state.contact}
          onChange={onChange}
          label={"Contact:"}
          name={"contact"}
        />
        <Input
          type={"text"}
          value={state.description}
          onChange={onChange}
          label={"The complaint is regarding:"}
          name={"description"}
        />
        <Dropdown value={state.city} name={"city"} onChange={onChange} />
        <Button className="w-100" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default Complain;
