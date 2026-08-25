import ChoiceDiamonds from "@/components/ChoiceDiamonds";
import { ApertureIcon, GalleryIcon } from "@/components/ChoiceIcons";

const MOBILE_ICON_BLOCK_SIZE = 160; // real, explicit box for the ring/diamond on mobile — replaces the desktop's w-0 anchor trick

export default function ChoiceOption({
  variant,
  href = "#",
  onClick,
  centerXPercent,
  label,
  labelAlign,
  labelWidth = 170,
  labelOffset,
  dotOffset,
  ringSize = 116.57,
  circleSize = 102,
  muted = false,
  overlay = null,
}) {
  const isCamera = variant === "camera";
  const color = muted ? "var(--color-diamond-border)" : "var(--color-ink)";

  const ringRadius = ringSize / 2;
  const angle = Math.atan2(dotOffset.top, dotOffset.left);
  const lineStart = {
    x: Math.cos(angle) * ringRadius,
    y: Math.sin(angle) * ringRadius,
  };

  const handleClick = onClick
    ? (event) => {
        event.preventDefault();
        onClick(event);
      }
    : undefined;

  return (
    
      <a href={href}
      onClick={handleClick}
      className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 sm:block"
      style={{ outlineColor: color }}
    >
      {/* Mobile (below sm): stacked, centered, no dot/line connector.
          The icon sits in a real, explicitly-sized box with everything
          inside it centered via left-1/2/top-1/2 — no zero-width anchor
          tricks, so it centers reliably inside a flex column. */}
      <div className="flex flex-col items-center gap-6 sm:hidden">
        <div
          className="relative"
          style={{ width: MOBILE_ICON_BLOCK_SIZE, height: MOBILE_ICON_BLOCK_SIZE }}
        >
          <ChoiceDiamonds />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height] duration-200"
            style={{ width: ringSize, height: ringSize, borderColor: color }}
          />
          <span
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,transform] duration-200 group-hover:scale-105"
            style={{
              width: circleSize,
              height: circleSize,
              background: isCamera ? color : "var(--color-canvas)",
              border: isCamera ? "none" : `2px solid ${color}`,
            }}
          >
            {isCamera ? (
              <ApertureIcon className="h-16 w-16" />
            ) : (
              <GalleryIcon className="h-14 w-14" style={{ color }} />
            )}
          </span>
        </div>
        <p
          className="max-w-[220px] text-center uppercase"
          style={{
            fontSize: "var(--text-caption-1920)",
            lineHeight: "var(--text-caption-1920--line-height)",
            color,
          }}
        >
          {label[0]}
          <br />
          {label[1]}
        </p>
        {overlay}
      </div>

      {/* Desktop (sm and up): original absolute layout with diagonal label + connector, unchanged */}
      <div
        className="absolute top-1/2 hidden -translate-y-1/2 sm:block"
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
              stroke={color}
              strokeWidth={1}
            />
          </svg>
          <span
            className="absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ top: dotOffset.top, left: dotOffset.left, borderColor: color }}
          />

          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height] duration-200"
            style={{ width: ringSize, height: ringSize, borderColor: color }}
          />
          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,transform] duration-200 group-hover:scale-105"
            style={{
              width: circleSize,
              height: circleSize,
              background: isCamera ? color : "var(--color-canvas)",
              border: isCamera ? "none" : `2px solid ${color}`,
            }}
          >
            {isCamera ? (
              <ApertureIcon className="h-16 w-16" />
            ) : (
              <GalleryIcon className="h-14 w-14" style={{ color }} />
            )}
          </span>

          <p
            className="absolute uppercase"
            style={{
              top: labelOffset.top,
              left: labelOffset.left,
              width: labelWidth,
              textAlign: labelAlign,
              fontSize: "var(--text-caption-1920)",
              lineHeight: "var(--text-caption-1920--line-height)",
              color,
            }}
          >
            {label[0]}
            <br />
            {label[1]}
          </p>

          {overlay}
        </div>
      </div>
    </a>
  );
}