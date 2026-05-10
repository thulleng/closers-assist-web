"use client";

import { useEffect } from "react";

/**
 * Watches for .scroll-reveal elements and adds .visible when
 * they enter the viewport. Drop once in layout.tsx — covers all pages.
 */
export default function ScrollRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    // Observe existing
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));

    // Watch for new ones added after mount
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(".scroll-reveal:not(.visible)").forEach((el) => {
        if (!el.classList.contains("observed")) {
          el.classList.add("observed");
          observer.observe(el);
        }
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
