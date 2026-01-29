const Project = require('../models/Project');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Public (for now)
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        let imagePath = req.body.image || ''; // Use req.body.image as fallback

        if (req.file) {
            const filename = `project-${Date.now()}.png`;
            const uploadPath = path.join(__dirname, '../uploads', filename);

            // Ensure uploads directory exists
            if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
                fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
            }

            await sharp(req.file.buffer)
                .resize(450, 350)
                .toFormat('png')
                .toFile(uploadPath);

            imagePath = `/uploads/${filename}`;
        }

        const project = new Project({
            name,
            description,
            image: imagePath,
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    deleteProject,
};
