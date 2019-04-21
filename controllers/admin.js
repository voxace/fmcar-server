const mongoose = require("mongoose");
const Admin = require("../models");
const async = require("async");
const fs = require("fs");
const path = require('path');

module.exports = {

  async post(ctx) {
    ctx.body = "POST";
  },
  async get(ctx) {
    ctx.body = "GET";
  },
  async put(ctx) {
    ctx.body = "PUT";
  },
  async delete(ctx) {
    ctx.body = "DELETE";
  },

};
