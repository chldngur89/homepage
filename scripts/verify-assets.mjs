import { access, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

const requiredAssets = [
  "public/favicon.png",
  "public/apple-touch-icon.png",
  "public/flow/flow-scenario.png",
  "public/flow/flow-watermelon.png",
  "public/flow/flow-form.png",
  "public/flow/flow-dashboard.png",
];

function detectFormat(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }

  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "jpeg";
  }

  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "webp";
  }

  if (
    buffer.length >= 6 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46
  ) {
    return "gif";
  }

  return "unknown";
}

function normalizeExpectedExtension(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".jpg") {
    return "jpeg";
  }

  return extension.replace(".", "");
}

const failures = [];

for (const relativePath of requiredAssets) {
  const absolutePath = path.join(projectRoot, relativePath);

  try {
    await access(absolutePath);
    const file = await readFile(absolutePath);
    const actualFormat = detectFormat(file.subarray(0, 16));
    const expectedFormat = normalizeExpectedExtension(relativePath);

    if (actualFormat !== expectedFormat) {
      failures.push(
        `${relativePath}: expected ${expectedFormat}, got ${actualFormat}`,
      );
    }
  } catch (error) {
    failures.push(
      `${relativePath}: ${(error instanceof Error ? error.message : String(error))}`,
    );
  }
}

if (failures.length > 0) {
  console.error("[verify-assets] asset format check failed");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`[verify-assets] ${requiredAssets.length} assets verified`);
