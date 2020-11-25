import React from "react";
import { Form } from "react-bootstrap";
import cities from "../constants/cities";
const Dropdown = ({ value, name, onChange }) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Example select</Form.Label>
      {console.log(value)}
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => onChange(e, name)}
      >
        {cities.map((el, i) => {
          return <option key={i}> {el}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default Dropdown;
