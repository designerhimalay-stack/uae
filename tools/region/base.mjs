// The URL base for this repo's region (region.json), with a trailing slash:
// "/" for us, "/au/", "/in/", "/uae/". Used by the audit and image tools.
import { readFileSync } from "node:fs";

// REGION=<us|au|in|uae> overrides region.json (to audit another region's build).
const region = process.env.REGION || JSON.parse(readFileSync(new URL("../../region.json", import.meta.url), "utf8")).region;
export const BASE = region === "us" ? "/" : `/${region}/`;
