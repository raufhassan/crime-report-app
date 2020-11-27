import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    if (state.password !== state.passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(state.email, state.password);
      setLoading(false);
      history.push("/");
    } catch (err) {
      setError(err);
    }
  }
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-height">
      <div className="w-100 max-width">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            <Form onSubmit={handleSubmit}>
              <Input
                name={"email"}
                type={"email"}
                onChange={onChange}
                label={"Email"}
                value={state.email}
                required={true}
              />
              <Input
                name={"password"}
                type={"password"}
                onChange={onChange}
                label={"Password"}
                value={state.password}
                required={true}
              />
              <Input
                name={"passwordConfirm"}
                type={"password"}
                onChange={onChange}
                label={"Email"}
                value={state.passwordConfirm}
                required={true}
              />
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
