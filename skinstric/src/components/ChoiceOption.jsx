import ChoiceDiamonds from "@/components/ChoiceDiamonds";
import { ApertureIcon, GalleryIcon } from "@/components/ChoiceIcons";

export default function ChoiceOption({
  variant,
  href,
  centerXPercent,
  label,
  labelAlign,
  labelWidth = 170,
  labelOffset,
  dotOffset,
}) {
  const isCamera = variant === "camera";

  const ringRadius = 58.285;
  const angle = Math.atan2(dotOffset.top, dotOffset.left);
  const lineStart = {
    x: Math.cos(angle) * ringRadius,
    y: Math.sin(angle) * ringRadius,
  };

  return (
    
      <a href={href}
      className="group absolute top-1/2 -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--color-ink)]"
      style={{ left: `${centerXPercent}%` }}
    >
      <div className="relative h-0 w-0">
        <ChoiceDiamonds />

        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{ top: 0, left: 0 }}
        >
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={dotOffset.left}
            y2={dotOffset.top}
            stroke="var(--color-ink)"
            strokeWidth={1}
          />
        </svg>
        <span
          className="absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-ink)]"
          style={{ top: dotOffset.top, left: dotOffset.left }}
        />

        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-ink)]"
          style={{ width: 116.57, height: 116.57 }}
        />

        <span
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform group-hover:scale-105"
          style={{
            width: 102,
            height: 102,
            background: isCamera ? "var(--color-ink)" : "var(--color-canvas)",
            border: isCamera ? "none" : "2px solid var(--color-ink)",
          }}
        >
          {isCamera ? (
            <ApertureIcon className="h-16 w-16" />
          ) : (
            <GalleryIcon className="h-14 w-14" />
          )}
        </span>

        <p
          className="absolute uppercase text-[var(--color-ink)]"
          style={{
            top: labelOffset.top,
            left: labelOffset.left,
            width: labelWidth,
            textAlign: labelAlign,
            fontSize: "var(--text-caption-1920)",
            lineHeight: "var(--text-caption-1920--line-height)",
          }}
        >
          {label[0]}
          <br />
          {label[1]}
        </p>
      </div>
    </a>
  );
}