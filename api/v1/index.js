const express = require("express");
const notesRouter = express.Router();

const mongoose = require("mongoose");
const NoteModel = require("../../db/models/note.model");

// notes (/notes)
/**
 * Get All Notes
 */
notesRouter.get("/", (request, response) => {
  NoteModel.find({}, (err, notes) => {
    if (err) return console.error(err);
    console.log(notes);

    response.json({
      notes,
    });
  });
});

/**
 * Add a new note
 */
notesRouter.post("/", (request, response) => {
  console.log(request.body);
  const newNote = new NoteModel(request.body);
  newNote.save().then((savedNote) => {
    response.json({
      note: savedNote,
      success: true,
    });
  });
});

/**
 * Get a note by ID
 */
notesRouter.get("/:id", (request, response) => {
  const noteId = request.params.id;
  NoteModel.findById(noteId, (err, note) => {
    if (err) return console.error(err);
    if (!note) {
      return response.status(404).json({
        message: "note not found",
      });
    }
    response.json({
      reply: "note by id success",
      note,
    });
  });
});

/**
 * Delete a note by ID
 */
notesRouter.delete("/:id", (request, response) => {
  const noteId = request.params.id;
  NoteModel.findByIdAndRemove(noteId, (err, deletedNote) => {
    if (err) return console.error(err);
    if (!deletedNote) {
      return response.status(404).json({
        reply: "note not found for deletion",
      });
    }
    response.json({
      reply: "note deletion by id complete",
    });
  });
});

/**
 * Update a note by ID
 */
notesRouter.put("/:id", (request, response) => {
  const noteId = request.params.id;
  const updatedBody = request.body;
  NoteModel.findOneAndUpdate(
    noteId,
    updatedBody,
    { new: true },
    (err, updatedNote) => {
      if (err) return console.error(err);
      if (!updatedNote) {
        return response.status(404).json({
          reply: "note not found for updating",
        });
      }
      response.json({
        reply: "note update by id complete",
        note: updatedNote,
      });
    }
  );
});

notesRouter.get("/dummy", (request, response) => {
  response.json({
    text: "dummy",
  });
});

module.exports = {
  notesRouter,
};
