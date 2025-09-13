"use client";

import { useEffect, useState } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

export default function ChartRadialText({
  score,
  text,
}: {
  score: number;
  text: "Knowledge" | "Communication" | "Code Quality";
}) {
  const chartData = [
    {
      category: text,
      score: 200,
      fill: score > 8 ? "#11CC00" : score > 5 ? "#ffff00" : "#ff0000",
    },
  ];

  const chartConfig = {} satisfies ChartConfig;

  const [radii, setRadii] = useState({
    innerRadius: 0,
    outerRadius: 0,
    polarRadius: [0, 0],
  });

  useEffect(() => {
    function updateRadii() {
      const width = window.innerWidth;

      if (width < 768) {
        setRadii({ innerRadius: 50, outerRadius: 60, polarRadius: [60, 50] });
      } else if (width < 1024) {
        setRadii({ innerRadius: 65, outerRadius: 75, polarRadius: [75, 65] });
      } else {
        setRadii({ innerRadius: 70, outerRadius: 80, polarRadius: [80, 70] });
      }
    }

    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="h-[10rem] aspect-square">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={score * 36}
        innerRadius={radii.innerRadius}
        outerRadius={radii.outerRadius}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={radii.polarRadius}
        />
        <RadialBar dataKey="score" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 5}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {score}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
                      className="fill-muted-foreground"
                    >
                      {text}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
