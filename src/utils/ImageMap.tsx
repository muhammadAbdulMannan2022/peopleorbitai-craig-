import { useState, useRef, useEffect, useCallback } from "react";

// ─── 1. Set these to your image's actual natural pixel dimensions ─────────────
const NATURAL_W = 780;
const NATURAL_H = 420;

// ─── 2. Define hotspots using natural-image coordinates ───────────────────────
//  rect   → coords: [x1, y1, x2, y2]
//  circle → coords: [centerX, centerY, radius]
const HOTSPOTS = [
  {
    id: "agent",
    shape: "rect" as const,
    coords: [10, 55, 155, 320],
    label: "Agent",
    description:
      "Our AI agent handles customer conversations 24/7, answering queries, qualifying leads, and automating repetitive tasks so your team can focus on what matters.",
  },
  {
    id: "rocket",
    shape: "circle" as const,
    coords: [390, 60, 62],
    label: "Platform",
    description:
      "A unified launch platform connecting your Agent, Audit, and Training solutions — giving you a single view of performance, deployments, and insights.",
  },
  {
    id: "audit",
    shape: "rect" as const,
    coords: [268, 228, 510, 410],
    label: "Audit / Consult",
    description:
      "We review your existing workflows and AI setup, identify gaps, and provide expert consulting to optimise performance and ensure responsible AI usage.",
  },
  {
    id: "train",
    shape: "rect" as const,
    coords: [625, 55, 775, 320],
    label: "Train",
    description:
      "Empower your team with hands-on AI training programmes tailored to your industry — from foundational literacy to advanced prompt engineering.",
  },
];

type HotspotId = (typeof HOTSPOTS)[number]["id"] | null;

function scaleCoords(
  coords: number[],
  shape: "rect" | "circle",
  rx: number,
  ry: number,
): string {
  if (shape === "circle") {
    const [cx, cy, r] = coords;
    return [
      Math.round(cx * rx),
      Math.round(cy * ry),
      Math.round(r * Math.min(rx, ry)),
    ].join(",");
  }
  return coords
    .map((v, i) => Math.round(v * (i % 2 === 0 ? rx : ry)))
    .join(",");
}

export default function SolutionsImageMap() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState({ x: 1, y: 1 });
  const [active, setActive] = useState<HotspotId>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
    flipVertical?: boolean;
  } | null>(null);

  const updateRatios = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    setRatios({
      x: img.clientWidth / NATURAL_W,
      y: img.clientHeight / NATURAL_H,
    });
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) updateRatios();
    img.addEventListener("load", updateRatios);
    window.addEventListener("resize", updateRatios);
    return () => {
      img.removeEventListener("load", updateRatios);
      window.removeEventListener("resize", updateRatios);
    };
  }, [updateRatios]);

  const handleAreaClick = (
    e: React.MouseEvent<HTMLAreaElement>,
    id: string,
  ) => {
    e.preventDefault();
    if (active === id) {
      setActive(null);
      setTooltipPos(null);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const tooltipWidth = 224;
    const tooltipHeight = 120;
    const tooltipPadding = 14;
    const margin = 8;

    let adjustedX = clickX;
    let adjustedY = clickY;
    let flipVertical = false;

    const viewportWidth = window.innerWidth;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const containerLeft = rect.left + scrollX;
    const containerTop = rect.top + scrollY;

    const tooltipLeft = containerLeft + adjustedX - tooltipWidth / 2;
    const tooltipRight = tooltipLeft + tooltipWidth;
    if (tooltipLeft < margin) {
      adjustedX = margin - containerLeft - clickX + tooltipWidth / 2;
    } else if (tooltipRight > viewportWidth - margin) {
      adjustedX = viewportWidth - margin - containerLeft - clickX - tooltipWidth / 2;
    }

    const tooltipTop = containerTop + adjustedY - tooltipPadding - tooltipHeight - margin;
    if (tooltipTop < margin) {
      flipVertical = true;
      adjustedY = clickY + tooltipPadding + margin;
    }

    setActive(id as HotspotId);
    setTooltipPos({
      top: adjustedY,
      left: adjustedX,
      flipVertical,
    });
  };

  const closeTooltip = () => {
    setActive(null);
    setTooltipPos(null);
  };

  const activeData = HOTSPOTS.find((h) => h.id === active);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl">
      <div ref={containerRef} className="relative w-full">
        <img
          ref={imgRef}
          src="/ilastration.png"
          alt="AI solutions diagram"
          useMap="#solutionsmap"
          className="w-full h-auto block"
          draggable={false}
        />

        <map name="solutionsmap">
          {HOTSPOTS.map((hs) => (
            <area
              key={hs.id}
              shape={hs.shape}
              coords={scaleCoords(hs.coords, hs.shape, ratios.x, ratios.y)}
              alt={hs.label}
              href="#"
              onClick={(e) => handleAreaClick(e, hs.id)}
            />
          ))}
        </map>

        {/* Backdrop to close tooltip on outside click */}
        {active && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 39 }}
            onClick={closeTooltip}
          />
        )}

        {/* Tooltip */}
        {active && activeData && tooltipPos && (
          <div
            style={{
              position: "absolute",
              top: tooltipPos.top,
              left: tooltipPos.left,
              transform: tooltipPos.flipVertical
                ? "translate(-50%, 14px)"
                : "translate(-50%, calc(-100% - 14px))",
              zIndex: 40,
              width: 224,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "14px 16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.11)",
              pointerEvents: "auto",
            }}
          >
            {/* Arrow pointing down */}
            <div
              style={{
                position: "absolute",
                bottom: tooltipPos.flipVertical ? "100%" : -8,
                top: tooltipPos.flipVertical ? -8 : "auto",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: tooltipPos.flipVertical ? "8px solid transparent" : "8px solid #fff",
                borderBottom: tooltipPos.flipVertical ? "8px solid #fff" : "8px solid transparent",
              }}
            />
            {/* Border arrow */}
            <div
              style={{
                position: "absolute",
                bottom: tooltipPos.flipVertical ? "100%" : -10,
                top: tooltipPos.flipVertical ? -10 : "auto",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderTop: tooltipPos.flipVertical ? "9px solid transparent" : "9px solid #e5e7eb",
                borderBottom: tooltipPos.flipVertical ? "9px solid #e5e7eb" : "9px solid transparent",
                zIndex: -1,
              }}
            />

            {/* Purple left accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                height: "100%",
                background: "#7F77DD",
                borderRadius: "12px 0 0 12px",
              }}
            />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTooltip();
              }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#9ca3af",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>

            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 5px",
                paddingLeft: 6,
              }}
            >
              {activeData.label}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                margin: 0,
                lineHeight: 1.6,
                paddingLeft: 6,
              }}
            >
              {activeData.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
