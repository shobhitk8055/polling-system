const httpStatus = require('http-status');
const questionService = require('./question.service');
const ApiError = require('../utils/ApiError');
const { Question, Option } = require('../models');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const createQuestion = async (payload) => {
  return Question.create(payload);
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const deleteQuestion = async (questionId) => {
  const question = await getQuestion(questionId);
  if (question.options.some((i) => i.votes > 0)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This question can't be deleted because people have voted to this question");
  } else {
    await Option.deleteMany({ question: questionId });
    return Question.findByIdAndDelete(questionId);
  }
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const getQuestion = async (questionId) => {
  const question = await Question.findById(questionId).populate('options');
  return question;
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestion,
};
