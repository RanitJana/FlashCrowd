import AsyncHandler from "../utils/AsyncHandler";

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

  if (
    [!title, !description, !category, !location, !endTime].some(
      (field) => field?.trim() === ""
    )
  ) {
    res.status(400).json({
      success: false,
      message: "All fields are required...",
    });
  }

  const event = await Event.create({
    title,
    description,
    category,
    location,
    host: req.user._id,
    maxLimit: maxLimit || 1,
    startTime,
    endTime,
    paricipants: [req.user._id],
  });

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});

export { createEvent };
