import express from 'express'
import http from 'http';
import path from 'path';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000
console.log(__dirname);

app.use(cors({ origin: 'http://localhost:5173/'}));
// app.use(express.static('../client/dist/'));

app.get('*', (req, res) => {
  res.send('Hello World!');
	// res.redirect('/');
})

io.on('connection', socket => {
	console.log("eieieieieieiie");
	console.log(socket.id);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})