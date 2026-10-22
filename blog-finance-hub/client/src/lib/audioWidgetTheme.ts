const widgetSelector =
  ".commonninja_component.pid-b0c8955a-8175-4f9b-9659-f9e64d18ca95";
const styleId = "decodes-audio-theme";

// The vendor renders into an open shadow root; document styles cannot reach it.
// Use its semantic classes, rather than generated styled-component names.
const darkStyles = `
:host([data-decodes-theme="dark"]) .audio-player-container {
  background: #20252d !important;
  border-color: #80556e !important;
  box-shadow: 0 8px 28px #0005 !important;
}
:host([data-decodes-theme="dark"]) .audio-list-wrapper {
  background: #302735 !important;
}
:host([data-decodes-theme="dark"]) .audio-player-container :is(p, h5, button) {
  color: #f9eaf2 !important;
}
:host([data-decodes-theme="dark"]) .audio-player-container :is(h4, button.active) {
  color: #ff9acb !important;
}
:host([data-decodes-theme="dark"]) button .svg-element {
  color: inherit !important;
}
:host([data-decodes-theme="dark"]) button svg path {
  fill: currentColor !important;
}
:host([data-decodes-theme="dark"]) .rc-slider-rail {
  background: #80556e !important;
}
:host([data-decodes-theme="dark"]) :is(.rc-slider-track, .rc-slider-handle) {
  background: #ff9acb !important;
}
:host([data-decodes-theme="dark"]) .volume-slider {
  background: #302735 !important;
}
:host([data-decodes-theme="dark"]) input[type="range"] {
  accent-color: #ff9acb;
}
:host([data-decodes-theme="dark"]) .audio-player-container :focus-visible {
  outline: 2px solid #ff9acb !important;
  outline-offset: 3px;
}
`;

export function syncAudioWidgetTheme(theme: "light" | "dark") {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let attempts = 0;
  const apply = () => {
    const host = document.querySelector(widgetSelector);
    host?.setAttribute("data-decodes-theme", theme);
    const shadow = host?.shadowRoot;
    if (shadow) {
      if (!shadow.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = darkStyles;
        shadow.append(style);
      }
    } else if (++attempts < 120) {
      // The deferred SDK loads asynchronously. Stop after a minute if blocked.
      timer = setTimeout(apply, 500);
    }
  };
  apply();
  return () => clearTimeout(timer);
}
