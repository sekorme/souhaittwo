import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";
interface Interview {
    id: string;
    role: string;
    level: string;
    questions: string[];
    techstack: string[];
    createdAt: string;
    userId: string;
    type: string;
    finalized: boolean;
}

export const mappings = {
    "react.js": "react",
    reactjs: "react",
    react: "react",
    "next.js": "nextjs",
    nextjs: "nextjs",
    next: "nextjs",
    "vue.js": "vuejs",
    vuejs: "vuejs",
    vue: "vuejs",
    "express.js": "express",
    expressjs: "express",
    express: "express",
    "node.js": "nodejs",
    nodejs: "nodejs",
    node: "nodejs",
    mongodb: "mongodb",
    mongo: "mongodb",
    mongoose: "mongoose",
    mysql: "mysql",
    postgresql: "postgresql",
    sqlite: "sqlite",
    firebase: "firebase",
    docker: "docker",
    kubernetes: "kubernetes",
    aws: "aws",
    azure: "azure",
    gcp: "gcp",
    digitalocean: "digitalocean",
    heroku: "heroku",
    photoshop: "photoshop",
    "adobe photoshop": "photoshop",
    html5: "html5",
    html: "html5",
    css3: "css3",
    css: "css3",
    sass: "sass",
    scss: "sass",
    less: "less",
    tailwindcss: "tailwindcss",
    tailwind: "tailwindcss",
    bootstrap: "bootstrap",
    jquery: "jquery",
    typescript: "typescript",
    ts: "typescript",
    javascript: "javascript",
    js: "javascript",
    "angular.js": "angular",
    angularjs: "angular",
    angular: "angular",
    "ember.js": "ember",
    emberjs: "ember",
    ember: "ember",
    "backbone.js": "backbone",
    backbonejs: "backbone",
    backbone: "backbone",
    nestjs: "nestjs",
    graphql: "graphql",
    "graph ql": "graphql",
    apollo: "apollo",
    webpack: "webpack",
    babel: "babel",
    "rollup.js": "rollup",
    rollupjs: "rollup",
    rollup: "rollup",
    "parcel.js": "parcel",
    parceljs: "parcel",
    npm: "npm",
    yarn: "yarn",
    git: "git",
    github: "github",
    gitlab: "gitlab",
    bitbucket: "bitbucket",
    figma: "figma",
    prisma: "prisma",
    redux: "redux",
    flux: "flux",
    redis: "redis",
    selenium: "selenium",
    cypress: "cypress",
    jest: "jest",
    mocha: "mocha",
    chai: "chai",
    karma: "karma",
    vuex: "vuex",
    "nuxt.js": "nuxt",
    nuxtjs: "nuxt",
    nuxt: "nuxt",
    strapi: "strapi",
    wordpress: "wordpress",
    contentful: "contentful",
    netlify: "netlify",
    vercel: "vercel",
    "aws amplify": "amplify",
};

function getRandomFirstMessage(): string {
    const messages = [
        "Hello! I'm here to help you prepare for your next interview. Let me know when you are ready",
        "Hi there! I appreciate you joining me today. Ready when you are.",
        "Good day! Are you ready for your interview ?",
        "Welcome! Thank you for taking the time to speak with me today. Shall we begin?",
        "Hi! It's great to meet you. Let's get started."
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}
// @ts-ignore
// @ts-ignore
export const interviewer: CreateAssistantDTO = {
    // @ts-ignore
    clientMessages: [], serverMessages: [],
    name: "Interviewer",
    firstMessage: getRandomFirstMessage(),
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
            },
        ],
    }
};

export const feedbackSchema = z.object({
    totalScore: z.number(),
    categoryScores: z.tuple([
        z.object({
            name: z.literal("Communication Skills"),
            score: z.number(),
            comment: z.string(),
        }),
        z.object({
            name: z.literal("Technical Knowledge"),
            score: z.number(),
            comment: z.string(),
        }),
        z.object({
            name: z.literal("Problem Solving"),
            score: z.number(),
            comment: z.string(),
        }),
        z.object({
            name: z.literal("Cultural Fit"),
            score: z.number(),
            comment: z.string(),
        }),
        z.object({
            name: z.literal("Confidence and Clarity"),
            score: z.number(),
            comment: z.string(),
        }),
    ]),
    strengths: z.array(z.string()),
    areasForImprovement: z.array(z.string()),
    finalAssessment: z.string(),
});

export const interviewCovers = [
    "/adobe.png",
    "/amazon.png",
    "/facebook.png",
    "/hostinger.png",
    "/pinterest.png",
    "/quora.png",
    "/reddit.png",
    "/skype.png",
    "/spotify.png",
    "/telegram.png",
    "/tiktok.png",
    "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
    {
        id: "1",
        userId: "user1",
        role: "Frontend Developer",
        type: "Technical",
        techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        level: "Junior",
        questions: ["What is React?"],
        finalized: false,
        createdAt: "2024-03-15T10:00:00Z",
    },
    {
        id: "2",
        userId: "user1",
        role: "Full Stack Developer",
        type: "Mixed",
        techstack: ["Node.js", "Express", "MongoDB", "React"],
        level: "Senior",
        questions: ["What is Node.js?"],
        finalized: false,
        createdAt: "2024-03-14T15:30:00Z",
    },
];



export const navItems = [
    {
        name: "File-Dashboard",
        icon: "/assets/icons/dashboard.svg",
        url: "/files",
    },
    {
        name: "Documents",
        icon: "/assets/icons/documents.svg",
        url: "/files/documents",
    },
    {
        name: "Images",
        icon: "/assets/icons/images.svg",
        url: "/files/images",
    },
    {
        name: "Media",
        icon: "/assets/icons/video.svg",
        url: "/files/media",
    },
    {
        name: "Others",
        icon: "/assets/icons/others.svg",
        url: "/files/others",
    },
];

export const actionsDropdownItems = [
    {
        label: "Rename",
        icon: "/assets/icons/edit.svg",
        value: "rename",
    },
    {
        label: "Details",
        icon: "/assets/icons/info.svg",
        value: "details",
    },
    {
        label: "Share",
        icon: "/assets/icons/share.svg",
        value: "share",
    },
    {
        label: "Download",
        icon: "/assets/icons/download.svg",
        value: "download",
    },
    {
        label: "Delete",
        icon: "/assets/icons/delete.svg",
        value: "delete",
    },
];

export const sortTypes = [
    {
        label: "Date created (newest)",
        value: "$createdAt-desc",
    },
    {
        label: "Created Date (oldest)",
        value: "$createdAt-asc",
    },
    {
        label: "Name (A-Z)",
        value: "name-asc",
    },
    {
        label: "Name (Z-A)",
        value: "name-desc",
    },
    {
        label: "Size (Highest)",
        value: "size-desc",
    },
    {
        label: "Size (Lowest)",
        value: "size-asc",
    },
];

export const avatarPlaceholderUrl = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
