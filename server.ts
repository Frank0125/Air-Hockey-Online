import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

import "./envConfig";
import roomHandler from "./src/utils/roomHandler";
import { Room } from "@/interfaces/Room";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.URL ? String(process.env.URL) : "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = process.env.URL ? next({ dev, hostname }) : next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const rooms: Room[] = [];
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    roomHandler(io, socket, rooms);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}`);
    });
});