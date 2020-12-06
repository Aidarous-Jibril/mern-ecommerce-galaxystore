import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

//Custom Error handle fucntion
const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  //error code 11000 for unique email
  if (err.code === 11000) {
    errors.email = "That email is already taken";
    return errors;
  }
  //error validation
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  return errors;
};

export { createToken, handleErrors };
