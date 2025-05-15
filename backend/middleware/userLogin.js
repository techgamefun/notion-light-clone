const { LoginSchema } = require("../middleware/schemaValidater");

module.exports = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
