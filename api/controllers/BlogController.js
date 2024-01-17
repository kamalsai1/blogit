const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Blogs = require('../models/BlogsModel');
const User = require('../models/userModel');

//@desc Get all blogs
//@route GET /api/blogs/getAllBlogs
//@access Public
const getAllBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await Blogs.find({});
    res.json(allBlogs);
})

//@desc Get all blogs by curent user
//@route POST /api/blogs/getBlogbyUser/:id
//@access Private
const getBlogbyUser = asyncHandler(async (req, res) => {
    try {
        // const UserPosts = User.findById({_id:req.params.id}).populate('blogsPosted');
        // console.log(UserPosts);
        const UserBlogs = await Blogs.find({ userid: req.params.id });
        res.status(200).json(UserBlogs);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

//@desc Get blog details of a given blog id
//@route GET /api/blogs/getBlogbyId/:id
//@access Public
const getBlogbyId = asyncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
        res.status(404);
        throw new Error("No blog found");
    }
    res.status(200).json(blog);
});

//@desc create a blog by curent user
//@route POST /api/blogs/createBlog/:id
//@access Private
const createBlog = asyncHandler(async (req, res) => {
    const { title, summary, content, category  } = req.body.data;
    console.log(req.body.data);
    if (!title || !content) {
        res.status(400).json({ message: 'Please fill all the fields' });
        throw new Error("Please fill all the fields");
    }
    try{
        const contentImageBuffer = req.body.data.contentImage;
        // if(ArrayBuffer.isView(new DataView(req.body.data.contentImage))){
        //     console.log("buffer");
        //     contentImageBuffer = req.body.data.contentImage;
        // }
        // else{
        //     contentImageBuffer = fs.readFileSync(req.body.data.contentImage);
        // }
        const blog = await Blogs.create({
            title: title, content: content, time: Date.now(),userid:req.params.id,summary:summary,category:category,contentImage:contentImageBuffer
        })
        await User.findByIdAndUpdate(
            req.params.id, { $push: { blogsPosted: blog._id } }
        )
        res.status(200).json(blog);
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//@desc update a blog belonging to curent user
//@route POST /api/blogs/updateBlog/:id
//@access Private
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
        res.status(400);
        throw new Error('Blog not found');
    }
    if (blog.userid != req.user.id) {
        res.status(403);
        throw new Error('Not authorized');
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(
        req.params.id, { content: req.body.data.content }
    )
    res.json(updatedBlog);
})

//@desc delete a blog by curent user
//@route POST /api/blogs/delBlog/:id
//@access Private
const delBlog = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const blog = await Blogs.findByIdAndDelete(req.params.id);
    if (!blog) {
        res.status(404);
        throw new Error("No blog found");
    }
    if (blog.userid != req.user.id) {
        res.status(403);
        throw new Error('Not authorized');
    }
    await Blogs.findByIdAndDelete(req.params.id);
    res.status(200).json(blog);
})

module.exports = { getAllBlogs, getBlogbyUser, getBlogbyId, createBlog, updateBlog, delBlog };