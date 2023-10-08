const express = require("express");
const { UserModel } = require("../model/user.model");
const UserRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register

UserRoute.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) throw err;
      const user = new UserModel({ name, email, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New User Registered Successfully" });
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

// Login

UserRoute.post("/login",async (req, res) => {
    const { email,pass} = req.body;
    try {
        const user =await UserModel.findOne({email});
        var token = jwt.sign({ creator:user.name,creatorID:user._id }, 'todoApp');
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                if(err) throw err;
                if(result){
                    res.status(200).send({"msg":"Login Successfull.",token})
                }else{
                    res.status(200).send({"msg":"Wrong Credentials!!"})
                }
            }) 
        }else{
            res.status(200).send({"msg":"Email not found!!"})
        }
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});

module.exports = {
  UserRoute,
};
