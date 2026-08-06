"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hide native cursor
    document.body.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
      
      if (dotRef.current && cursorRef.current) {
        dotRef.current.style.opacity = isHovering ? "0" : "1";
        
        cursorRef.current.style.width = isHovering ? "64px" : "32px";
        cursorRef.current.style.height = isHovering ? "64px" : "32px";
        cursorRef.current.style.marginLeft = isHovering ? "-32px" : "-16px";
        cursorRef.current.style.marginTop = isHovering ? "-32px" : "-16px";
        cursorRef.current.style.backgroundColor = isHovering ? "rgba(66, 133, 244, 0.1)" : "transparent";
        cursorRef.current.style.borderColor = isHovering ? "rgba(66, 133, 244, 0.8)" : "rgba(150, 150, 150, 0.5)";
      }
    };

    const render = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      }
      
      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    const animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!mounted) return null;
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return createPortal(
    <>
      {/* Colorful SVG Arrow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 0.2s ease-out"
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(-10deg)", filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" }}>
          <path 
            d="M2 2L20 8.5L12 12L8.5 20L2 2Z" 
            fill="url(#colorfulCursor)" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          <defs>
            <linearGradient id="colorfulCursor" x1="2" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="50%" stopColor="#EA4335" />
              <stop offset="100%" stopColor="#FBBC05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Outer Glassmorphism Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999998]"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          width: "32px",
          height: "32px",
          marginLeft: "-16px",
          marginTop: "-16px",
          border: "1.5px solid rgba(150, 150, 150, 0.5)",
          backgroundColor: "transparent",
          backdropFilter: "blur(2px)",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          transition: "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out"
        }}
      />
    </>,
    document.body
  );
}
