module.exports = {
  success: "Success!",
  invalidLogin: "Invalid email or password",
  emailExists: "Email already exists!",
  invalidToken: "Invalid token.",
  created: (name) => {
    return `${name} has been created successfully!`;
  },
  notExists: (model) => {
    return `${model} does not exist!`;
  },
  notFound: "Not Found",
  registeredSuccessfully: (param) => {
    return `${param} has been registered successfully`;
  },
  signedIn: "You have been signed in successfully",
  userNotFound: "Couldn't find your Account",
  badRequest: "Bad request",
  noToken: "No auth token",
  invalidSignature: "invalid signature",
  notPresent: "Not present in the payload",
  notEmpty: "This field must not be empty!",
  invalidDataType: (val) => {
    return `Please provide valid ${val}!`;
  },
  invalidFormat: (service) => {
    return `Invalid ${service} Format`;
  },
  invalidPasswordLength: "Invalid Length!",
  invalidPayload: "Invalid payload",
};
