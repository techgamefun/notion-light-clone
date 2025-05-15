const express = require("express");
const cors = require("cors");
const login = require("./routes/auth.route");
const notes = require("./routes/notes.route");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", login);
app.use("/api", notes);

app.listen(PORT, () => console.log("server is runnig"));
