import React from "react";
import { Card } from "react-bootstrap";
const StatsCard = ({ Title, Total, Solved }) => {
  return (
    <Card bg="primary" text="white" style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>
          {Solved}/{Total}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
