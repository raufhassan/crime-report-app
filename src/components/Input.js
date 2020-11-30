import React from "react";
import { Form } from "react-bootstrap";
const Input = ({ label, onChange, type, value, name, required, error }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
      />
      {error ? <span className="error">{error}</span> : null}
    </Form.Group>
  );
};

export default Input;
