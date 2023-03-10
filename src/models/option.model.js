const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const optionSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      index: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Question',
      required: true,
    },
    link_to_vote: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
optionSchema.plugin(toJSON);

/**
 * @typedef Option
 */
const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
