const config = require("./../config");
const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");
const FormData = require("form-data");
const argon2 = require('argon2');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

function generateJWT(user) {
  const data =  {
    _id: user._id,
    name: user.name,
    email: user.email
  };
  const signature = config.jwt.key;
  const expiration = '12h';

  return jwt.sign({ data, }, signature, { expiresIn: expiration });
}

module.exports = {

  async register(ctx) {

    const model = ctx.request.body.model;
    const salt = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(model.password, { salt });

    const userRecord = await Model.user
      .create({
        name: model.name,
        password: passwordHashed,
        email: model.email,
        gamertag: model.gamertag,
        salt: salt.toString('hex'),
      })
      .then(result => {
        console.log(result);
        ctx.body = {
          name: result.name,
          email: result.email,
          gamertag: result.gamertag,
          admin: result.admin
        }
      })
      .catch(err => {
        throw err;
      });
  },


  async login(ctx) {

    const model = ctx.request.body.model;    
    const userRecord = await Model.user.findOne({ email: model.email });
    
    if (!userRecord) {
      throw new Error('User not found')
    } else {
      const correctPassword = await argon2.verify(userRecord.password, model.password);
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
    }

    ctx.body = {
      user: {
        name: userRecord.name,
        email: userRecord.email,
        gamertag: userRecord.gamertag,
        admin: userRecord.admin
      },
      token: generateJWT(userRecord),
    }
  }
  
};
