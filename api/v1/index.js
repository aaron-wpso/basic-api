const express = require("express");
const notesRouter = express.Router();

const mongoose = require("mongoose");
const Note = require("../../db/models/note.model");

// notes (/notes)
/**
 * Get All Notes
 */
notesRouter.get("/", (request, response) => {
  Note.find({}, (err, notes) => {
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
  const newNote = new Note(request.body);
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
  response.json({
    text: "note by id success",
  });
});

/**
 * Delete a note by ID
 */
notesRouter.delete("/:id", (request, response) => {
  response.json({
    text: "note deletion success",
  });
});

notesRouter.get("/dummy", (request, response) => {
  response.json({
    text: "dummy",
  });
});

module.exports = {
  notesRouter,
};
