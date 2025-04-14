import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";
export const dynamic = "force-dynamic";
export const maxDuration = 30;
// import { createOpenAI } from "@ai-sdk/openai";

// if u wanna use Groq or OpenAI, you can use the following code
// const groq = createOpenAI({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: google("gemini-1.5-pro-latest"),
    system:
      "You are the best coder and code generator. you take the code and give the converted code in the perfect format with some bit of explanations. you will reject everything except codes.",
    prompt: context,
    schemaDescription: "Code and its explanation",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  return result.toTextStreamResponse();
}
