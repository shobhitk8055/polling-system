const httpStatus = require('http-status');
const questionService = require('./question.service');
const ApiError = require('../utils/ApiError');
const { Question } = require('../models');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const createQuestion = async (payload) => {
  return Question.create(payload);
};

module.exports = {
  createQuestion,
};
