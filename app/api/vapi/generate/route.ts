import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare a set of questions for the following mock interview types:

1. Job interview
2. Visa mock interview
3. Visa process requirements

For the job interview:
- The job role is ${role}
- The experience level is ${level}
- The tech stack used is: ${techstack}
- The focus between behavioral and technical questions should lean towards: ${type}

For the visa mock interview and visa process:
- Include questions about purpose of travel, ties to home country, financial readiness, intended duration of stay, and understanding of visa rules.

The total number of questions required is: ${amount}

Please return only the questions, without any additional explanation or formatting characters. These questions will be read aloud by a voice assistant, so avoid using slashes, asterisks, or any symbols that could break speech rendering.

Format your response like this:
["Question 1", "Question 2", "Question 3", ...]

Thank you!
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
