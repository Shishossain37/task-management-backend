
const dotenv = require("dotenv");
dotenv.config()
const Task = require('../models/Task')


// Task create
exports.taskCreate = async (req, res) => {
    const { text, completed } = req.body;
    const userId = req.user.id;
    try {
        const newTask = new Task({ text, completed, userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid data provided', error });
    }
}

// Task get
exports.taskGet = async (req, res) => {

    try {
        const response = await Task.find({ userId: req.user._id });

        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid data provided', error });
    }
}

// Task update
exports.taskUpdate = async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const userId = req.user._id; // Assuming the user information is available in req.user after authentication

    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: id, userId }, { text, completed }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Task Delete
exports.taskDelete = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Assuming the user information is available in req.user after authentication

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.taskGetOnView = async (req, res) => {
    try {
        const response = await Task.find({ userId: req.params.userId });
        res.status(200).json(response); // Use 200 status code for successful response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.taskUpdateOnView = async (req, res) => {
    const { id, userId } = req.params; // Destructure id and userId from params
    const { text, completed } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: id, userId: userId }, { text, completed }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.status(200).json(updatedTask); // Use 200 status code for successful response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.taskDeleteOnView = async (req, res) => {
    const { id, userId } = req.params; // Destructure id and userId from params

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: userId });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.status(200).json(deletedTask); // Use 200 status code for successful response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



