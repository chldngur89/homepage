import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import type {
  IrChartSlice,
  IrRadarPoint,
  IrVisionPoint,
} from "@/content/ir";

const executionChartConfig = {
  manual: {
    label: "수동 등록·운영",
    color: "#fb7185",
  },
  strategic: {
    label: "전략·분석",
    color: "#38bdf8",
  },
} satisfies ChartConfig;

const advantageChartConfig = {
  autocmo: {
    label: "Marketing OS",
    color: "#38bdf8",
  },
  aiTool: {
    label: "단일 AI 툴",
    color: "#a78bfa",
  },
  designTool: {
    label: "디자인 템플릿 툴",
    color: "#fb7185",
  },
} satisfies ChartConfig;

const visionChartConfig = {
  subscribers: {
    label: "유료 구독자 수",
    color: "#22d3ee",
  },
  mrr: {
    label: "MRR",
    color: "#c084fc",
  },
} satisfies ChartConfig;

function renderExecutionTooltip(slice: IrChartSlice) {
  return (
    <div className="flex w-full min-w-[12rem] items-center justify-between gap-6">
      <span className="text-slate-200">{slice.label}</span>
      <span className="font-mono text-sm font-semibold text-white">{slice.value}%</span>
    </div>
  );
}

export function ExecutionGapChart({ data }: { data: IrChartSlice[] }) {
  return (
    <ChartContainer
      config={executionChartConfig}
      className="mx-auto aspect-auto h-[22rem] max-w-[28rem]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              nameKey="segment"
              formatter={(_, __, item) =>
                renderExecutionTooltip(item.payload as IrChartSlice)
              }
            />
          }
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="segment"
          innerRadius={88}
          outerRadius={132}
          paddingAngle={2}
          isAnimationActive={false}
        >
          {data.map((slice) => (
            <Cell key={slice.segment} fill={`var(--color-${slice.segment})`} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="segment" className="!pt-8 text-slate-300" />}
        />
      </PieChart>
    </ChartContainer>
  );
}

export function AdvantageRadarChart({ data }: { data: IrRadarPoint[] }) {
  return (
    <ChartContainer
      config={advantageChartConfig}
      className="mt-8 aspect-auto h-[23rem] w-full"
    >
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(148,163,184,0.18)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Radar
          dataKey="autocmo"
          fill="var(--color-autocmo)"
          fillOpacity={0.24}
          stroke="var(--color-autocmo)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Radar
          dataKey="aiTool"
          fill="var(--color-aiTool)"
          fillOpacity={0.12}
          stroke="var(--color-aiTool)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Radar
          dataKey="designTool"
          fill="var(--color-designTool)"
          fillOpacity={0.08}
          stroke="var(--color-designTool)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <ChartLegend
          content={<ChartLegendContent className="!pt-8 text-slate-300" />}
        />
      </RadarChart>
    </ChartContainer>
  );
}

export function VisionScenarioChart({ data }: { data: IrVisionPoint[] }) {
  return (
    <ChartContainer
      config={visionChartConfig}
      className="mt-10 aspect-auto h-[24rem] w-full"
    >
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="subscribers"
          tick={{ fill: "#22d3ee", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <YAxis
          yAxisId="mrr"
          orientation="right"
          tick={{ fill: "#c084fc", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full min-w-[12rem] items-center justify-between gap-6">
                  <span className="text-slate-200">{name}</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {name === "MRR"
                      ? `${value}백만원`
                      : `${Number(value).toLocaleString()}명`}
                  </span>
                </div>
              )}
            />
          }
        />
        <Line
          yAxisId="subscribers"
          type="monotone"
          dataKey="subscribers"
          stroke="var(--color-subscribers)"
          strokeWidth={3}
          dot={{ r: 3, fill: "var(--color-subscribers)" }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line
          yAxisId="mrr"
          type="monotone"
          dataKey="mrr"
          stroke="var(--color-mrr)"
          strokeWidth={3}
          strokeDasharray="6 6"
          dot={{ r: 3, fill: "var(--color-mrr)" }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <ChartLegend
          content={<ChartLegendContent className="!pt-8 text-slate-300" />}
        />
      </LineChart>
    </ChartContainer>
  );
}
