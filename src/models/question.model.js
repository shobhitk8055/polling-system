const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { QuestionStatus } = require('../config/constants');

const questionSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      index: true,
    },
    options: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question',
      },
    ],
  },

  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
