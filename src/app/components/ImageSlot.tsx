import { IMAGE_SLOTS, type ImageSlotId } from "@/app/config/images";

export function ImageSlot({
  slot,
  alt,
  className = "",
  grayscale = true,
}: {
  slot: ImageSlotId;
  alt: string;
  className?: string;
  grayscale?: boolean;
}) {
  const spec = IMAGE_SLOTS[slot];

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
