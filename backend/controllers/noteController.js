const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
const { text } = require("express");

// @desc  Get notes for ticket
// @route Get api/tickets/:id/notes
// access Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @desc  Create ticket note
// @route POST api/tickets/:ticketID/notes
// access Private
const createNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to view this ticket");
  }

  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please write a note");
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    user: req.user.id,
    isStaff: false,
  });

  res.status(200).json(note);
});

module.exports = { getNotes, createNote };
