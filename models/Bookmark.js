const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  // Every bookmark has an author/owner.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  // A bookmark may belong to a bookmark group.
  bookmark_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookmark_group',
  },

  // Basic info.
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  is_default: {
    type: Boolean,
    default: true,
  },
  note: String,

  // Bookmark created.
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Bookmark last updated.
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Bookmark = mongoose.model('bookmark', BookmarkSchema);
