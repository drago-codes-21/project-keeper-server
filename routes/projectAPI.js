const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.post("/new", async (req, res) => {
  const { title, description, price, userId, catagory, imageUrl } = req.body;
  const newProject = new Project({
    userId,
    title,
    description,
    price,
    catagory,
    imageUrl,
  });
  try {
    const project = await newProject.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId === req.body.userId) {
      await project.deleteOne();
      res.status(200).json("project has been deleted");
    } else {
      res.status(403).json("You can delete only your project");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/all/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;

// find by Id with userId
