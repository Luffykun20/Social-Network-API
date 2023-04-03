const { Schema, model } = require('mongoose');
 const reactionSchema = require('./Reaction');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280 
    },
    createAt: {
      type: Date,
      default: Date.now
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);
thoughtSchema.virtual('reactionCount').get(function () {
  return this.friends.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
