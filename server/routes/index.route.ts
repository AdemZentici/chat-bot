import express from "express";
import { ChatController } from "../controllers/chat.controller";

const Router = express.Router();

Router.post("/api/chat", ChatController.sendMessage);

export default Router;
