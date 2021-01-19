const { body, check } = require("express-validator");

// Requirements
const userRequirement = body("user").exists();
const idRequirement = check("user.uid").exists();

// One validator per endpoing

const getUserValidator = [userRequirement, idRequirement];
const postUserValidator = [userRequirement, idRequirement];

module.exports = {
  postUserValidator,
  getUserValidator,
};
