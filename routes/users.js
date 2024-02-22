const express = require("express");
const router = express.Router();
const Users = require("../fake-data/Users");
const Joi = require("joi");
const userValidator = require("../modules/user-validator");
const Controller = require("../contoroller/user/user");
const controller = new Controller(Users, userValidator);
const reqHandler = require("../middleware/req-handel");

//Get all users
router.get("/", reqHandler(controller.getUsers.bind(controller)));
router.get("/:id", reqHandler(controller.getUser.bind(controller)));
router.post("/", reqHandler(controller.createUser.bind(controller)));
router.put("/:id", reqHandler(controller.updateUser.bind(controller)));
router.delete("/:id", reqHandler(controller.deleteUser.bind(controller)));

//Get all users
// router.get("/", (req, res) => {
//   res.send(Users);
// });

// //Get a user by id
// router.get("/:id", (req, res) => {
//   //Look up for the user by given id
//   const user = Users.find((u) => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).send("The user was not found");
//   res.send(user);
// });

// //Create a new user
// router.post("/", (req, res) => {
//   //Validte received data to create a new user
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.message);
//   //Create a new user with given data
//   const user = {
//     id: Users.length + 1,
//     name: req.body.name,
//   };
//   Users.push(user);
//   res.send(user);
// });

// //Edit a user
// router.put("/:id", (req, res) => {
//   //Look up for the user by given id
//   const user = Users.find((u) => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).send("The user was not found");
//   //Validate received data to update a user
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.message);
//   //Update user with sent data
//   user.name = req.body.name;
//   res.send(user);
// });

// //Delete a user
// router.delete("/:id", (req, res) => {
//   //Look up for the user by given id
//   const user = Users.find((u) => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).send("The user was not found");
//   //Delete a user
//   const index = Users.indexOf(user);
//   Users.splice(index, 1);
//   //Send deleted user to client
//   res.send(user);
// });

module.exports = router;
