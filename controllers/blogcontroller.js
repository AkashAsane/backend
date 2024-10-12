const Blog = require('../models/blog');

// Create a new blog
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({
        title,
        content,
        author: req.user.id,
        location: req.user.location,
    });

    try {
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get blogs by location
exports.getBlogsByLocation = async (req, res) => {
    const { location } = req.query;
    const blogs = await Blog.find({ location }).populate('author', 'username');

    res.json(blogs);
};
