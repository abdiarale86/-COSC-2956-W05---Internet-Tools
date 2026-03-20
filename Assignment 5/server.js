const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const name = req.body.name.toLowerCase();
    cb(null, name + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/api/getImage", (req, res) => {
  const name = req.query.name.toLowerCase();

  let image = "default.png";

  if (name.includes("tom")) image = "tom.jpg";
  else if (name.includes("jerry")) image = "jerry.jpg";
  else if (name.includes("dog")) image = "dog.jpg";

  res.json({ image: image });
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  const name = req.body.name.toLowerCase();

  if (!["tom", "jerry", "dog"].includes(name)) {
    return res.json({ message: "Only tom, jerry, or dog are allowed." });
  }

  res.json({ message: "Image uploaded successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});