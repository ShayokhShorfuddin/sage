'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { createInterviewRouteAction } from '@/app/actions/interview';
import Alice from '@/public/images/alice.png';
import Milton from '@/public/images/milton.png';

async function handleClick(
  e: React.MouseEvent<HTMLButtonElement>,
  selectedInterviewer: string,
  candidateEmail: string,
) {
  e.preventDefault();

  // Show toast and keep its id so we can dismiss it later
  const loadingId = toast.loading('Preparing interview...');

  const generatedRoute = await createInterviewRouteAction(
    selectedInterviewer,
    candidateEmail,
  );

  if (!generatedRoute.success) {
    toast.error(`Something went wrong. Error: ${generatedRoute.data.error}`, {
      id: loadingId,
    });
    return;
  }

  toast.success('Done!', { id: loadingId });

  // Give the toast a tiny moment to render, then redirect
  setTimeout(
    () => redirect(`/home/interview/${generatedRoute.data.routeId}`),
    100,
  );
}

export default function Interview({
  candidateEmail,
}: {
  candidateEmail: string;
}) {
  return (
    <section className="px-5 pb-[2rem] w-full">
      <h1 className="text-neutral-400 text-3xl md:text-4xl lg:text-5xl font-medium text-center mt-[3rem] lg:mt-[5rem]">
        Meet the interviewers
      </h1>

      <p className="text-neutral-500 text-center mt-2 font-medium text-md md:text-lg">
        Who would you prefer to conduct your interview?
      </p>

      <div className="flex flex-col xs:flex-row gap-3 max-w-lg mx-auto mt-[2rem]">
        <button
          type="button"
          name="interviewer-card"
          value="Milton Anderson"
          className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer text-left"
          onClick={(e) => handleClick(e, 'Milton Anderson', candidateEmail)}
        >
          <Image src={Milton} alt="Article image" />

          <div className="p-3">
            <p className="text-neutral-400 text-lg font-medium leading-snug">
              Milton Anderson
            </p>
            <p className="text-neutral-600 font-medium">Senior Frontend Lead</p>
            <p className="text-neutral-500 text-sm mt-2">
              Milton is a passionate frontend leader with a strong background in
              building scalable web applications and mentoring engineering
              teams.
            </p>
          </div>
        </button>

        <button
          type="button"
          name="interviewer-card"
          value="Alice Bennett"
          className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer text-left"
          onClick={(e) => handleClick(e, 'Alice Bennett', candidateEmail)}
        >
          <Image src={Alice} alt="Article image" />

          <div className="p-3">
            <p className="text-neutral-400 text-lg font-medium leading-snug">
              Alice Bennett
            </p>
            <p className="text-neutral-600 font-medium">
              Senior Frontend Engineer
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              Alice has over 8 years of experience in software development and
              is known for her expertise in frontend systems.
            </p>
          </div>
        </button>
      </div>

      <Toaster richColors />
    </section>
  );
}
