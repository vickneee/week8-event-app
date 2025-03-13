const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  date_of_birth: { type: Date, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  occupation: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
}, { timestamps: true, versionKey: false });

// Add virtual field id
userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = model('User', userSchema);
