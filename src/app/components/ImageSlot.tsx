import { IMAGE_SLOTS, type ImageSlotId, type ImageSlotSpec } from "@/app/config/images";

/**
 * 안쪽 표식을 그릴 만큼 슬롯이 큰지 판단한다.
 * `compact` 를 명시하면 그 값을 그대로 쓴다. 생략하면 정사각(1 / 1) 비율을
 * "작은 아바타" 로 간주해 자동으로 표식을 뺀다 — 현재 1:1 슬롯은 voice-1,
 * voice-2 뿐이고 둘 다 44px 원형 아바타로 쓰인다. 앞으로 큰 정사각 슬롯이
 * 생기면 `compact={false}` 를 명시적으로 넘기면 된다.
 */
export function isCompactSlot(spec: ImageSlotSpec, compact?: boolean): boolean {
  if (typeof compact === "boolean") return compact;
  return spec.ratio === "1 / 1";
}

export function ImageSlot({
  slot,
  alt,
  className = "",
  grayscale = true,
  compact,
}: {
  slot: ImageSlotId;
  alt: string;
  className?: string;
  grayscale?: boolean;
  /** 라벨을 생략할지 명시적으로 지정. 생략 시 정사각 비율에서 자동으로 켜진다. */
  compact?: boolean;
}) {
  const spec = IMAGE_SLOTS[slot];

  if (spec.sample) {
    const hideMark = isCompactSlot(spec, compact);

    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden border border-dashed border-line-2 bg-panel ${className}`}
        style={{ aspectRatio: spec.ratio }}
        role="img"
        aria-label={alt}
        // 어느 슬롯인지 개발자가 DOM 에서 바로 알아보라고 남긴다. 값은 슬롯
        // id(ASCII)뿐이고, 어떤 사진이 들어갈지는 src/app/config/images.ts 의
        // 같은 키에 `subject` 로 적혀 있다. 한국어 제작 메모를 HTML 에 싣지
        // 않으므로 로케일 혼입 검사를 우회할 필요가 없다.
        data-image-slot={slot}
      >
        {/*
          사진이 들어올 자리라는 것만 알리는, 언어에 기대지 않는 표식.

          예전에는 이 자리에 `spec.subject`(예: "대표의 업무 환경 — 책상 /
          노트 / 화면 (권장 1200×960)")를 그대로 텍스트로 찍었다. 그것은
          카피가 아니라 로케일과 무관한 내부 제작 메모인데, 영문 화면(/en)을
          여는 사람에게도 한국어 문장으로 그대로 노출됐다. check-html 의
          로케일 혼입 검사는 그 문장을 예외로 빼주는 방식으로 넘어가고
          있었다 — 원인을 고치는 대신 가드를 넓힌 셈이다.

          그래서 텍스트를 걷어내고 점선 프레임 + 사진 픽토그램만 남긴다.
          "빈 상자" 가 아니라 "비워 둔 자리" 로 읽히게 하려는 의도는 그대로
          유지하면서, 어떤 언어도 화면에 찍지 않는다. `subject` 는 계속 살아
          있고 verify-assets 의 교체 안내와 사진을 준비하는 사람을 위해서만
          쓰인다.

          바깥 div 가 role="img" + aria-label 로 스크린 리더에 alt 를
          전달하므로 표식은 aria-hidden 으로 감춘다.
        */}
        {!hideMark && (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-ink-3"
          >
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <circle cx="8.5" cy="10" r="1.4" />
            <path d="M3 16.5 9 11.5l5 4 3-2.5 4 3.5" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-panel ${className}`}
      style={{ aspectRatio: spec.ratio }}
    >
      <img
        src={spec.src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={grayscale ? { filter: "grayscale(1)" } : undefined}
      />
    </div>
  );
}
