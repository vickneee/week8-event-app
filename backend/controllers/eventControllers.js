const Event = require("../models/eventModel");
const mongoose = require("mongoose");

//GET / events;
const getAllEvents = async (req, res) => {
  res.send("getAllEvents");
};

// POST /events
const createEvent = async (req, res) => {
  res.send("createEvent");
};

// GET /events/:eventId
const getEventById = async (req, res) => {
  res.send("getEventById");
};

// PUT /events/:eventId
const updateEvent = async (req, res) => {
  res.send("updateEvent");
};

// DELETE /events/:eventId
const deleteEvent = async (req, res) => {
  res.send("deleteEvent");
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
