// Validation.
const { check, validationResult } = require('express-validator');

module.exports = URLs => {
  return (req, _res, next) => {
    console.log(req.body);
    URLs.forEach(url =>
      check(url.toLowerCase())
        .optional()
        .isURL()
        .withMessage(`Invalid URL format for ${url}!`)
    );
    next();
  };
};
