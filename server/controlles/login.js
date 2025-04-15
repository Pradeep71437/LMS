const express = require("express")
const userschema = require("../models/userschema")
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
require("dotenv").config();
const { catchAsync } = require('../cmn');


const login = catchAsync(async (req, res) => {

  const { email, password } = await req.body
  if (!email || !password) {
    res.status(400).json({ message: "all filed manitory" })

  } else {
    var emailverified = await userschema.findOne({ email: email })

    if (!emailverified) {
      res.status(400).json({ email: "email invalid" })
      console.log("invalid email")
    } else {
      const comparepassword = await bcrypt.compare(password, emailverified.password)

      if (comparepassword) {
        res.status(200).json({
          token: tokens(emailverified.id),
        })
        console.log("login success")
      } else {
        console.log("login failed")
        res.status(400).json({ password: "password incorrect" })
      }
    }
  }
})

function tokens(id) {
  var token = jwt.sign({ id }, "process.env.SECRET-KEY");
  console.log(token)
  return token
}

module.exports = login