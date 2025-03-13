const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});

// Add virtual field id
eventSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

