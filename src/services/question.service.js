const httpStatus = require('http-status');
const questionService = require('./question.service');
const ApiError = require('../utils/ApiError');
const { Question, Option } = require('../models');

/**
 * Create question
 * @param {object} payload - question content
 * @returns {Promise<Option>}
 */
const createQuestion = async (payload) => {
  return Question.create(payload);
};

/**
 * Deletes question
 * @param {ObjectId} questionId
 * @returns {Promise<void>}
 */
const deleteQuestion = async (questionId) => {
  const question = await getQuestion(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  if (question.options.length > 0 && question.options.some((i) => i.votes > 0)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This question can't be deleted because people have voted to this question");
  }
  await Option.deleteMany({ question: questionId });
  return Question.findByIdAndDelete(questionId);
};

/**
 * Gets question along with the answers
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */
const getQuestion = async (questionId) => {
  const question = await Question.findById(questionId).populate('options');
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  question.options.forEach(i => {
    i.link_to_vote = `${process.env.BACKEND}/option/${i.id}/add_vote`;
  })
  return question;
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestion,
};
