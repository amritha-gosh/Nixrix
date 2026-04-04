import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const s = useRef({ mx: -200, my: -200, rx: -200, ry: -200, raf: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let visible = false;

    const onMove = (e: MouseEvent) => {
      s.current.mx = e.clientX;
      s.current.my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }
    };

    const loop = () => {
      const p = s.current;
      dot.style.transform = `translate3d(${p.mx - 5}px,${p.my - 5}px,0)`;
      p.rx += (p.mx - p.rx) * 0.11;
      p.ry += (p.my - p.ry) * 0.11;
      ring.style.transform = `translate3d(${p.rx - 20}px,${p.ry - 20}px,0)`;
      p.raf = requestAnimationFrame(loop);
    };

    const onEnter = () => { dot.dataset.h = "1"; ring.dataset.h = "1"; };
    const onLeave = () => { delete dot.dataset.h; delete ring.dataset.h; };

    const attach = () => {
      document.querySelectorAll("a,button,[role=button],input,textarea,select,label").forEach(el => {
        (el as HTMLElement).addEventListener("mouseenter", onEnter, { passive: true });
        (el as HTMLElement).addEventListener("mouseleave", onLeave, { passive: true });
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    s.current.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.current.raf);
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @media (hover: hover) { *, *::before, *::after { cursor: none !important; } }
        #nx-dot {
          position:fixed; top:0; left:0; z-index:999999;
          width:10px; height:10px; border-radius:50%;
          background:#E8230A; pointer-events:none; opacity:0;
          transition: width .14s ease, height .14s ease, box-shadow .14s ease;
          box-shadow: 0 0 10px rgba(232,35,10,.55); will-change:transform;
        }
        #nx-dot[data-h] { width:15px; height:15px; box-shadow:0 0 22px rgba(232,35,10,.75); }
        #nx-ring {
          position:fixed; top:0; left:0; z-index:999998;
          width:40px; height:40px; border-radius:50%;
          border:1.5px solid rgba(232,35,10,.38); pointer-events:none; opacity:0;
          transition: width .2s ease, height .2s ease, border-color .2s ease;
          will-change:transform;
        }
        #nx-ring[data-h] { width:54px; height:54px; border-color:rgba(232,35,10,.62); }
      `}</style>
      <div id="nx-dot"  ref={dotRef}  aria-hidden="true" />
      <div id="nx-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
