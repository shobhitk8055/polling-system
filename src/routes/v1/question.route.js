const express = require('express');
const validate = require('../../middlewares/validate');
const { createQuestion } = require('../../validations/question.validation');
const { createOption } = require('../../validations/option.validation');
const questionController = require('../../controllers/question.controller');
const optionController = require('../../controllers/option.controller');

const router = express.Router();


router.route('/create').post(validate(createQuestion), questionController.createQuestion);
router.route('/:id/options/create').post(validate(createOption), optionController.createOption);

module.exports = router;
