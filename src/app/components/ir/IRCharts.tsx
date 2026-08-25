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
} from "@/content/ko/ir";

/**
 * 색 배정(계획 4 Task 2). 브랜드 토큰(src/styles/theme.css, tokens.ts)의
 * --color-chart-1~4 는 4개뿐이라 7개 시리즈가 차트별로 재사용한다 — 같은
 * 화면에 동시에 나오지 않는 시리즈끼리만 겹친다.
 *
 *   chart-1 (가장 밝음, 호박색 계열) — strategic, subscribers  ("우리팀이 만드는 결과" 계열)
 *   chart-2 (벽돌색 계열)          — manual, designTool        ("수작업/범용 툴" 계열)
 *   chart-3 (짙은 남색 계열)        — aiTool
 *   chart-4 (가장 어두움, 브랜드 그린 계열) — wooriteam, mrr    (가장 진한 색 — 우리팀 배지와 IR 핵심 지표)
 *
 * 레이더(advantageChartConfig)는 셋이 한 화면에 겹쳐 그려지므로 wooriteam 이
 * aiTool·designTool 보다 옅어 보이면 안 된다 — chart-4 를 가장 어둡게 잡아
 * 대비/불투명도 서열에서 wooriteam 이 항상 가장 진하도록 했다.
 */
const executionChartConfig = {
  manual: {
    label: "혼자 붙잡는 실행",
    color: "var(--color-chart-2)",
  },
  strategic: {
    label: "전략·판단",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const advantageChartConfig = {
  wooriteam: {
    label: "WooriTeam",
    color: "var(--color-chart-4)",
  },
  aiTool: {
    label: "단일 AI 툴",
    color: "var(--color-chart-3)",
  },
  designTool: {
    label: "디자인 템플릿 툴",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

const visionChartConfig = {
  subscribers: {
    label: "유료 구독자 수",
    color: "var(--color-chart-1)",
  },
  mrr: {
    label: "MRR",
    color: "var(--color-chart-4)",
  },
} satisfies ChartConfig;

/**
 * 이름표는 `text-ink-3`, 값은 `text-ink` — `chart.tsx` 의 기본
 * `ChartTooltipContent` 가 쓰는 `text-muted-foreground`/`text-foreground`
 * 조합과 같은 규칙이다(그 파일은 이미 밝은-배경 토큰이라 손대지 않는다).
 * 세 차트 모두 이제 밝은 섹션에서 렌더된다.
 */
function renderExecutionTooltip(slice: IrChartSlice) {
  return (
    <div className="flex w-full min-w-[12rem] items-center justify-between gap-6">
      <span className="text-ink-3">{slice.label}</span>
      <span className="font-mono text-sm font-semibold text-ink">{slice.value}%</span>
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
          content={<ChartLegendContent nameKey="segment" className="!pt-8 text-ink-3" />}
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
        <PolarGrid stroke="var(--color-line)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-ink-3)", fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        {/* fillOpacity: 밝은 표면 위에서 세 겹이 다 보이도록 다크 기준값(0.24/0.12/0.08)보다
            올렸다 — 흰 배경 위 반투명 색은 어두운 배경보다 옅어 보인다. 0.4/0.24/0.16 로
            먼저 맞췄으나 흰 배경 위 알파 합성 결과 aiTool·designTool 단독 면이
            대비 1.5:1 안팎으로 옅어(task-2-report.md 참고), 0.5/0.34/0.22 로 다시 올렸다.
            우리팀이 가장 진하다는 서열은 유지 — 어느 경우든 stroke(불투명, 2px)는
            대비 6:1 이상이라 세 도형의 윤곽은 항상 뚜렷하다. */}
        <Radar
          dataKey="wooriteam"
          fill="var(--color-wooriteam)"
          fillOpacity={0.5}
          stroke="var(--color-wooriteam)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Radar
          dataKey="aiTool"
          fill="var(--color-aiTool)"
          fillOpacity={0.34}
          stroke="var(--color-aiTool)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Radar
          dataKey="designTool"
          fill="var(--color-designTool)"
          fillOpacity={0.22}
          stroke="var(--color-designTool)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <ChartLegend
          content={<ChartLegendContent className="!pt-8 text-ink-3" />}
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
        <CartesianGrid stroke="var(--color-line)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "var(--color-ink-3)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="subscribers"
          tick={{ fill: "var(--color-ink-3)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <YAxis
          yAxisId="mrr"
          orientation="right"
          tick={{ fill: "var(--color-ink-3)", fontSize: 12 }}
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
                  <span className="text-ink-3">{name}</span>
                  <span className="font-mono text-sm font-semibold text-ink">
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
          content={<ChartLegendContent className="!pt-8 text-ink-3" />}
        />
      </LineChart>
    </ChartContainer>
  );
}
