import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import Interview1 from "@/public/images/interview1.webp";
import Interview2 from "@/public/images/interview2.webp";
import Interview3 from "@/public/images/interview3.webp";

type ArticleProps = {
  image: StaticImageData;
  title: string;
  author: string;
  href: string;
};

const articlesData: ArticleProps[] = [
  {
    image: Interview1,
    title: "Freshers guide to prepare for technical interviews.",
    author: "Neel Vikmani",
    href: "https://medium.com/swlh/how-to-prepare-for-campus-interviews-and-my-lessons-from-tech-interviews-7afa53c861a2",
  },
  {
    image: Interview2,
    title: "The Tech Interview Cheatsheet. The  Do's and Don'ts.",
    author: "Yangshun Tay",
    href: "https://medium.com/hackernoon/the-tech-interview-cheatsheet-8e28d94f5f04",
  },
  {
    image: Interview3,
    title: "Tips for Tech Job Interview Preparation And Beyond.",
    author: "Matthew Bill",
    href: "https://matthewdbill.medium.com/tips-for-tech-job-interview-preparation-760c8b44ef22",
  },
];

export default function Home() {
  return (
    <section className="mx-5 w-full">
      <h1 className="text-neutral-400 text-3xl md:text-4xl lg:text-5xl font-medium text-center mt-[3rem] lg:mt-[5rem]">
        <Greeting />
      </h1>

      <p className="text-neutral-500 text-center mt-2 font-medium text-md md:text-lg">
        Let's get started with today's preparation and interviews.
      </p>

      <PopularArticles />
    </section>
  );
}

function PopularArticles() {
  return (
    <section className="mt-[2rem] sm:mt-[3rem] max-w-5xl mx-auto">
      <p className="text-neutral-500">Popular articles</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
        {articlesData.map((article) => (
          <ArticleCard key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({ image, title, author, href }: ArticleProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer h-full">
        <Image src={image} alt="Article image" />

        <div className="p-3">
          <p className="text-neutral-400 text-md xs:text-lg font-medium leading-snug">
            {title}
          </p>
          <p className="text-neutral-500 font-medium mt-1 text-sm xs:text-md">
            {author}
          </p>
        </div>
      </div>
    </Link>
  );
}

async function Greeting() {
  const session = await auth();
  const userName = session?.user?.name || "Guest";

  // Take only the first part of their name
  const firstName = userName.split(" ")[0];

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  // Convert time ranges to minutes for easier comparison
  const morningStart = 5 * 60; // 5:00 AM
  const morningEnd = 12 * 60; // 12:00 PM
  const afternoonEnd = 17 * 60; // 5:00 PM
  const eveningEnd = 23 * 60; // 11:00 PM

  if (totalMinutes >= morningStart && totalMinutes <= morningEnd) {
    return `Good morning, ${firstName}`;
  } else if (totalMinutes >= morningEnd + 1 && totalMinutes <= afternoonEnd) {
    return `Good afternoon, ${firstName}`;
  } else if (totalMinutes >= afternoonEnd + 1 && totalMinutes <= eveningEnd) {
    return `Good evening, ${firstName}`;
  } else {
    return "Still awake?";
  }
}
