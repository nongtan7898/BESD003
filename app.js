const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const core = require("cors");
const app = express();

// ## app use ## //
app.use(core());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ## app use ## //

// ## app use router ## //
const course = require("./src/api/course/course.js");
app.use("/course", course);
// ## app use router ## //

// ## Not Found Path API ## //
app.get("*", (req, res) => {
  res.status(404).send("❌ 404 Not Found Path API ❌");
});
// ## Not Found Path API ## //

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
