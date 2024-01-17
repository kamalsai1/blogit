const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/dbConnection');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description:
        "A simple Express Library API",
      contact: {
        name: "kamal sai"
      }
    },
    servers: [
      {
        url: "http://localhost:5001/api"
      }
    ],
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

connectDB();
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors({
  origin: 'http://localhost:3000', // Update with the actual origin of your client
  credentials: true, // Allow credentials (cookies, in this case) to be sent with the request
}));
const port = process.env.PORT || 5001;
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

module.exports = app;