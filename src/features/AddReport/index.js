import React from "react";
import Complain from "../../components/Complain";
import CrimeReport from "../../components/Crime";
import MissingPerson from "../../components/MissingPerson";
const AddReport = (props) => {
  let report = props.location.addProps;
  if (report === "crime") return <CrimeReport />;
  else if (report === "complain") return <Complain />;
  else if (report === "missingPerson") return <MissingPerson />;
  else {
    return <CrimeReport />;
  }
};

export default AddReport;
