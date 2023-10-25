const User = require('../models/User');

exports.getAllUsers = (req, res) => {
    // Get all users from the database
    User.find({ role: 'user' })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    // Get user by ID from the database
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    // Update user in the database
    User.findByIdAndUpdate(userId, { name, email, role }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    // Delete user from the database
    User.findByIdAndDelete(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
