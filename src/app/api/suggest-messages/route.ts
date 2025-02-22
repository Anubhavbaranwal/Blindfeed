import geminiClient from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  console.log("Message:", message);
  try {
    const prompt = `Given the message: "${message}", generate a list of three open-ended and engaging questions that are relevant to the message. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    const rawResponse = await geminiClient.generateContent(prompt);
    return NextResponse.json({ questions: rawResponse });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}