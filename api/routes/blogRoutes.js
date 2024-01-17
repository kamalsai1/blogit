const express = require('express');
const validateToken = require('../middleware/validateToken');
const {getAllBlogs, getBlogbyUser, getBlogbyId, createBlog, updateBlog, delBlog} = require('../controllers/BlogController');

const router = express.Router();

/**
 * @swagger
 * '/api/blogs/getAllBlogs':
 *  get:
 *     tags:
 *     - Blogs Fetching
 *     summary: Retrieve all the blogs from database
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/getAllBlogs').get(getAllBlogs);

/**
 * @swagger
 * '/api/blogs/getBlogbyUser/:id':
 *  get:
 *     tags:
 *     - Blogs Fetching
 *     summary: Retrieve all the blogs from database with given user id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Id of the user
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/getBlogbyUser/:id').post(validateToken, getBlogbyUser);

/**
 * @swagger
 * '/api/blogs/createBlog/:id':
 *  post:
 *     tags:
 *      - Blogs Fetching
 *     summary: Create a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id of the user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - summary
 *              - content
 *              - time
 *            properties:
 *              title:
 *                type: string
 *                default: johndoe 
 *              contentImage:
 *                type: string
 *                default: 
 *              summary:
 *                type: string
 *                default: this is a summary
 *              content:
 *               type: string
 *               default: this is a content
 *              category:
 *               type: string
 *              time:
 *               type: string
 *               default: 12:00
 *              userid:
 *               type: string
 *               ref: User
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/createBlog/:id').post(validateToken,createBlog);

/**
 * @swagger
 * '/api/blogs/updateBlog/:id':
 *  put:
 *     tags:
 *      - Blogs Fetching
 *     summary: Update a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: update blog with given blog id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - content
 *              - token
 *            properties:
 *              content:
 *               type: string
 *               default: this is a content
 *              token:
 *               type: string
 *               default:
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/updateBlog/:id').put(validateToken,updateBlog);

/**
 * @swagger
 * '/api/blogs/updateBlog/:id':
 *  post:
 *     tags:
 *      - Blogs Fetching
 *     summary: Update a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: delete blog with given blog id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - token
 *            properties:
 *              token:
 *               type: string
 *               default: 
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/delBlog/:id').post(validateToken,delBlog);

/**
 * @swagger
 * '/api/blogs/getBlogbyId/:id':
 *  get:
 *     tags:
 *     - Blogs Fetching
 *     summary: Retrieve the blogs from database with given blog id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Id of the blog
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/getBlogbyId/:id').get(getBlogbyId);

module.exports = router;