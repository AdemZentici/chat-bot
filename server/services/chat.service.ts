import OpenAI from "openai";
import { conversationRepository } from "../repositories/conversation.repository";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ChatService {
  static async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<{ id: string; message: string }> {
    const responses = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 200,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });
    conversationRepository.setLastResponseId(conversationId, responses.id);
    return {
      id: responses.id,
      message: responses.output_text,
    };
  }
}
