const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.post("/", requireAuth, createEvent);
router.put("/:eventId", requireAuth, updateEvent);
router.delete("/:eventId", requireAuth, deleteEvent);

module.exports = router;
