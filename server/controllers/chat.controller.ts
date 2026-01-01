import type { Request, Response } from "express";
import * as z from "zod";
import { ChatService } from "../services/chat.service";

const chatSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required.")
    .max(1000, "Prompt is too long."),
  conversationId: z.uuid(),
});

export class ChatController {
  static async sendMessage(req: Request, res: Response) {
    const parseResult = chatSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
    }
    const { prompt, conversationId } = req.body;
    const response = await ChatService.sendMessage(prompt, conversationId);
    res.json({ message: response.message });
  }
}
