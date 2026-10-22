import { createElement, Fragment } from "react";
import { describe, expect, it } from "vitest";
import { articleText } from "../client/src/lib/articleText";
import { calculateReadingTime } from "../client/src/lib/readingTime";

describe("Static article text", () => {
  it("counts nested paragraphs and table cells instead of treating JSX as empty", () => {
    const content = createElement(Fragment, null,
      createElement("p", null, "word ".repeat(200)),
      createElement("table", null, createElement("tbody", null,
        createElement("tr", null, createElement("td", null, "another word")))));
    expect(calculateReadingTime(articleText(content))).toBe(2);
  });
  it("ignores non-text values and does not execute embedded components", () => {
    const component = () => { throw new Error("Must not execute"); };
    expect(articleText([false, null, "PHP", 2026, createElement(component)])).toContain("PHP 2026");
  });
});
