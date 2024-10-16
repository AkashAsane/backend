const express = require('express');
const { createBlog, getBlogsByLocation } = require('../controllers/blogcontroller');
const auth = require('../middlewares/auth')
const router = express.Router();

router.post('/', auth, createBlog);
router.get('/', getBlogsByLocation);

module.exports = router;
