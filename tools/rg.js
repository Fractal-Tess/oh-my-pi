const MAX_MATCHES_PER_FILE = 100;
const MAX_RETURN_LINES = 2_000;
const MAX_RETURN_BYTES = 50 * 1024;

function boundOutput(text) {
  let output = text.split("\n").slice(0, MAX_RETURN_LINES).join("\n");
  let truncated = output !== text;

  if (Buffer.byteLength(output) > MAX_RETURN_BYTES) {
    output = output.slice(0, MAX_RETURN_BYTES);
    truncated = true;
  }

  return { output, truncated };
}

export default function createRipgrepTool(pi) {
  return {
    name: "rg",
    label: "Ripgrep",
    description:
      "Search file contents with ripgrep. Prefer rg over grep for ordinary repository content searches. Respects .gitignore by default and supports regex, literal, glob, and case controls.",
    strict: true,
    loadMode: "essential",
    parameters: pi.zod.object({
      pattern: pi.zod.string().min(1).describe("Regular expression or literal text to find."),
      path: pi.zod.string().optional().describe("File or directory to search; defaults to the session working directory."),
      glob: pi.zod.string().optional().describe("Restrict results to a ripgrep glob, such as '*.ts'."),
      case_sensitive: pi.zod.boolean().optional().describe("Force case-sensitive or case-insensitive matching. Defaults to smart-case."),
      fixed_strings: pi.zod.boolean().optional().describe("Treat pattern as literal text rather than a regular expression."),
      hidden: pi.zod.boolean().optional().describe("Include hidden files while excluding .git."),
      context: pi.zod.number().int().min(0).max(20).optional().describe("Context lines around every match."),
      limit: pi.zod.number().int().min(1).max(1_000).optional().describe("Maximum matches per file; defaults to 100."),
    }),

    async execute(_toolCallId, params, onUpdate, _ctx, signal) {
      const args = ["--line-number", "--color=never", "--max-count", String(params.limit ?? MAX_MATCHES_PER_FILE)];

      if (params.case_sensitive === true) args.push("--case-sensitive");
      else if (params.case_sensitive === false) args.push("--ignore-case");
      else args.push("--smart-case");
      if (params.fixed_strings) args.push("--fixed-strings");
      if (params.hidden) args.push("--hidden", "--glob", "!.git");
      if (params.glob) args.push("--glob", params.glob);
      if (params.context) args.push("--context", String(params.context));
      args.push("--", params.pattern, params.path ?? pi.cwd);

      onUpdate?.({ content: [{ type: "text", text: "Searching with ripgrep..." }], details: { phase: "search" } });
      const result = await pi.exec("rg", args, { cwd: pi.cwd, signal });

      if (result.killed) throw new Error("Ripgrep search was cancelled.");
      if (result.code === 1) {
        return { content: [{ type: "text", text: "No matches found." }], details: { matchCount: 0, truncated: false } };
      }
      if (result.code !== 0) throw new Error(result.stderr || `ripgrep exited with status ${result.code}`);

      const { output, truncated } = boundOutput(result.stdout);
      const matchCount = output === "" ? 0 : output.split("\n").filter(Boolean).length;
      const notice = truncated ? "\n\nOutput truncated; narrow the path, glob, or pattern." : "";
      return { content: [{ type: "text", text: `${output}${notice}` }], details: { matchCount, truncated } };
    },
  };
}
