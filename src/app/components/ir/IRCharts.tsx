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
  IrAdvantageChartLegend,
  IrChartSlice,
  IrRadarPoint,
  IrVisionChartLegend,
  IrVisionPoint,
  IrVisionTrajectoryFallback,
} from "@/content/ko/ir";

/**
 * **이름표는 사전에서 온다. 이 파일에 카피 문자열을 두지 않는다.**
 *
 * 예전에는 아래 세 `ChartConfig` 가 한국어 라벨을 직접 들고 있었다. 차트는
 * `IR.tsx` 의 `useEffect` 안에서 동적 import 되므로 그 글자는 **프리렌더된
 * HTML 에 없다** — `scripts/check-html.mjs` 도, `<main>` 한글 글자수 세기도
 * 전부 통과하는데, 브라우저에서 차트가 뜨는 순간 영문 `/en/ir` 의 범례
 * 세 줄이 한국어로 나타났다(계획 4 태스크 6 수정 1회차, 실측 27자).
 * 정적 검사가 볼 수 없는 자리라 배선으로 막는다: 문구는 사전이 갖고
 * 이 파일은 색과 배선만 맡는다.
 *
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
const SEGMENT_COLOR: Record<IrChartSlice["segment"], string> = {
  manual: "var(--color-chart-2)",
  strategic: "var(--color-chart-1)",
};

/** 도넛의 이름표는 슬라이스 자체가 들고 있다(`IrChartSlice["label"]`). */
function executionChartConfig(data: IrChartSlice[]): ChartConfig {
  return Object.fromEntries(
    data.map((slice) => [
      slice.segment,
      { label: slice.label, color: SEGMENT_COLOR[slice.segment] },
    ]),
  );
}

function advantageChartConfig(legend: IrAdvantageChartLegend): ChartConfig {
  return {
    wooriteam: { label: legend.wooriteam, color: "var(--color-chart-4)" },
    aiTool: { label: legend.aiTool, color: "var(--color-chart-3)" },
    designTool: { label: legend.designTool, color: "var(--color-chart-2)" },
  };
}

function visionChartConfig(legend: IrVisionChartLegend): ChartConfig {
  return {
    subscribers: { label: legend.subscribers, color: "var(--color-chart-1)" },
    mrr: { label: legend.mrr, color: "var(--color-chart-4)" },
  };
}

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
      config={executionChartConfig(data)}
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

/**
 * 레이더 축 라벨. 기본 렌더러는 한 줄로만 그려서, 375px 화면에서 긴 라벨이
 * 차트 상자(`overflow-hidden`)를 넘어가 잘린다 — 영문판에서 실제로
 * "Approval and decisions" 가 오른쪽으로 46px, "Feeding the next week" 가
 * 왼쪽으로 43px 넘쳤다. 상자가 스크롤되지 않으므로 그대로 잘린 글자가 된다.
 *
 * 한국어는 같은 자리에서 다 들어맞는다(라벨이 짧다). 그래서 번역이 바뀌면
 * 언제든 재발할 수 있는 부류의 결함이고, 라벨 길이에 상관없이 성립하도록
 * **폭 기준으로 줄을 접는다** — 특정 문구를 짧게 고쳐 넘기지 않는다.
 *
 * `MAX_CHARS` 는 12px 기준으로 차트 좌우 여백에 들어가는 대략치다. 낱말
 * 경계에서만 접으므로 한 낱말이 그보다 길면 그 줄은 넘칠 수 있다 — 현재
 * 두 로케일에 그런 낱말은 없다.
 */
function RadarTick({
  payload,
  x,
  y,
  textAnchor,
}: {
  payload?: { value?: string };
  x?: number;
  y?: number;
  textAnchor?: string;
}) {
  const MAX_CHARS = 14;
  const words = String(payload?.value ?? "").split(" ");
  const lines: string[] = [];

  for (const word of words) {
    const last = lines[lines.length - 1];
    if (last && `${last} ${word}`.length <= MAX_CHARS) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
  }

  // 여러 줄이면 위로 올려 라벨 덩어리의 세로 중심을 원래 위치에 맞춘다.
  const offset = -((lines.length - 1) * 13) / 2;

  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="var(--color-ink-3)" fontSize={12}>
      {lines.map((line, index) => (
        <tspan key={line} x={x} dy={index === 0 ? offset : 13}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function AdvantageRadarChart({
  data,
  legend,
}: {
  data: IrRadarPoint[];
  legend: IrAdvantageChartLegend;
}) {
  return (
    <ChartContainer
      config={advantageChartConfig(legend)}
      className="mt-8 aspect-auto h-[23rem] w-full"
    >
      <RadarChart data={data}>
        <PolarGrid stroke="var(--color-line)" />
        <PolarAngleAxis dataKey="subject" tick={<RadarTick />} />
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

export function VisionScenarioChart({
  data,
  legend,
  units,
}: {
  data: IrVisionPoint[];
  legend: IrVisionChartLegend;
  /** 대체 목록과 같은 단위를 쓴다 — 사전의 한 곳에서만 온다. */
  units: Pick<IrVisionTrajectoryFallback, "mrrUnit" | "subscriberUnit">;
}) {
  return (
    <ChartContainer
      config={visionChartConfig(legend)}
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
              /*
                계열 판별을 `dataKey` 로 한다. 예전에는 `name === "MRR"` 로
                **표시 문구**를 비교했는데, `ChartTooltipContent` 가 넘기는
                `name` 은 config 의 label 이 아니라 recharts 의 payload 이름
                (= dataKey `"mrr"`)이라 이 분기는 한 번도 참이 된 적이 없다.
                그래서 `백만원` 은 죽은 문자열이었고 MRR 행이 구독자 단위
                (`명`)를 달고 나왔다 — 실측: `M9 subscribers 1,000명 mrr 50명`.
                이름표를 로케일에 따라 바꾸는 순간 이런 문구 비교는 조용히
                깨지므로, 판별은 코드가 정하는 값(dataKey)으로 한다.
              */
              formatter={(value, _name, item) => {
                const isMrr = item?.dataKey === "mrr";

                return (
                  <div className="flex w-full min-w-[12rem] items-center justify-between gap-6">
                    <span className="text-ink-3">
                      {isMrr ? legend.mrr : legend.subscribers}
                    </span>
                    <span className="font-mono text-sm font-semibold text-ink">
                      {isMrr
                        ? `${value}${units.mrrUnit}`
                        : `${Number(value).toLocaleString()}${units.subscriberUnit}`}
                    </span>
                  </div>
                );
              }}
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
