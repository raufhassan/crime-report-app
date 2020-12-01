import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsCard from "../../components/StatsCard";
import DataTable from "../../components/DataTable";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Dropdown from "../../components/Dropdown";
import fetchReports from "../../utils/fetchReports";
const CityReport = () => {
  const [table, setTable] = useState("All");
  const history = useHistory();
  const city = history.location.state;
  const [crimes, setCrimes] = useState([]);
  const [complains, setComplains] = useState([]);
  const [missingPersons, setMissingPersons] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const types = ["complain", "crime", "missing person", "All"];
  const onChange = (e) => {
    setTable(e.target.value);
  };

  useEffect(() => {
    fetchReports("crimes", city).then((res) => {
      setCrimes(res);
    });
    fetchReports("complains", city).then((res) => {
      setComplains(res);
    });
    fetchReports("missingPersons", city).then((res) => {
      setMissingPersons(res);
    });
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{city} Report</h2>
        </Card.Body>
      </Card>
      <Row className="my-5">
        <Col>
          <StatsCard Title={"Complains Resolved"} Total={20} Solved={10} />
        </Col>
        <Col>
          <StatsCard Title={"Crime Reports Closed"} Total={10} Solved={5} />
        </Col>
        <Col>
          <StatsCard Title={"Missing Person Found"} Total={30} Solved={6} />
        </Col>
      </Row>
      <Dropdown onChange={onChange} options={types} value={table} />
    </Container>
  );
};

export default CityReport;
