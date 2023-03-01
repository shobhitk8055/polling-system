const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const createQuestion = catchAsync(async (req, res) => {
  const user = await questionService.createQuestion(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const deleteQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.id;
  await questionService.deleteQuestion(questionId);
  res.status(httpStatus.OK).send({ message: "Question deleted successfully!"});
});

const getQuestion = catchAsync(async (req, res) => {
  const questionId = req.params.id;
  const result = await questionService.getQuestion(questionId);
  if(!result){
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  return res.send(result);
});

module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestion
};
