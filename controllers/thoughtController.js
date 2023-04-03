const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID' })
          : res.json({
            thought
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from their user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this id' })
          : User.findOneAndUpdate(
            { thoughts: req.parms.thoughtId },
            { $pull: { thoughts: req.parms.thoughtId } },
            { new: true }
          )
      )
      .then((thought) =>
      !thought
      ? res.status(404).json({
        message: 'Thought deleted, but no user found!'
      })
      : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with this ID ' })
          : res.json([thought,{ message: 'Reaction sucesfully added'}])
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with this ID ' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
