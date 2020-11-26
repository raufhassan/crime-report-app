import React from "react";
import { Form } from "react-bootstrap";
const Input = ({ label, onChange, type, value, name, required }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        name={name}
        // onChange={(e) => onChange(e, name)}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
};

export default Input;
