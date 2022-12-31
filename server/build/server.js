"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = 3000;
console.log(__dirname);
app.use((0, cors_1.default)({ origin: 'http://localhost:5173/' }));
// app.use(express.static('../client/dist/'));
app.get('*', (req, res) => {
    res.send('Hello World!');
    // res.redirect('/');
});
io.on('connection', socket => {
    console.log("eieieieieieiie");
    console.log(socket.id);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
