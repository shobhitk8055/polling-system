const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { optionService } = require('../services');
const { Option } = require('../models');

const createOption = catchAsync(async (req, res) => {
  const option = await optionService.createOption(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(option);
});

const deleteOption = catchAsync(async (req, res) => {
  const optionId = req.params.id;
  await optionService.deleteOption(optionId);
  res.status(httpStatus.OK).send({ message: 'Option deleted successfully!' });
});

const addVote = catchAsync(async (req, res) => {
  const optionId = req.params.id;
  const option = await optionService.addVote(optionId);
  res.send({ message: 'Vote added successfully to option!', option });
});

module.exports = {
  createOption,
  deleteOption,
  addVote,
};
