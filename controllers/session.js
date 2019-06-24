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
      .populate({ path: 'pointsTable', model: 'Points' })
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
      .populate({ path: 'pointsTable', model: 'Points' })
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
      .populate({ path: 'pointsTable', model: 'Points' })
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
      .findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body.model }, { new: true })
      .then(result => {
        if(result) { ctx.body = result; }
        else { throw "Error updating session"; }
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

    // Remove the session from the round
    await Model.round
      .updateOne({ _id: sessionResult.round }, {
        $pull: { sessions: ctx.params.id }
      })
      .catch(error => {
        throw new Error(error);
      });

    // Remove all of the results for the session
    await Model.result
      .deleteMany({ session: ctx.params.id })
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
        throw new Error(error);020
      });
  
  },
  
};
