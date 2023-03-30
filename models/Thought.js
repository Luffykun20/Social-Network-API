const { Schema, model } = require('mongoose');


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
    reactions: [reactionsSchema]
  },
  {
    toJSON: {
      getters: true,
      virtual: true,
    },
  }
);
userSchema.virtual('reactionCount').get(function () {
  return this.friends.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
