import { z } from "zod";
export const stages = ["idea", "research", "draft", "review"] as const;
export const studioContent = z
  .object({
    title: z.string().max(160),
    body: z.string().max(80000),
    stage: z.enum(stages),
    tags: z.array(z.string().trim().min(1).max(40)).max(10),
    sources: z
      .array(
        z.object({
          title: z.string().trim().min(1).max(200),
          url: z
            .url()
            .max(2000)
            .refine(s => s.startsWith("https://"), "Use an HTTPS source URL."),
        })
      )
      .max(20),
    notes: z
      .array(z.object({ text: z.string().trim().min(1).max(8000) }))
      .max(30),
  })
  .strict();
export type StudioContent = z.infer<typeof studioContent>;
export type StudioArticle = StudioContent & {
  id: string;
  version: number;
  updatedAt: string;
  publication: { id: string; version: number } | null;
};
export const emptyArticle: StudioContent = {
  title: "",
  body: "",
  stage: "idea",
  tags: [],
  sources: [],
  notes: [],
};
export function publicationIssues(content: StudioContent): string[] {
  const issues: string[] = [];
  if (content.title.trim().length < 5)
    issues.push("Give the article a title of at least 5 characters.");
  if (content.body.trim().length < 100)
    issues.push(
      "Write at least 100 characters of article text before publishing."
    );
  if (content.sources.length === 0)
    issues.push("Attach at least one source before publishing.");
  if (content.stage !== "review")
    issues.push("Move the article to Review before publishing.");
  return issues;
}
