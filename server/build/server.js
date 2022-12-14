"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const generateRoomCode_1 = __importDefault(require("./utils/generateRoomCode"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { path: "/online", transports: ['websocket'] });
// const io = new Server(server);
const PORT = 3000;
// app.use(cors({ origin: 'http://localhost:5173/'}));
app.use((0, cors_1.default)());
// app.use(express.static('../client/dist/'));
app.get('/', (req, res) => {
    res.send('Hello World!');
    // res.redirect('/');
});
app.get('/createroom', (req, res) => {
    let newRoomCode = (0, generateRoomCode_1.default)();
    res.json({ code: newRoomCode });
});
app.get('*', (req, res) => {
    res.send('Hello World!');
    res.redirect('/');
});
io.on('connection', socket => {
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    console.log("New user connected: " + socket.id);
    socket.on('disconnect', () => {
        console.log("User disconnected: " + socket.id);
    });
});
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
