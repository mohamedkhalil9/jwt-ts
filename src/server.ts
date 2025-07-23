import http from "http";
import connectDB from "./config/db.ts";
import app from "./app.ts";

const PORT = process.env.PORT;

const server = http.createServer(app);

connectDB();

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Unhandled Rejection ${error}`);
  server.close(() => {
    process.exit(1);
  });
});
