import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
    {
        name: "Daniel K",
        username: "@South Africa",
        body: "I subscribed to their job listings and landed a job in France within a few months. Their approach is affordable, direct, and professional. If you want to relocate, this is the best service out there!",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Emeka O",
        username: "@Nigeria",
        body: "Souhait Travel Advisors made my dream of working in Canada a reality! Their guidance on visa applications saved me a lot of money and stress. I got my visa approved without dealing with expensive middlemen. Highly recommend!",
        img: "https://cloud.appwrite.io/v1/storage/buckets/678bc03400383f991b20/files/67bbc97e0007a0da633c/view?project=678a55860032471b2331",
    },
    {
        name: "Elina Kpodo",
        username: "@Ghana",
        body: "I never thought I could apply for jobs abroad without paying an agent. Their job portal connected me with a real employer in the Netherlands. I’m now legally employed and grateful for their service.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Rita Osei",
        username: "@jane",
        body: "After trying different methods, Souhait Travel Advisors gave me the right guidance to successfully move to the US. No hidden charges, just real, honest advice that works!.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Janet Okafo",
        username: "@Nigeria",
        body: "Most travel agents overcharge and don’t explain the process well. With Souhait Travel Advisors, I knew exactly what to do. Their visa consultation saved me time and money, and I got my US visa approved!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Fatima Sule",
        username: "@Ghana",
        body: "I was skeptical at first, but Souhait Travel Advisors provided accurate job listings and visa consultation that helped me secure a work permit in Germany. Their process is transparent, and the support was amazing!",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full w-10 h-10 " width="30" height="30" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
