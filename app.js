const express = require('express')
const app = express();

//socket.io setup
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

// ejs setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", {
            id: socket.id,
            ...data
        });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
})

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is run on 3000');
})