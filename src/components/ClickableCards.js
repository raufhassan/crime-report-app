import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CityCards = ({ city, complains, persons, crimes, color }) => {
  const history = useHistory();
  const HandleClick = () => {
    history.push({ pathname: `/city-report/${city}`, state: city });
  };
  return (
    <Card
      onClick={HandleClick}
      bg={color}
      text="white"
      style={{ width: "15rem" }}
    >
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <Card.Text>
          Crime reports:{crimes}
          <br></br>
          Complaints lodges:{complains}
          <br></br>
          Missing persons:{persons}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CityCards;
