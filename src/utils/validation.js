import { phoneReg } from "../constants/regex";

const validationFunc = (inputErr, state, setInputErr) => {
  let errors = [];
  let err = { ...inputErr };
  if (state.name.length < 5) {
    err.nameErr = "name must be greater than 5 words";
    errors.push("nameErr");
  } else {
    err.nameErr = "";
  }
  if (state.details.length < 10) {
    err.descErr = "description must be greater than ten words";
    errors.push("descErr");
  } else {
    err.descErr = "";
  }
  if (!phoneReg.test(state.contact)) {
    err.contactErr = "invalid phone no";
    errors.push("phoneErr");
  } else {
    err.contactErr = "";
  }
  if (state?.againstName?.length < 5) {
    err.againstNameErr = "name must be greater than 5 words";
    errors.push("againstNameErr");
  } else {
    err.againstNameErr = "";
  }
  if (state?.personName?.length < 5) {
    err.personNameErr = "name must be greater than 5 words";
    errors.push("descErr");
  } else {
    err.personNameErr = "";
  }
  setInputErr({ ...err });
  return errors;
};
export default validationFunc;
