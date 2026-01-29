const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');

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
        let imagePath = req.body.image || '';

        console.log('Creating project, file received:', req.file ? 'Yes' : 'No');

        if (req.file) {
            try {
                console.log('Uploading to Cloudinary...');
                // Upload to Cloudinary
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'flipr-task/projects',
                            transformation: [{ width: 450, height: 350, crop: 'fill' }],
                        },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary callback error:', error);
                                reject(error);
                            } else {
                                console.log('Cloudinary upload success:', result.secure_url);
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(req.file.buffer);
                });
                imagePath = result.secure_url;
                console.log('Image path set to:', imagePath);
            } catch (cloudinaryError) {
                console.error('Cloudinary upload failed:', cloudinaryError.message);
                return res.status(500).json({ message: 'Image upload failed: ' + cloudinaryError.message });
            }
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
