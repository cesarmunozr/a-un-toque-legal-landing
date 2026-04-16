import { animate as _animate } from "motion";

type AnimFn = (
  el: Element | NodeListOf<Element> | HTMLElement | null,
  keyframes: Record<string, unknown>,
  options?: Record<string, unknown>
) => { then: (fn: () => void) => Promise<void> };

const animate = _animate as unknown as AnimFn;

// Outgoing: dissolves in place (no translation — breaks the "slide" metaphor)
// Incoming: fades in from a 28px vertical offset (direction-aware)
// Result: cinematic, editorial — not a presentation
const DURATION_OUT = 0.55;
const DURATION_IN  = 0.75;
const OFFSET       = 28; // px drift on the incoming section
const COOLDOWN     = 900;
const SWIPE_MIN    = 50;

// ease-in for the dissolving outgoing content
const EASE_OUT_SECTION: [number, number, number, number] = [0.4, 0, 1, 1];
// ease-out for the arriving incoming content (arrives with energy, settles)
const EASE_IN_SECTION: [number, number, number, number]  = [0, 0, 0.2, 1];

interface FPState {
  current: number;
  total: number;
  animating: boolean;
  lastNav: number;
}

const state: FPState = {
  current: 0,
  total: 0,
  animating: false,
  lastNav: 0,
};

function getSections(): NodeListOf<HTMLElement> {
  return document.querySelectorAll<HTMLElement>(".fp-section");
}

function updateProgress(): void {
  const fill = document.querySelector<HTMLElement>("[data-progress-fill]");
  if (!fill) return;
  animate(fill, { height: `${((state.current + 1) / state.total) * 100}%` }, { duration: 0.5, easing: EASE_IN_SECTION });
}

function updateCounter(): void {
  const el = document.querySelector<HTMLElement>("[data-counter]");
  if (!el) return;
  el.textContent = `${String(state.current + 1).padStart(2, "0")} / ${String(state.total).padStart(2, "0")}`;
}

function scheduleHintFade(): void {
  const hint = document.querySelector<HTMLElement>("[data-hint]");
  if (!hint) return;
  setTimeout(() => {
    animate(hint, { opacity: [1, 0] }, { duration: 0.6, easing: "ease-out" }).then(() => {
      hint.style.display = "none";
    });
  }, 3000);
}

function navigate(dir: 1 | -1): void {
  if (state.animating) return;
  if (performance.now() - state.lastNav < COOLDOWN) return;

  const next = state.current + dir;
  if (next < 0 || next >= state.total) return;

  const sections = getSections();
  const out = sections[state.current];
  const inc = sections[next];

  // Incoming starts hidden, just above/below by OFFSET px — NOT off-screen
  inc.style.opacity = "0";
  inc.style.transform = `translateY(${dir === 1 ? OFFSET : -OFFSET}px)`;
  // Incoming renders above outgoing so its bg covers the dissolve cleanly
  inc.style.zIndex = "1";
  out.style.zIndex = "0";

  inc.setAttribute("aria-hidden", "false");
  inc.style.pointerEvents = "none";

  state.animating = true;

  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    out.style.opacity = "0";
    out.setAttribute("aria-hidden", "true");
    out.style.pointerEvents = "none";
    inc.style.opacity = "1";
    inc.style.transform = "translateY(0px)";
    inc.style.pointerEvents = "";
    inc.style.zIndex = "";
    out.style.zIndex = "";
    state.current = next;
    state.animating = false;
    state.lastNav = performance.now();
    updateProgress();
    updateCounter();
    inc.dispatchEvent(new CustomEvent("fp:enter", { bubbles: false }));
    return;
  }

  let doneCount = 0;
  const onBothDone = () => {
    doneCount++;
    if (doneCount < 2) return;
    out.setAttribute("aria-hidden", "true");
    out.style.pointerEvents = "none";
    // Clean up z-index after transition
    inc.style.zIndex = "";
    out.style.zIndex = "";
    inc.style.pointerEvents = "";
    state.current = next;
    state.animating = false;
    state.lastNav = performance.now();
    updateProgress();
    updateCounter();
    inc.dispatchEvent(new CustomEvent("fp:enter", { bubbles: false }));
  };

  // Outgoing: dissolves in place — no translation
  animate(
    out,
    { opacity: [1, 0] },
    { duration: DURATION_OUT, easing: EASE_OUT_SECTION }
  ).then(onBothDone);

  // Incoming: emerges from a small directional offset, longer duration for a weightier feel
  animate(
    inc,
    {
      opacity: [0, 1],
      transform: [
        `translateY(${dir === 1 ? OFFSET : -OFFSET}px)`,
        "translateY(0px)",
      ],
    },
    { duration: DURATION_IN, easing: EASE_IN_SECTION }
  ).then(onBothDone);
}

function navigateTo(targetIndex: number): void {
  if (targetIndex === state.current) return;
  function step(): void {
    if (state.current === targetIndex) return;
    const d: 1 | -1 = targetIndex > state.current ? 1 : -1;
    navigate(d);
    setTimeout(step, DURATION_IN * 1000 + COOLDOWN + 50);
  }
  step();
}

(window as Window & { __fpNavigateTo?: (i: number) => void }).__fpNavigateTo = navigateTo;

function bindListeners(): void {
  document.addEventListener("keydown", (e) => {
    const editing = (e.target as HTMLElement).closest("input, textarea, select, [contenteditable]");
    if (editing) return;
    if (["ArrowDown", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      navigate(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigate(-1);
    }
  });

  document.addEventListener("wheel", (e) => {
    const t = e.target as HTMLElement;
    const noNav = t.closest<HTMLElement>("[data-no-nav]");
    if (noNav) {
      const atTop    = noNav.scrollTop <= 0;
      const atBottom = noNav.scrollTop + noNav.clientHeight >= noNav.scrollHeight - 1;
      // Still inside scrollable content — let the element scroll naturally
      if (e.deltaY < 0 && !atTop)    return;
      if (e.deltaY > 0 && !atBottom) return;
      // At the boundary — fall through to section navigation
    }
    e.preventDefault();
    navigate(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest("a, button, input, textarea, select, [data-no-nav]")) return;
    navigate(1);
  });

  let touchY0 = 0;
  let touchX0 = 0;
  document.addEventListener("touchstart", (e) => { touchY0 = e.touches[0].clientY; touchX0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener(
    "touchend",
    (e) => {
      const t = e.target as HTMLElement;
      const dy = e.changedTouches[0].clientY - touchY0;
      const dx = e.changedTouches[0].clientX - touchX0;
      if (Math.abs(dy) < SWIPE_MIN) return;
      if (Math.abs(dx) > Math.abs(dy)) return;
      const noNav = t.closest<HTMLElement>("[data-no-nav]");
      if (noNav) {
        const atTop    = noNav.scrollTop <= 0;
        const atBottom = noNav.scrollTop + noNav.clientHeight >= noNav.scrollHeight - 1;
        // swipe up (dy<0) = navegar adelante; swipe down (dy>0) = navegar atrás
        if (dy < 0 && !atBottom) return;
        if (dy > 0 && !atTop)    return;
      }
      navigate(dy < 0 ? 1 : -1);
    },
    { passive: true }
  );
}

function init(): void {
  const sections = getSections();
  state.total = sections.length;
  state.current = 0;
  state.animating = false;
  state.lastNav = 0;

  document.documentElement.classList.add("fp-lock");

  sections.forEach((s, i) => {
    s.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    // All sections sit at translateY(0) — hidden via opacity, not position
    s.style.opacity    = i === 0 ? "1" : "0";
    s.style.transform  = "translateY(0)";
    if (i !== 0) s.style.pointerEvents = "none";
  });

  updateProgress();
  updateCounter();
  scheduleHintFade();
  bindListeners();

  sections[0].dispatchEvent(new CustomEvent("fp:enter", { bubbles: false }));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
