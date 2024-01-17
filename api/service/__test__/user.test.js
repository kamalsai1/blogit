const { registerUser, loginUser, getCurrentUser, getUserbyId, logOutUser } = require('../../controllers/userController');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const request = require('supertest');
const app = require('../../index.js');

describe('registerUser function', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await User.deleteMany({});
    });
    it('should respond with status 200 and user details on successful registration', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'testpassword',
                name: 'testname',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        // Add more expectations based on your response structure
    });

    it('should respond with status 400 and a message when required fields are missing', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Please fill all the fields');
    });

    it('should respond with status 400 and a message when user already exists', async () => {
        const user = await User.create({
            username: 'existinguser',
            email: 'testuser@example.com',
            password: 'testpassword',
            name: 'testname',
        });
        await request(app)
            .post('/api/users/register')
            .send(user);
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'existinguser',
                email: 'testuser@example.com',
                password: 'testpassword',
                name: 'testname',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'User already Exists');
    });
});

describe('loginUser function', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });
    it('should respond with status 200 and user details on successful login', async () => {
        const hashPassword = await bcrypt.hash('testpassword', 10);
        const user1 = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: hashPassword,
            name: 'testname',
        }
        await User.create(user1);

        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }
    );
    it('should respond with status 400 and a message when required fields are missing', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Please fill all the fields');
    }
    );
    it('should respond with status 404 and a message when user does not exist', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Invalid email address or password');
    }
    );
});

describe('getUserbyId function', () => {
    beforeEach(async () => {
        // Close the database connection so that Jest can exit successfully
        await User.deleteMany({});
    });

    it('should respond with status 200 and user details when a valid user ID is provided', async () => {
        const user = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(user);

        const response = await request(app)
            .get(`/api/users/getUserbyId/${createdUser._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            username: 'testuser',
            email: 'testuser@example.com',
            name: 'testname',
            name: 'testname',
        });
    });

    it('should respond with status 404 and an error message when an invalid user ID is provided', async () => {
        const user1 = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(user1);
        const invalidUserId = createdUser._id;
        await User.deleteMany({});
        const response = await request(app)
            .get(`/api/users/getUserbyId/${invalidUserId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No user found');
    });
});

// const { getAllBlogs, getBlogbyUser, getBlogbyId, createBlog, updateBlog, delBlog } = require('./blogController');
const Blogs = require('../../models/BlogsModel.js');
describe('getAllBlogs function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and all blogs', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testUser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const testBlogs = [
            {
                title: 'testtitle1',
                summary: 'testsummary1',
                content: 'testcontent1',
                category: 'testcategory1',
                userid: createdUser._id,
            },
            {
                title: 'testtitle2',
                summary: 'testsummary2',
                content: 'testcontent2',
                category: 'testcategory2',
                userid: createdUser._id,
            }
        ]
        await Blogs.create(testBlogs);
        const response = await request(app)
            .get('/api/blogs/getAllBlogs');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('getBlogbyUser function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and all blogs of a user', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const token = jwt.sign({
            user: {
                username: createdUser.username,
                password: createdUser.password,
                id: createdUser._id,
            }
        }, process.env.JWT_SECRET, { expiresIn: "10000m" });
        const testBlogs = [
            {
                title: 'testtitle1',
                summary: 'testsummary1',
                content: 'testcontent1',
                category: 'testcategory1',
                userid: createdUser._id,
            },
            {
                title: 'testtitle2',
                summary: 'testsummary2',
                content: 'testcontent2',
                category: 'testcategory2',
                userid: createdUser._id,
            }
        ]
        await Blogs.create(testBlogs);
        const response = await request(app)
            .post(`/api/blogs/getBlogbyUser/${createdUser._id}`).send({
                token: token
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    })
})

describe('getBlogbyId function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and a blog', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const testBlog = {
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id,
        }
        const createdBlog = await Blogs.create(testBlog);
        const response = await request(app)
            .get(`/api/blogs/getBlogbyId/${createdBlog._id}`)
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id.toString(),
        });
    })
})

describe('createBlog function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and a blog', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const token = jwt.sign({
            user: {
                username: createdUser.username,
                password: createdUser.password,
                id: createdUser._id,
            }
        }, process.env.JWT_SECRET, { expiresIn: "10000m" });
        const testBlog = {
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id,
        }
        const response = await request(app)
            .post(`/api/blogs/createBlog/${createdUser._id}`)
            .send({data: testBlog, token: token});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id.toString(),
        });
    })
})

describe('updateBlog function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and a blog', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const token = jwt.sign({
            user: {
                username: createdUser.username,
                password: createdUser.password,
                id: createdUser._id,
            }
        }, process.env.JWT_SECRET, { expiresIn: "10000m" });
        const testBlog = {
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id,
        }
        const createdBlog = await Blogs.create(testBlog);
        const response = await request(app)
            .put(`/api/blogs/updateBlog/${createdBlog._id}`)
            .send({
                data: {
                    content: 'updatedcontent',
                },
                token: token,
            });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id.toString(),
        });
    })
})

describe('delBlog function', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    afterAll(async () => {
        // Close the database connection so that Jest can exit successfully
        await Blogs.deleteMany({});
        await User.deleteMany({});
    });
    it('should respond with status 200 and a blog', async () => {
        const testUser = {
            username: 'testuser',
            email: 'testuser@gmail.com',
            password: 'testpassword',
            name: 'testname',
        };
        const createdUser = await User.create(testUser);
        const token = jwt.sign({
            user: {
                username: createdUser.username,
                password: createdUser.password,
                id: createdUser._id,
            }
        }, process.env.JWT_SECRET, { expiresIn: "10000m" });
        const testBlog = {
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id,
        }
        const createdBlog = await Blogs.create(testBlog);
        const response = await request(app)
            .post(`/api/blogs/delBlog/${createdBlog._id}`).send({
                token: token,
            });
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: 'testtitle1',
            summary: 'testsummary1',
            content: 'testcontent1',
            category: 'testcategory1',
            userid: createdUser._id.toString(),
        });
    })
})