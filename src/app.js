const express = require('express')
const app = express()
var morgan = require('morgan')
var exphbs = require('express-handlebars');
const path = require('path')
var route = require('./routes/index')
var dotenv = require('dotenv')
dotenv.config()

var port = process.env.PORT || 3000

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Middleware
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('combined'))

// Custom Route
route(app)

// Chat Real-time
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (data) => {
        socket.broadcast.emit('io to client', data);
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})