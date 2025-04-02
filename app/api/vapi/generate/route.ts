import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {


    const { category, focus, amount, userid, type } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare interview questions for a travel advisory consultation.
            The category of the consultation is: ${category}.
            The focus should be on: ${focus} (e.g., visa applications, travel planning, cost-saving tips).
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions should be formatted like this:
            ["Question 1", "Question 2", "Question 3"]
            Thank you!`
        });

        const consultation = {
            category: category,
            focus: focus,
            questions: JSON.parse(questions),
            userId: userid,
            type: type,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("consultations").add(consultation);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}