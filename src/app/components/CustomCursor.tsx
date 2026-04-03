/**
 * NIXRIX — CustomCursor.tsx
 * Fancy red dot cursor with trailing ring.
 * Import once in App.tsx / layout — renders globally.
 */

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if ("ontouchstart" in window) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX  = -100;
    let ringY  = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
      }
      // Ring: lerp for trail
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("cursor-hover");
      ringRef.current?.classList.add("cursor-hover");
    };
    const onLeaveLink = () => {
      dotRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    // Watch interactive elements
    const watch = () => {
      document
        .querySelectorAll("a, button, [role=button], input, textarea, select, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterLink);
          el.addEventListener("mouseleave", onLeaveLink);
        });
    };
    watch();

    // Re-attach on DOM changes
    const observer = new MutationObserver(watch);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        #nixrix-cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 10px; height: 10px;
          background: #E8230A;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.18s ease, height 0.18s ease, background 0.18s ease;
          box-shadow: 0 0 8px rgba(232,35,10,0.55);
        }
        #nixrix-cursor-dot.cursor-hover {
          width: 14px; height: 14px;
          background: #C01A05;
          box-shadow: 0 0 16px rgba(232,35,10,0.70);
        }

        #nixrix-cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1.5px solid rgba(232,35,10,0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transition: width 0.22s ease, height 0.22s ease, border-color 0.22s ease, opacity 0.22s ease;
          opacity: 0.75;
        }
        #nixrix-cursor-ring.cursor-hover {
          width: 48px; height: 48px;
          border-color: rgba(232,35,10,0.65);
          opacity: 1;
        }
      `}</style>
      <div id="nixrix-cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div id="nixrix-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
