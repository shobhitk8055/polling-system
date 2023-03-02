const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token, Option, Question } = require('../models');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const createOption = async (questionId, payload) => {
  const option = await Option.create({
    question: questionId,
    content: payload.content,
  });
  await Question.findByIdAndUpdate(questionId, {
    $push: { options: option.id },
  });
  return option;
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const deleteOption = async (optionId) => {
  const option = await Option.findById(optionId);
  if (!option) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Option not found');
  }
  const questionId = option.question;
  if (option.votes > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This option can't be deleted because people have voted to this question");
  } else {
    await option.remove();
    await Question.findByIdAndUpdate(questionId, { $pull: { options: optionId } });
  }
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const addVote = async (optionId) => {
  const option = await Option.findById(optionId);
  if (!option) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Option not found!');
  }
  option.votes = option.votes + 1;
  await option.save();
  return option;
};

module.exports = {
  createOption,
  deleteOption,
  addVote,
};
