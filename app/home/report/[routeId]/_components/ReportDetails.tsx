import { useEffect } from "react";
import { useReward } from "react-rewards";
import ChartRadialText from "./RoundChart";

export default function ReportDetails({
  isHired,
  knowledgeScore,
  communicationScore,
  codeQualityScore,
  reasonForNoHire,
}: {
  isHired: boolean;
  knowledgeScore: number;
  communicationScore: number;
  codeQualityScore: number;
  reasonForNoHire: string;
}) {
  const { reward: confetti1 } = useReward("confetti1", "confetti", {
    lifetime: 300,
    angle: 75,
    spread: 60,
    startVelocity: 45,
  });
  const { reward: confetti2 } = useReward("confetti2", "confetti", {
    lifetime: 300,
    angle: 120,
    spread: 60,
    startVelocity: 45,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Otherwise causes continuous triggering>
  useEffect(() => {
    if (isHired) {
      confetti1();
      confetti2();
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-y-9">
      <span id="confetti1" className="absolute left-0 top-50" />
      <span id="confetti2" className="absolute right-0 top-50" />

      <div className="text-center">
        <p className="text-sm">Candidate</p>

        {isHired ? (
          <p className="text-5xl text-green-500 font-medium">Selected.</p>
        ) : (
          <p className="text-5xl text-red-500 font-medium">Rejected.</p>
        )}
      </div>

      <div className="flex items-center h-full gap-5 max-h-[150px] md:max-h-[200px] lg:max-h-[150px] flex-wrap">
        <ChartRadialText score={knowledgeScore} text="Knowledge" />
        <ChartRadialText score={communicationScore} text="Communication" />
        <ChartRadialText score={codeQualityScore} text="Code Quality" />
      </div>

      {reasonForNoHire !== "" && (
        <div className="max-w-2xl mt-6">
          <p className="font-medium text-neutral-400">Judgement</p>
          <p className="mt-2 text-neutral-500">{reasonForNoHire}</p>
        </div>
      )}
    </div>
  );
}
