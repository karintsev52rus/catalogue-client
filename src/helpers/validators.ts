type validatorInputType = (value: string) => boolean;

const validatePhone: validatorInputType = (phone: string): boolean => {
  if (
    (phone.length === 11 && phone[0] === "8" && phone[1] === "9") ||
    (phone.length === 12 &&
      phone[0] === "+" &&
      phone[1] === "7" &&
      phone[2] === "9")
  ) {
    return true;
  } else {
    return false;
  }
};

const validateEmail = (email: string) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return true;
  } else {
    return false;
  }
};

const validateCustName = (name: string) => {
  if (name.length > 0) {
    return true;
  } else return false;
};

export { validatePhone, validateEmail, validateCustName, validatorInputType };
