const { Option, Question } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Create option
 * @param {ObjectId} questionId
 * @param {Object} payload - content for the option
 * @returns {Promise<Option>} option
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
 * Deletes option
 * @param {ObjectId} optionId
 * @returns {Promise<void>} void
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
 * Add vote to an option
 * @param {ObjectId} optionId
 * @returns {Promise<Option>}
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
