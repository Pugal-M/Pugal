"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribeMount = () => () => {};
const getMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

const subscribeTouch = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};
const getTouchSnapshot = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const getServerTouchSnapshot = () => false;

export function CustomCursor() {
  const isMounted = useSyncExternalStore(subscribeMount, getMountSnapshot, getServerMountSnapshot);
  const isTouchDevice = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerTouchSnapshot);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentMode: "default" | "hover" | "view" = "default";

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        currentMode = "view";
      } else if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]') ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        currentMode = "hover";
      } else {
        currentMode = "default";
      }

      if (ringRef.current && dotRef.current && textRef.current) {
        if (currentMode === "view") {
          dotRef.current.style.opacity = "0";
          ringRef.current.style.width = "72px";
          ringRef.current.style.height = "72px";
          ringRef.current.style.marginLeft = "-36px";
          ringRef.current.style.marginTop = "-36px";
          ringRef.current.style.backgroundColor = "rgba(66, 133, 244, 0.85)";
          ringRef.current.style.borderColor = "transparent";
          ringRef.current.style.backdropFilter = "blur(8px)";
          textRef.current.style.opacity = "1";
          textRef.current.style.transform = "scale(1)";
        } else if (currentMode === "hover") {
          dotRef.current.style.opacity = "0";
          ringRef.current.style.width = "48px";
          ringRef.current.style.height = "48px";
          ringRef.current.style.marginLeft = "-24px";
          ringRef.current.style.marginTop = "-24px";
          ringRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          ringRef.current.style.borderColor = "rgba(66, 133, 244, 0.8)";
          ringRef.current.style.backdropFilter = "blur(4px)";
          textRef.current.style.opacity = "0";
          textRef.current.style.transform = "scale(0.5)";
        } else {
          dotRef.current.style.opacity = "1";
          ringRef.current.style.width = "32px";
          ringRef.current.style.height = "32px";
          ringRef.current.style.marginLeft = "-16px";
          ringRef.current.style.marginTop = "-16px";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.borderColor = "rgba(160, 160, 160, 0.4)";
          ringRef.current.style.backdropFilter = "none";
          textRef.current.style.opacity = "0";
          textRef.current.style.transform = "scale(0.5)";
        }
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isTouchDevice]);

  if (!isMounted || isTouchDevice) return null;

  return createPortal(
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-google-blue pointer-events-none z-[9999999] shadow-[0_0_10px_#4285F4]"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-5px",
          marginTop: "-5px",
          transition: "opacity 0.2s ease-out",
        }}
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999998] flex items-center justify-center border transition-[width,height,margin,background-color,border-color,backdrop-filter] duration-200 ease-out"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          width: "32px",
          height: "32px",
          marginLeft: "-16px",
          marginTop: "-16px",
          borderColor: "rgba(160, 160, 160, 0.4)",
          backgroundColor: "transparent",
        }}
      >
        <span
          ref={textRef}
          className="text-white text-[11px] font-bold uppercase tracking-wider opacity-0 transition-all duration-200 pointer-events-none select-none"
          style={{ transform: "scale(0.5)" }}
        >
          View
        </span>
      </div>
    </>,
    document.body
  );
}
