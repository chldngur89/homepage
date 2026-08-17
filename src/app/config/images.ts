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
