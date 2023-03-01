const Joi = require('joi');
const { reportStatus } = require('../config/constants');
const { objectId } = require('./custom.validation');

const createOption = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const optionParam = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  })
};

const getReports = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getPatients = {
  params: Joi.object().keys({
    status: Joi.string().valid(...reportStatus),
  }),
};

module.exports = {
  createOption,
  optionParam,
  getReports,
  getPatients,
};
