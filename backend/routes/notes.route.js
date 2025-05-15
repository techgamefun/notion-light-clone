const express = require("express");
const jwtVerification = require("../middleware/jwtverification");
const router = express.Router();
const userNotescontroller = require("../controller/usernotes.controller");
const createnotesController = require("../controller/createnotes.controller");
const updateNotesController = require("../controller/updateNotes.controller");
const DeleteNotesController = require("../controller/deletenotes.controller");

router.get("/get/:id", jwtVerification, userNotescontroller);

router.post("/notes", jwtVerification, createnotesController);

router.put("/notes/:id", jwtVerification, updateNotesController);

router.delete("/notes/:id", jwtVerification, DeleteNotesController);

module.exports = router;
