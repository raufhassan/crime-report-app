import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsCard from "../../components/StatsCard";
import CityCards from "../../components/ClickableCards";

export default function Home() {
  return (
    <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
        </Card.Body>
      </Card>
      <Row className="my-5">
        <Col>
          <StatsCard Title={"Complains Resolved"} Total={50} Solved={10} />
        </Col>
        <Col>
          <StatsCard Title={"Crime Reports Closed"} Total={50} Solved={10} />
        </Col>
        <Col>
          <StatsCard Title={"Missing Person Found"} Total={50} Solved={10} />
        </Col>
      </Row>
      <h1>Citwise Reports</h1>
      <Row className="my-5">
        <Col>
          <CityCards
            city={"Karachi"}
            crimes={10}
            complains={20}
            missing={5}
            color={"primary"}
          />
        </Col>
        <Col>
          <CityCards
            city={"Sukkur"}
            crimes={10}
            complains={20}
            missing={5}
            color={"warning"}
          />
        </Col>
        <Col>
          <CityCards
            city={"Peshawar"}
            crimes={10}
            complains={20}
            missing={5}
            color={"danger"}
          />
        </Col>
        <Col>
          <CityCards
            city={"Islamabad"}
            crimes={10}
            complains={20}
            missing={5}
            color={"info"}
          />
        </Col>
      </Row>
    </Container>
  );
}
