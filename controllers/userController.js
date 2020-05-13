const { User, Todo } = require('../models/index');

module.exports = {
  getUserByEmail: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({ error: 'No user found' });
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  addTodo: async (req, res) => {z
    const { text } = req.body;
    if (!text) {
      return res.status(403).json({ error: 'You must provide a text '});
    }
    try {
      const newTodo = await new Todo({text, user: req.user._id}).save();
      req.user.todos.push(newTodo);
      await req.user.save();
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getUserTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user._id });
      return res.json(todos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  deleteUserTodoById: async (req, res) => {
    // grab todoId from req.params
    const { todoId } = req.params;
    try {
      // First find the todo by Id
      const todoToDelete = await Todo.findById(todoId);
      if (!todoToDelete) {
        return res.status(401).json({ error: 'No todo with that Id' });
      }
      // Check if the todo does not belong to the user.
      // if it doesnt, do not allow the user to delete it
      if (req.user._id.toString() !== todoToDelete.user.toString()) {
        return res.status(401).json({ error: "You cannot delete a todo that's not yours" });
      }
      //  otherwise, delete the todo
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      // Respond back with the deleted todo
      return res.json(deletedTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  updateTodoById: async (req, res) => {
  //   Grab todoId from params
    const { todoId } = req.params;
    //  grab text and completed from the database
    const { text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'You must provide a text '});
    }
    try {
      const todoToUpdate = await Todo.findById(todoId);
      if (!todoToUpdate) {
        return res.status(401).json({ error: 'No todo with that Id'});
      }
      if (req.user._id.toString() !== todoToUpdate.user.toString()) {
        return res.status(401).json({ error: "You cannot update a todo that's not yours" });
      }
      const updatedTodo = await Todo.findByIdAndUpdate(todoId,
        { completed, text },
        { new: true });
      return res.json(updatedTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
