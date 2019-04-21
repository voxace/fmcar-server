const mongoose = require("mongoose");
const Admin = require("../models");
const async = require("async");
const FormData = require("form-data");

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
