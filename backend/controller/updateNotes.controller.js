const db = require("../models/index");

const updateNotesController = async (req, res) => {
  try {
    const { note, isprivate } = req.body;
    const [updatedRows] = await db.Notes.update(
      { note, isprivate }, // Update the note with the provided data
      {
        where: {
          id: req.params.id, // Use req.params.id to find the note to update
        },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Note not found" }); // Handle case where no rows were updated
    }

    const updatedNote = await db.Notes.findOne({
      where: { id: req.params.id },
    }); // Fetch the updated note
    res.status(200).json(updatedNote); // Send the updated note as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateNotesController;
