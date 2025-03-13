const mongoose = require("mongoose");
const Event = require("../models/eventModel");

// Get all properties
const getAllEvents = async (req, res) => {
  
  try {
    const properties = await Event.find({ }).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  
  try {
    const newEvent = new Event({
      ...req.body,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get an event by ID
const getEventById = async (req, res) => {
  const { eventId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "No such event" });
  }
  
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      console.log("Event not found");
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "No such event" });
  }
  
  try {
    // const user_id = req.user._id;
    const event = await Event.findOneAndUpdate(
      { _id: eventId },
      { ...req.body },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete event by ID
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: "No such event" });
  }
  
  try {
    // const user_id = req.user._id;
    const event = await Event.findOneAndDelete({ _id: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
