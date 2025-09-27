// import { getSocket } from "@/socket/socket.io";
// import { Server } from "socket.io";
// import { createServer } from "http";

// let io: Server, httpServer: any;

// beforeAll((done) => {
//   httpServer = createServer();
//   io = new Server(httpServer);
//   httpServer.listen(() => {
//     const port = (httpServer.address() as any).port;
//     const client = getSocket(`http://localhost:${port}`);
//     client.on("connect", () => done());
//   });
// });

// afterAll(() => {
//   io.close();
//   httpServer.close();
// });

// test("socket emits and receives message", (done) => {
//   io.on("connection", (socket) => {
//     socket.on("ping", (msg) => {
//       socket.emit("pong", `Server reply to: ${msg}`);
//     });
//   });

//   const client = getSocket();
//   client.emit("ping", "hello");
//   client.on("pong", (msg: string) => {
//     expect(msg).toBe("Server reply to: hello");
//     done();
//   });
// });
