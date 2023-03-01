const express = require('express');
const validate = require('../../middlewares/validate');
const { createQuestion, questionParam } = require('../../validations/question.validation');
const { createOption } = require('../../validations/option.validation');
const questionController = require('../../controllers/question.controller');
const optionController = require('../../controllers/option.controller');

const router = express.Router();

router.post('/create', validate(createQuestion), questionController.createQuestion);
router.post('/:id/options/create', validate(createOption), optionController.createOption);
router.get('/:id', validate(questionParam), questionController.getQuestion);
router.delete('/:id/delete', validate(questionParam), questionController.deleteQuestion);

module.exports = router;
