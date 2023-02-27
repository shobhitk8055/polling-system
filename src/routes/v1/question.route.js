const express = require('express');
const validate = require('../../middlewares/validate');
const { createQuestion } = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router.route('/create').post(validate(createQuestion), questionController.createQuestion);

module.exports = router;
