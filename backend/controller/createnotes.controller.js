const db = require("../models/index");

const createnotesController = async (req, res) => {
  try {
    const { note, userId, isprivate } = req.body;
    const Notes = await db.Notes.create({
      note,
      userId,
      isprivate,
    });
    res.status(201).json(Notes); // Send the created note as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error creating note:", error); // Log the error for debugging
  }
};

module.exports = createnotesController;
