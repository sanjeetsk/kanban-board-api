import express from 'express';
import connectDB from './src/config/db.config.js';
import bodyParser from 'body-parser';
import sectionRouter from './src/features/sections/section.routes.js';
import taskRouter from './src/features/tasks/task.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cors from "cors";

const app = express();


app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);  // Allow all origins
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // Allow cookies & authentication
}));


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/section',  sectionRouter);
app.use('/api/task', taskRouter);
app.use('/api/auth', userRouter);

// Connect to database
connectDB();

// Start server
const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Welcome to Kanban Board API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




