import ChartRadialText from "./RoundChart";

export default function ReportDetails() {
  return (
    <>
      <div className="flex justify-center mt-10 h-full max-h-[150px] md:max-h-[200px] lg:max-h-[250px] flex-wrap">
        <ChartRadialText />
        <ChartRadialText />
        <ChartRadialText />
      </div>
    </>
  );
}
