import express from 'express'
import http from 'http';
import path from 'path';
import { Server } from "socket.io";
import cors from 'cors';
import generateRoomCode from './utils/generateRoomCode';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { path: "/online", transports: ['websocket']});
// const io = new Server(server);

const PORT = 3000;

// app.use(cors({ origin: 'http://localhost:5173/'}));
app.use(cors());
// app.use(express.static('../client/dist/'));

app.get('/', (req, res) => {
  res.send('Hello World!');
	// res.redirect('/');
})

app.get('/createroom', (req, res) => {
	let newRoomCode = generateRoomCode();
	res.json({code: newRoomCode});
})

app.get('*', (req, res) => {
  res.send('Hello World!');
	res.redirect('/');
})


io.on('connection', socket => {
	socket.on("connect_error", (err) => {
		console.log(`connect_error due to ${err.message}`);
	});
	console.log("New user connected: " + socket.id);
	socket.on('disconnect', () => {
    console.log("User disconnected: " + socket.id );
  });
})

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})