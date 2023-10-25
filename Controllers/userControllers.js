const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

exports.userRegister = (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    // Check if the email is already taken
    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "Email is already taken" });
            }

            // Hash the password and create a new user
            bcrypt.hash(password, 12)
                .then(hashedPass => {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hashedPass,
                        role: isAdmin ? 'admin' : 'user'
                    });
                    user.save()
                        .then(user => {
                            res.json({ message: "Registration successful", user: user });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: "Internal Server Error" });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

exports.userSignin = (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    // Find the user by email
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" });
            }

            // Compare passwords
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // Generate a JSON Web Token (JWT) for authentication
                        const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET);

                        // Send the token and user information in response
                        const { _id, name, email, role } = savedUser;
                        res.json({ token, user: { _id, name, email, role }, message: "login successfull" });
                    } else {
                        return res.status(422).json({ error: "Invalid email or password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};
