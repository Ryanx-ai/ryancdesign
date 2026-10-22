/** Authored frontmatter blocks. UI studies remain editable React, not flattened screenshots. */
export type StudyKind = "pufflet" | "pufflet-app" | "pufflet-mascots" | "phings" | "luna" | "eureka";
export type CaseImage = { src: string; alt: string; caption: string };
export type CaseBlock = {
  type: "text" | "image" | "pair" | "parts" | "palette" | "mockup" | "reflection";
  title: string;
  text?: string;
  images?: CaseImage[];
  items?: { title: string; text: string }[];
  study?: StudyKind;
};
const blockTypes = new Set(["text", "image", "pair", "parts", "palette", "mockup", "reflection"]);
export function parseCaseBlocks(value: unknown): CaseBlock[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error("Sections must be an array");
  return value.map((block: unknown) => {
    if (!block || typeof block !== "object" || !("type" in block) || !("title" in block) || typeof block.type !== "string" || !blockTypes.has(block.type) || typeof block.title !== "string") throw new Error("Invalid editorial block");
    const data = block as Record<string, unknown>;
    if (data.text !== undefined && typeof data.text !== "string") throw new Error("Block text must be a string");
    if (data.study !== undefined && !["pufflet", "pufflet-app", "pufflet-mascots", "phings", "luna", "eureka"].includes(String(data.study))) throw new Error("Unknown interface study");
    if (data.images !== undefined && (!Array.isArray(data.images) || !data.images.every((image: unknown) => image && typeof image === "object" && "src" in image && typeof image.src === "string" && /^\/(?!\/)/.test(image.src) && "alt" in image && typeof image.alt === "string" && image.alt.trim() && "caption" in image && typeof image.caption === "string"))) throw new Error("Images need a local path, alt text and caption");
    if (data.items !== undefined && (!Array.isArray(data.items) || !data.items.every((item: unknown) => item && typeof item === "object" && "title" in item && typeof item.title === "string" && "text" in item && typeof item.text === "string"))) throw new Error("Invalid block items");
    if (["image", "pair"].includes(data.type as string) && (!Array.isArray(data.images) || !data.images.length)) throw new Error("Media blocks require real images");
    if (data.type === "mockup" && !data.study) throw new Error("Mockup blocks require a study");
    // Validated discriminants and nested fields above; keep YAML parsing at one boundary.
    return data as CaseBlock;
  });
}
