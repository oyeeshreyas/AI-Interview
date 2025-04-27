import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    

    const {conversation}=await req.json();
    const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))
    try {
            const openai = new OpenAI({
                baseURL: "https://api.groq.com/openai/v1",  // ✅ direct Groq URL
                apiKey: process.env.GROQ_API_KEY   // ✅ use your Groq Key
            });
    
            const completion = await openai.chat.completions.create({
                model: "llama3-8b-8192",   // ✅ correct model
                messages: [
                  { role: "user", content: FINAL_PROMPT }
                ],
                
            });
    
            
            return NextResponse.json(completion.choices[0].message);
    
        } catch (e) {
            console.log(e);
            return NextResponse.json(e);
        }
}