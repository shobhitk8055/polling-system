const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { optionService } = require('../services');

const createOption = catchAsync(async (req, res) => {
  const option = await optionService.createOption(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(option);
});

const deleteOption = catchAsync(async (req, res) => {
  const optionId = req.params.id;
  await optionService.deleteOption(optionId);
  res.status(httpStatus.OK).send({ message: "Option deleted successfully!"});
});

const getReports = catchAsync(async (req, res) => {
  const patientId = req.params.id;
  const result = await userService.queryReports(patientId);
  res.send(result);
});

const getPatients = catchAsync(async (req, res) => {
  const status = req.params.status;
  const result = await userService.getPatientsFromStatus(status);
  res.send(result);
});

module.exports = {
  createOption,
  deleteOption,
  getReports,
  getPatients
};
