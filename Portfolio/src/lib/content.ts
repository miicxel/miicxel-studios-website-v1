import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { Tokens } from "marked";
import type { Token } from "marked";

const root = process.cwd();

// ---------------------------------------------------------------------------
// Content loaders — the single entry point for everything the site renders.
// Add or edit items by editing the JSON / Markdown files under content/.
// Never touch the React components to change content.
// ---------------------------------------------------------------------------

export type MdBlock = {
  kind: "p" | "list" | "note";
  html: string;
  items?: string[];
};

export type MdSection = {
  heading: string;
  blocks: MdBlock[];
  subsections: { heading: string; blocks: MdBlock[] }[];
};

export type FaqEntry = { question: string; answer: string };

export type Clip = {
  id: string;
  video: string;
  title: string;
  client_label: string;
  niche: string;
  hook: string;
  description: string;
  tags: string[];
  featured: boolean;
};

export type BeforeAfterItem = {
  id: string;
  before_video: string;
  after_video: string;
  title: string;
  description: string;
};

export type HookStyleItem = { id: string; video: string; style_label: string };

export type PortfolioData = {
  hero: { primary: string; alt: string; note: string };
  general_clips: Clip[];
  before_after: { section_note: string; items: BeforeAfterItem[] };
  hook_styles: { section_note: string; items: HookStyleItem[] };
};

export type PricingData = {
  single_clips: {
    label: string;
    description: string;
    price_range: { min: number; max: number };
    unit: string;
    includes: string[];
  };
  monthly_packages: {
    id: string;
    label: string;
    price: number;
    billing: string;
    clips_per_month: number;
    effective_per_clip: number;
    includes: string[];
    best_for: string;
    featured: boolean;
  }[];
  notes: { pricing_model: string; custom_note: string };
};

function inline(md: string): string {
  return marked.parseInline(md, { async: false }) as string;
}

function renderBlocks(tokens: Token[]): MdBlock[] {
  const blocks: MdBlock[] = [];
  for (const token of tokens) {
    if (token.type === "paragraph") {
      if (token.text.includes("[ADJUST]")) continue; // authoring note, never content
      blocks.push({ kind: "p", html: inline(token.text) });
    } else if (token.type === "list") {
      const listToken = token as Tokens.List;
      const items = listToken.items.map((item) => item.text);
      blocks.push({
        kind: "list",
        html: "",
        items: items.map((text) => inline(text)),
      });
    }
  }
  return blocks;
}

function parseSections(md: string): MdSection[] {
  const tokens = marked.lexer(md);
  const sections: MdSection[] = [];
  let current: MdSection | null = null;

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 2) {
      current = { heading: token.text, blocks: [], subsections: [] };
      sections.push(current);
    } else if (token.type === "heading" && token.depth === 3 && current) {
      current.subsections.push({ heading: token.text, blocks: [] });
    } else if (current) {
      if (token.type === "heading") continue;
      if (token.type === "hr") continue;
      const blockTokens =
        token.type === "space"
          ? null
          : ([token] as unknown as Token[]);
      if (!blockTokens) continue;
      const rendered = renderBlocks(blockTokens);
      const target =
        current.subsections.length > 0
          ? current.subsections[current.subsections.length - 1]
          : null;
      if (target) target.blocks.push(...rendered);
      else current.blocks.push(...rendered);
    }
  }
  return sections;
}

function parseFaq(md: string): FaqEntry[] {
  const tokens = marked.lexer(md);
  const entries: FaqEntry[] = [];
  let current: { question: string; answerParts: string[] } | null = null;

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 3) {
      if (current) entries.push({ question: current.question, answer: current.answerParts.join(" ") });
      current = { question: token.text, answerParts: [] };
    } else if (current && token.type === "paragraph") {
      if (token.text.includes("[ADJUST]")) continue;
      current.answerParts.push(inline(token.text));
    }
  }
  if (current) entries.push({ question: current.question, answer: current.answerParts.join(" ") });
  return entries;
}

export function getServices(): MdSection[] {
  return parseSections(readFileSync(path.join(root, "content/services.md"), "utf8"));
}

export function getAbout(): MdSection[] {
  return parseSections(readFileSync(path.join(root, "content/about.md"), "utf8"));
}

export function getFaq(): FaqEntry[] {
  return parseFaq(readFileSync(path.join(root, "content/faq.md"), "utf8"));
}

export function getJson<T>(file: string): T {
  return JSON.parse(readFileSync(path.join(root, "content", file), "utf8")) as T;
}
