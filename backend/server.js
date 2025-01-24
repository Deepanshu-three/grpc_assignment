import server from "./grpcServer.js";
import { GRPC_HOST } from "./utils/config.js";
import connectDB from "./utils/dbConnect.js";
import grpc from "@grpc/grpc-js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    server.bindAsync(GRPC_HOST, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error(`Server error: ${error.message}`);
        return;
      }
      console.log(`Server running at ${GRPC_HOST}`);
     });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();