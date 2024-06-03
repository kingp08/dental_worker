//start validations
export const isFloat = (value: string): boolean =>
  value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) !== null;

export const isNumber = (value: string): boolean => value.match(/^[0-9\b]+$/) !== null;

export const isEmpty = (str: string): boolean => {
  return Boolean(str === undefined || str === null || str.trim() === "");
};

export const isCharacters = (value: string): boolean => value.match(/^[A-Za-z ]+$/) !== null;

export const isValidEmail = (value: string): boolean => {
  return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const isDecimal = (value: string): boolean => {
  const patt = /^\d+\.{0,1}\d{0,9}$/;
  return patt.test(value);
};

//for valid password will return true
export const isValidPassword = (value: string): boolean =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[1-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(value);

export const inValidPasswordString: string = "Enter strong password with mix of uppercase, lowercase, number, min length 6, & symbol.";

//end validations