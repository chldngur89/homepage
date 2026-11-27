import type { TechnologyCopy } from "../ko/technology";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 배열 원소 개수가 달라지면
 * 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈·솔루션 영문 사전과 같은 톤을 따른다.
 *
 * `pipeline.steps` 의 02·03·04 본문은 한국어가 솔루션의 `cycle.steps` 와
 * 글자까지 같다. 같은 문장이 페이지마다 다른 영어로 나오면 안 되므로
 * `en/solution.ts` 의 번역을 그대로 쓴다.
 */
export const technology: DeepWiden<TechnologyCopy> = {
  hero: {
    eyebrow: "Technology",
    titleLine1: "Understands the store,",
    titleLine2: "carries the work forward",
    body: "WooriTeam isn't a one-off generator. It's an AI operations structure that starts from your store data and runs through task prep, approval, execution and accumulated history.",
  },
  pipeline: {
    label: "Five layers of the AI operations team",
    steps: [
      { phase: "01", title: "Store context", body: "Owner preferences, store, products, prices and conditions — structured as the basis for every task." },
      { phase: "02", title: "Task prep", body: "Generates promotion plans and channel-specific content from product info, using our patent-pending methods." },
      { phase: "03", title: "Approval-first execution", body: "Nothing runs without the owner's approval. Approve, edit and hold are tracked per task." },
      { phase: "04", title: "Channel execution", body: "Combines official channel integrations with human checks, and records the results." },
      { phase: "05", title: "Learning from history", body: "Approvals, edits and executions are stored as time-series data to improve the next proposal." },
    ],
  },
  principles: {
    label: "Research and patents",
    items: [
      {
        title: "Patent pending ① Integrated marketing content",
        body: "AI-based method for automatically generating integrated marketing content — one product brief becomes content for every channel.",
      },
      {
        title: "Patent pending ② Ad images",
        body: "AI-based method for automatically generating ad images using graphic template recommendation — ad visuals without a designer.",
      },
      {
        title: "Interoperability research",
        body: "Built on master's research in computer engineering on semantic mapping between heterogeneous systems — connecting scattered store data into one workflow.",
      },
    ],
  },
  cta: {
    title: "We prove the technology on owners' real work.",
    secondary: "See the solution",
  },
};
