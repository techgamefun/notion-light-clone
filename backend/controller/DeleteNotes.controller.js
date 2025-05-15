const db = require("../models/index");

const DeleteNotesController = async (req, res) => {
  try {
    const deletedNote = await db.Notes.destroy({
      where: {
        id: req.params.id, // Use req.params.id to find the note to delete
      },
    });

    if (deletedNote) {
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = DeleteNotesController;
