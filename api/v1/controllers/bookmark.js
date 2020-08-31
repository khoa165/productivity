// Validation.
const { validationResult } = require('express-validator');

// Link Bookmark model.
const Bookmark = require('../../../models/Bookmark');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { id, name, link, note } = req.body;

    try {
      let bookmark;

      if (id) {
        bookmark = await Bookmark.findById(id);

        if (!bookmark) {
          return res.status(404).json({
            errors: [{ msg: 'Bookmark not found!' }],
          });
        }

        // Check if bookmark belongs to current authenticated user.
        if (bookmark.author.toString() !== req.user.id) {
          return res.status(404).json({
            errors: [{ msg: 'You are not authorized to perform this action!' }],
          });
        }

        bookmark.name = name;
        bookmark.link = link;
        bookmark.note = note;
        await bookmark.save();
      } else {
        // Create new bookmark, link author and save.
        bookmark = new Bookmark({ name, link, note });
        bookmark.author = req.user.id;
        await bookmark.save();
      }

      return res.status(200).json(bookmark);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  getUserDefaultBookmarks: async (req, res, _next) => {
    try {
      // Get default bookmarks of current authenticated user.
      const bookmarks = await Bookmark.find({
        author: req.user.id,
        is_default: true,
      });

      // Check and return bookmarks array if exists.
      if (!bookmarks) {
        return res.status(404).json({
          errors: [{ msg: 'Bookmarks not found!' }],
        });
      }
      return res.status(200).json(bookmarks);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  deleteBookmark: async (req, res, _next) => {
    try {
      const bookmark = await Bookmark.findById(req.params.id);

      if (!bookmark) {
        return res.status(404).json({
          errors: [{ msg: 'Bookmarks not found!' }],
        });
      }

      // Check if bookmark belongs to current authenticated user.
      if (bookmark.author.toString() !== req.user.id) {
        return res.status(404).json({
          errors: [{ msg: 'You are not authorized to perform this action!' }],
        });
      }

      await bookmark.remove();
      return res.status(200).json({ msg: 'Bookmark removed successfully!' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
