const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const LOG_DIR = path.join(__dirname, "logs");

// homepage → list log files
app.get("/", (req, res) => {
  fs.readdir(LOG_DIR, (err, files) => {
    if (err) {
      return res.render("error", { message: "Cannot read logs directory" });
    }
    // filter only .txt and .log files
    const logFiles = files.filter(
      (f) => f.endsWith(".txt") || f.endsWith(".log")
    );
    res.render("index", { files: logFiles });
  });
});

// view file → show contents
app.get("/view/:name", (req, res) => {
  const filename = req.params.name;
  const filePath = path.join(LOG_DIR, filename);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.render("error", { message: "File not found" });
      } else if (err.code === "EACCES") {
        return res.render("error", { message: "Permission denied" });
      }
      return res.render("error", { message: "Error reading file" });
    }
    res.render("view", { name: filename, content: data });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
