const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(100).required(),
  uid: Joi.number().min(100000000).max(999999999).required(),
}).with("name", "uid");

module.exports = {
  validate(store) {
    return schema.validate(store);
  },
};
