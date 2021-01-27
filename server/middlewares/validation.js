import { validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(422).json({ errors: errors.array() });
  }

  return next();
}

export { validateRequest };
