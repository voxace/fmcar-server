const config = require("./../config");
const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");
const FormData = require("form-data");
const argon2 = require('argon2');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const sendGrid = require('@sendgrid/mail');

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

async function sendEmail(to, token) {

  sendGrid.setApiKey(config.sendGrid.key);
  const hostUrl = config.baseUrl;

  const msg = {
    to: to,
    from: 'verify@fmcar.com',
    subject: 'Verify Your Email',
    text: `Click on this link to verify your email ${hostUrl}/verifiy/${token}`,
    html: `<h3>FMCAR - Email Verification</h3>
      <p><a href="${hostUrl}/verify/${token}">Click on this link to verify your email.</a></p>
      <p>Or paste the following URL into your browser: <em>${hostUrl}/verify/${token}</em></p>`,
  };
  sendGrid.send(msg);

}

module.exports = {

  // Register new user
  async register(ctx) {

    const model = ctx.request.body.model;
    const salt = crypto.randomBytes(32);
    const token = crypto.randomBytes(32);
    const passwordHashed = await argon2.hash(model.password, { salt });

    const userRecord = await Model.user
      .create({
        name: model.name,
        password: passwordHashed,
        email: model.email,
        gamertag: model.gamertag,
        salt: salt.toString('hex'),
        token: token.toString('hex')
      })
      .then(result => {
        sendEmail(result.email, result.token);
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

  // Login user
  async login(ctx) {

    const model = ctx.request.body.model;    
    const userRecord = await Model.user.findOne({ email: model.email, active: true });
    
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
  },

  // Verify email address
  async verify(ctx) { 

    await Model.user
      .updateOne({ token: ctx.request.body.token }, { 
        $unset: { "token": "" }, 
        $set: { active: true } 
      })
      .then((result) => {
        if(result && result.nModified > 0) { ctx.body = "Email successfully verified"; }
        else { throw "Error verifiying email"; }
      })
      .catch(error => {
        throw new Error(error);
      });

  }
  
};
