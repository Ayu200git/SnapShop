const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    default: 'general'
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  gallery: [{
    type: String
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

// Create index for better search performance
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);