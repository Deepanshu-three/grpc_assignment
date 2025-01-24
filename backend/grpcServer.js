import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { PROTO_FILE_PATH, PROTO_FILE_LOAD_OPTIONS, GRPC_HOST } from "./utils/config.js"
import { searchQuestions, showAllQuestions } from "./service/questionService.js"


const packageDefination = protoLoader.loadSync(PROTO_FILE_PATH, PROTO_FILE_LOAD_OPTIONS)

const packages = grpc.loadPackageDefinition(packageDefination)

const questionServices = packages.com.dvs.QuestionSearchService.service;

const server = new grpc.Server();

server.addService(questionServices, {
    SearchQuestions: searchQuestions,
    ShowAllQuestions: showAllQuestions
})

export default server;