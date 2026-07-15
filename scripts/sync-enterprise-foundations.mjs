import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repositoryRoot, "packages/ui/src");
const sourceRepository = "https://github.com/protocol-z/z-design-system-v2";
const syncedFiles = [
  "enterprise/EnterpriseRoot.tsx",
  "enterprise/StateLabel.tsx",
  "enterprise/index.ts",
  "styles/enterprise.css",
];

const args = process.argv.slice(2);
const mode = args.includes("--check") ? "check" : args.includes("--write") ? "write" : null;
const targetIndex = args.indexOf("--target");
const targetArgument = targetIndex >= 0 ? args[targetIndex + 1] : undefined;

if (!mode || !targetArgument) {
  console.error(
    "Usage: node scripts/sync-enterprise-foundations.mjs (--write|--check) --target <inference-gateway-root>",
  );
  process.exit(2);
}

const targetRepository = path.resolve(process.cwd(), targetArgument);
const targetRoot = path.join(targetRepository, "ui/web/src/design-system");
const manifestPath = path.join(targetRoot, "enterprise-sync.json");

function hash(contents) {
  return createHash("sha256").update(contents).digest("hex");
}

function sourceRevision() {
  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  }).trim();
}

async function sourceManifest() {
  const files = {};
  for (const relativePath of syncedFiles) {
    files[relativePath] = hash(await readFile(path.join(sourceRoot, relativePath)));
  }
  return {
    schemaVersion: 1,
    source: {
      repository: sourceRepository,
      revision: sourceRevision(),
    },
    files,
  };
}

async function listFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(path.join(directory, entry.name), relativePath)));
    } else {
      files.push(relativePath);
    }
  }
  return files.sort();
}

async function writeSync() {
  const manifest = await sourceManifest();
  for (const relativePath of syncedFiles) {
    const destination = path.join(targetRoot, relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(sourceRoot, relativePath), destination);
  }
  await mkdir(targetRoot, { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Synced ${syncedFiles.length} Enterprise foundation files to ${targetRepository}`);
}

async function checkSync() {
  const expected = await sourceManifest();
  const actual = JSON.parse(await readFile(manifestPath, "utf8"));
  const failures = [];

  for (const relativePath of syncedFiles) {
    const sourceContents = await readFile(path.join(sourceRoot, relativePath));
    const targetContents = await readFile(path.join(targetRoot, relativePath));
    const sourceHash = hash(sourceContents);
    const targetHash = hash(targetContents);
    if (sourceHash !== targetHash) failures.push(`${relativePath}: target differs from source`);
    if (actual.files?.[relativePath] !== sourceHash) failures.push(`${relativePath}: manifest hash is stale`);
  }

  const targetEnterpriseFiles = (await listFiles(path.join(targetRoot, "enterprise"))).map(
    (relativePath) => `enterprise/${relativePath}`,
  );
  const expectedEnterpriseFiles = syncedFiles.filter((relativePath) => relativePath.startsWith("enterprise/"));
  for (const relativePath of targetEnterpriseFiles) {
    if (!expectedEnterpriseFiles.includes(relativePath)) failures.push(`${relativePath}: untracked vendored file`);
  }

  if (JSON.stringify(actual.files) !== JSON.stringify(expected.files)) {
    failures.push("enterprise-sync.json: file inventory differs from source");
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log(`Enterprise foundation parity verified (${syncedFiles.length} files)`);
}

if (mode === "write") await writeSync();
else await checkSync();

