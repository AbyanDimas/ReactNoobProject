const express = require("express");
const multer = require("multer");
const path = require("path");
const Osis = require("../models/Osis");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", async (req, res) => {
  try {
    const osis = await Osis.find();
    res.json(osis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  const osis = new Osis({
    name: req.body.name,
    role: req.body.role,
    age: req.body.age,
    imageUrl: imageUrl,
  });

  try {
    const newOsis = await osis.save();
    res.status(201).json(newOsis);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const osis = await Osis.findById(req.params.id);
    if (!osis) {
      return res.status(404).json({ message: "OSIS member not found" });
    }

    osis.name = req.body.name;
    osis.role = req.body.role;
    osis.age = req.body.age;
    if (req.file) {
      osis.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedOsis = await osis.save();
    res.json(updatedOsis);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const osis = await Osis.findById(req.params.id);
    if (!osis) {
      return res.status(404).json({ message: "OSIS member not found" });
    }
    await osis.remove();
    res.json({ message: "OSIS member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
