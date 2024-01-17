const express = require('express');
const validateToken = require('../middleware/validateToken');
const { registerUser, loginUser, getCurrentUser, getUserbyId, logOutUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * '/api/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe 
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
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
router.route('/register').post(registerUser);


/**
 * @swagger
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johnDoe20!@
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
router.route('/login').post(loginUser);


/**
 * @swagger
 * '/api/user/currentUser':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get the current logged in user details
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/currentUser').get(validateToken, getCurrentUser);

/**
 * @swagger
 * '/api/user/logout':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: logout the current user
 *     responses:
 *      200:
 *        description: logged out Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/logout').post(logOutUser);

/**
 * @swagger
 * '/api/user/getUserbyId/:id':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get the details of user with given id
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.route('/getUserbyId/:id').get(getUserbyId);
module.exports = router;