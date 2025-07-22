import http from "http";
import app from "./app.ts";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
