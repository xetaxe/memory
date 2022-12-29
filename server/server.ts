import express from 'express'
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000

app.use(cors({ origin: 'http://localhost:5173/'}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', socket => {
	console.log("eieieieieieiie");
	console.log(socket.id);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})