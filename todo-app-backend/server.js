const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Import routes
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

// Mount routes
app.use('/auth', authRoutes);
// Protect /tasks routes using our auth middleware:
app.use('/tasks', require('./middleware/auth'), tasksRoutes);

// Create HTTP server and setup Socket.IO
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Make Socket.IO available in routes
app.set('io', io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
