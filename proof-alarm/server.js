const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post("/verify", upload.single("image"), (req, res) => {

    // DEMO VERIFICATION

    const requiredObject = req.body.object;

    // Later AI recognition will happen here

    res.json({
        success: true,
        detected: requiredObject
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});