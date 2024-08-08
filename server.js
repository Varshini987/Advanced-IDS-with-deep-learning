const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Emit a test attack for demo purposes
    setInterval(() => {
        socket.emit('new_attack', {
            type: 'Sample Attack',
            timestamp: Date.now() / 1000,
            location: { place: 'Sample Location' }
        });
    }, 5000);
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(5501, () => {
    console.log('Server is listening on port 5501');
});
