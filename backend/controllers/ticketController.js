const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc  Get tickets
// @route api/tickets
// access private
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc  create new ticket
// @route POST api/tickets
// access private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const ticket = new Ticket({
    user: req.user.id,
    product,
    description,
  });
  res.status(200).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
