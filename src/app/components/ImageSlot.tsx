import { IMAGE_SLOTS, type ImageSlotId, type ImageSlotSpec } from "@/app/config/images";

/**
 * 라벨을 그릴 만큼 슬롯이 큰지 판단한다.
 * `compact` 를 명시하면 그 값을 그대로 쓴다. 생략하면 정사각(1 / 1) 비율을
 * "작은 아바타" 로 간주해 자동으로 라벨을 뺀다 — 현재 1:1 슬롯은 voice-1,
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
    const hideLabel = isCompactSlot(spec, compact);

    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden border border-line-2 bg-panel ${className}`}
        style={{ aspectRatio: spec.ratio }}
        role="img"
        aria-label={alt}
      >
        {!hideLabel && (
          // 바깥 div 가 이미 role="img" + aria-label 로 스크린 리더에 alt 를
          // 전달하므로, 화면에 보이는 subject 라벨은 aria-hidden 으로 감춰
          // 같은 내용이 두 번 읽히지 않게 한다.
          <span
            aria-hidden="true"
            className="px-3 text-center text-xs leading-snug text-ink-3"
          >
            {spec.subject}
          </span>
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
