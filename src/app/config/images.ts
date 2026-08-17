export type ImageSlotId = "persona" | "voice-1" | "voice-2" | "footer-wide";

export type ImageSlotSpec = {
  src: string;
  /** CSS aspect-ratio 값. 사진을 교체해도 레이아웃이 흔들리지 않게 고정한다. */
  ratio: string;
  /** 최종적으로 이 자리에 들어갈 사진의 내용 */
  subject: string;
  /** 아직 샘플이면 true. 빌드 시 경고 목록에 오른다. */
  sample: boolean;
};

/**
 * 실제 사진으로 교체하는 절차:
 * 1. 사진 파일을 이 슬롯의 `src` 경로(예: `public/img/persona.png`)에 덮어쓴다.
 * 2. 그 슬롯의 `sample` 을 `false` 로 바꾼다.
 * `sample` 을 바꾸지 않으면 `ImageSlot` 이 여전히 플레이스홀더 카드를 그리고,
 * verify-assets 경고에도 계속 남는다 — 파일만 바꿔서는 교체되지 않는다.
 */
export const IMAGE_SLOTS: Record<ImageSlotId, ImageSlotSpec> = {
  persona: {
    src: "/img/persona.png",
    ratio: "5 / 4",
    subject: "대표의 업무 환경 — 책상 / 노트 / 화면 (권장 1200×960)",
    sample: true,
  },
  "voice-1": {
    src: "/img/voice-1.png",
    ratio: "1 / 1",
    subject: "손 또는 화면 일부 크롭 (권장 400×400). 사람 얼굴은 쓰지 않는다",
    sample: true,
  },
  "voice-2": {
    src: "/img/voice-2.png",
    ratio: "1 / 1",
    subject: "책상 또는 노트 일부 크롭 (권장 400×400). 사람 얼굴은 쓰지 않는다",
    sample: true,
  },
  "footer-wide": {
    src: "/img/footer-wide.png",
    ratio: "2400 / 760",
    subject: "작은 사무실 / 업무 중인 손 (권장 2400×760)",
    sample: true,
  },
};
