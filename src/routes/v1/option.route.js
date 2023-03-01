const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { optionParam } = require('../../validations/option.validation');
const optionController = require('../../controllers/option.controller');

const router = express.Router();

router.delete('/:id/delete', validate(optionParam), optionController.deleteOption);
// router.post('/:id/create_report', auth(), validate(createReport), patientController.createReport);
// router.get('/:id/all_reports', auth(), validate(getReports), patientController.getReports);

module.exports = router;
