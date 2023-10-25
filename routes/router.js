const express = require("express");
const router = new express.Router();
const taskControllers = require("../Controllers/taskControllers.js");
const adminController = require('../Controllers/adminControllers.js');
const userControllers = require('../Controllers/userControllers.js');

// middleware
const requireLogin = require('../middleware/requireLogin.js')


// user
router.post('/user/register', userControllers.userRegister);
router.post('/user/signin', userControllers.userSignin);

// admin
router.get('/admin/get', adminController.getAllUsers);
router.get('/admin/get/:id', adminController.getUserById);
router.put('/admin/update/:id', adminController.updateUser);
router.delete('/admin/delete/:id', adminController.deleteUser);



// routes
router.post("/task/create", requireLogin, taskControllers.taskCreate);
router.put("/task/update/:id", requireLogin, taskControllers.taskUpdate);
router.get("/task/get/", requireLogin, taskControllers.taskGet);
router.delete("/task/delete/:id", requireLogin, taskControllers.taskDelete);
router.get("/task/get/:userId", taskControllers.taskGetOnView);

// Use PUT request for updating a task
router.put("/task/update/:userId/:id", taskControllers.taskUpdateOnView);

// Use DELETE request for deleting a task
router.delete("/task/delete/:userId/:id", taskControllers.taskDeleteOnView);

module.exports = router