const db = require("../models/index");

const userNotescontroller = async (req, res) => {
  const { id } = req.params; // Destructure id from req.params
  console.log("User ID:", id); // Log the user ID for debugging

  try {
    const notes = await db.Notes.findAll({
      where: {
        userId: req.params.id, // Use req.params.id to find notes for the user
      },
    });
    res.status(200).send(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send({ message: "Error fetching notes" });
  }
};

module.exports = userNotescontroller;
