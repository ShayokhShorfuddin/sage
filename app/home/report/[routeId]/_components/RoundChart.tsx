"use client";

import { useEffect, useRef, useState } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "#11CC00",
  },
} satisfies ChartConfig;

export default function ChartRadialText() {
  const myRef = useRef<SVGPathElement>(null);
  // const [radius, setRadius] = useState(0); // 0 → hide until measured

  // useEffect(() => {
  //   if (!wrapperRef.current) return;

  //   const ro = new ResizeObserver((entries) => {
  //     // entries[0].contentRect.width is the square side
  //     const side = entries[0].contentRect.width;
  //     console.log("Observed size:", side);
  //     setRadius(side / 2); // half = actual outer radius of the polar area
  //   });

  //   ro.observe(wrapperRef.current);
  //   console.log("Observing chart wrapper for size changes...");
  //   console.log(wrapperRef.current);

  //   return () => ro.disconnect();
  // }, []);

  // // don’t render until we know the radius
  // // if (radius === 0) return null;

  // const innerRadius = Math.round(radius * 0.5);
  // const outerRadius = Math.round(radius * 0.55);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full max-h-[150px] md:max-h-[200px] lg:max-h-[250px] aspect-square"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={319}
        innerRadius={"60%"} // tweak with these values to adjust size on smaller screens
        outerRadius={"72%"} // tweak with these values to adjust size on smaller screens
      >
        <PolarGrid
          ref={myRef}
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          // TODO: make these values dynamic based on container size
          polarRadius={[75, 64]} // tweak with these values to adjust size on smaller screens
        />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
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
                      {chartData[0].visitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
                      className="fill-muted-foreground"
                    >
                      Knowledge
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
