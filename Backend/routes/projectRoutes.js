const express = require('express');
const router = express.Router();
const { getProjects, createProject, deleteProject } = require('../controllers/projectController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getProjects)
    .post(upload.single('image'), createProject);

router.route('/:id').delete(deleteProject);

module.exports = router;
