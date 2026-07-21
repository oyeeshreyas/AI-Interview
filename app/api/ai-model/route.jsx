import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const {jobPosition, jobDescription, duration, type} = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{job Title}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', type);

    console.log(FINAL_PROMPT);
    
    try {
        const openai = new OpenAI({
            baseURL: "https://api.groq.com/openai/v1",  // ✅ direct Groq URL
            apiKey: process.env.GROQ_API_KEY   // ✅ use your Groq Key
        });

        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",   // ✅ updated active Groq model
            messages: [
              { role: "user", content: FINAL_PROMPT }
            ],
        });

        return NextResponse.json(completion.choices[0].message);

    } catch (e) {
        console.error("AI Model Route Error:", e);
        return NextResponse.json(
            { error: e.message || "Failed to generate AI response" },
            { status: 500 }
        );
    }
}