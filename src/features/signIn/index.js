import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(state.email, state.password);
      setError("");
      setLoading(false);
      history.push("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};
export default Login;
