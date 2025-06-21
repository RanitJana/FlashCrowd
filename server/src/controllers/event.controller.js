import eventSchema from "../models/event.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const createEvent = AsyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    maxLimit,
    startTime,
    endTime,
  } = req.body;

  // Validate required fields
  if (
    [title, description, category, location, endTime].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required...",
    });
  }

  const event = await eventSchema.create({
    title,
    description,
    category,
    location,
    host: req.user._id,
    maxLimit: maxLimit || 1,
    startTime,
    endTime,
    participants: [req.user._id],
  });

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});

export { createEvent };
