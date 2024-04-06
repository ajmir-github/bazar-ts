import { PORT, CLIENT_URL, PUBLIC_DIR, CORS_OPTIONS } from "@/utils/env";
import Express from "express";
import cors from "cors";
import routers from "./routers";

const server = Express();

// setup server
server.use(cors(CORS_OPTIONS));
server.use(Express.json());
server.use(Express.urlencoded({ extended: false }));
server.use(Express.static(PUBLIC_DIR));

// register routers
server.use("/api", routers);

// done
server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT} for client:${CLIENT_URL}`);
});
