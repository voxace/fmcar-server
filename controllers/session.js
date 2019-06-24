const mongoose = require("mongoose");
const Model = require("../models");
const async = require("async");

module.exports = {

  /* ~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~ */

  /** Creates a new session and adds it to a season */
  async addSession(ctx) {

    let model = ctx.request.body.model;
    let newSession = new Model.session(model);
    console.log(model);

    let sessionResult = await newSession
      .save()
      .catch(error => {
        throw new Error(error);
      });

    let roundResult = await Model.round
      .updateOne(
        { 
          _id: model.round, 
        }, 
        {
          $addToSet: { sessions: sessionResult._id }
        }
      )
      .catch(error => {
        throw new Error(error);
      });

      if(sessionResult && roundResult.nModified > 0) { 
        console.log(sessionResult);
        ctx.body = sessionResult;
      } else { 
        throw "Error updating season";
      }
  },

  /* ~~~~~~~~~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~~~~~~~ */

  // Get all sessions
  async getAllSessions(ctx) {
    await Model.session
      .find({})
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No sessions found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get single session by ID
  async getSessionByID(ctx) {
    await Model.session
      .findOne({ _id: ctx.params.id })
      .populate('series')
      .populate('results')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Session not found"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all sessions grouped by Series
  async getSessionsGroupedBySeries(ctx) {
    let data = await Model.session
      .aggregate([
        {
          $lookup: {
            from: "series",
            localField: "series",
            foreignField: "_id",
            as: "series"
          }
        },        
        {
          $group: {
            _id: "$series",
            sessions: {
              $push: {
                _id: "$_id",
                number: "$number",
                round: "$round",
                track: "$track",
                configuration: "$configuration",
                type: "$type"
              }
            }
          }
        }
      ])
      .exec();
    ctx.body = data;    
  },

  // Get all sessions filtered by series
  async getSessionsBySeries(ctx) {
    await Model.session
      .find({ series: ctx.params.series })
      .populate('series')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No sessions found for that series"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all sessions filtered by season
  async getSessionsBySeason(ctx) {
    await Model.session
      .find({ season: ctx.params.season })
      .populate('series')
      .populate('season')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No sessions found for that season"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // Get all sessions filtered by season
  async getSessionsByRound(ctx) {
    await Model.session
      .find({ round: ctx.params.round })
      .populate('series')
      .populate('season')
      .exec()
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "No sessions found for that round"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~~~~~~~ */

  // Update all session details by ID
  async patchSessionByID(ctx) {
    await Model.session
      .findOne({ _id: ctx.params.id })
      .then(async result => {
        if(result) {        
          if(ctx.request.body.series) { result.series = ctx.request.body.series }
          if(ctx.request.body.season) { result.series = ctx.request.body.season }
          if(ctx.request.body.pointsTable) { result.pointType = ctx.request.body.pointsTable }
          if(ctx.request.body.track) { result.track = ctx.request.body.track }
          if(ctx.request.body.round) { result.round = ctx.request.body.round }
          if(ctx.request.body.number) { result.number = ctx.request.body.number }
          if(ctx.request.body.type) { result.type = ctx.request.body.type }
          if(ctx.request.body.configuration) { result.configuration = ctx.request.body.configuration }
          if(ctx.request.body.date) { result.date = ctx.request.body.date }
          await result
          .save()
          .then(newResult => {
            if(newResult) { ctx.body = newResult; }
            else { throw "Error updating session"; }
          })
        } else { 
          throw "Session not found";
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  /* ~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~ */

  // Delete session by ID
  async deleteSessionByID(ctx) {

    // Get session details
    let sessionResult = await Model.session
      .findOne({ _id: ctx.params.id })
      .catch(error => {
        throw new Error(error);
      });

    // Remove the session from the season
    await Model.season
      .updateOne({ _id: sessionResult.season }, {
        $pull: { sessions: ctx.params.session }
      })
      .catch(error => {
        throw new Error(error);
      });

    // Remove all of the results for the session
    await Model.result
      .deleteMany({ session: ctx.params.session })
      .catch(error => {
        throw new Error(error);
      });

    // Remove the session itself
    await Model.session
      .deleteOne({ _id: ctx.params.id })
      .then(result => {
        if(result.deletedCount > 0) { ctx.body = "Delete Successful"; }
        else { throw "Error deleting session"; }
      })
      .catch(error => {
        throw new Error(error);
      });
  
  },
  
};
