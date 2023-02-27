const Joi = require('joi');

const createQuestion = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  createQuestion,
  login,
};
