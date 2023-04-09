const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const timeStamp = require('../utils/timeStamp');

// Schema to create Thought model
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
      default: Date.now,
      get: timestamp => timeStamp(timestamp) // getter method to format timestamp on query
      
    },
    userName: {
      type: String,
      required: true,
    },
    
    //Array of nested documents created with the reactionSchema
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
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
