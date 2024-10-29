// models/Testimonial.js
import mongoose from 'mongoose';

var TestimonialSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  coatType: {
    type: Number,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    trim: true
  },
  testimonial: {
    type: String,
    required: true,
    trim: true
  },
  imageB64: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);