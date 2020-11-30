import { phoneReg } from "../constants/regex";

const validationFunc = (inputErr, state, setInputErr) => {
  let isError = false;
  let err = { ...inputErr };
  if (state.name.length < 5) {
    err.nameErr = "name must be greater than 5 words";
    isError = true;
  } else {
    err.nameErr = "";
  }
  if (state.details.length < 10) {
    err.descErr = "description must be greater than ten words";
    isError = true;
  } else {
    err.descErr = "";
  }
  if (!phoneReg.test(state.contact)) {
    err.contactErr = "invalid phone no";
    isError = true;
  } else {
    err.contactErr = "";
  }
  if (state?.againstName?.length < 5) {
    err.againstNameErr = "name must be greater than 5 words";
    isError = true;
  } else {
    err.againstNameErr = "";
  }
  if (state?.personName?.length < 5) {
    err.personNameErr = "name must be greater than 5 words";
    isError = true;
  } else {
    err.personNameErr = "";
  }
  setInputErr({ ...err });
  return isError;
};
export default validationFunc;
