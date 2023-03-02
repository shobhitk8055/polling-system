const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { optionParam } = require('../../validations/option.validation');
const optionController = require('../../controllers/option.controller');

const router = express.Router();

router.delete('/:id/delete', validate(optionParam), optionController.deleteOption);
router.get('/:id/add_vote', validate(optionParam), optionController.addVote);

module.exports = router;
