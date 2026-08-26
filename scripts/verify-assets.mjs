import { access, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

const requiredAssets = ["public/favicon.png", "public/apple-touch-icon.png"];

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

// 아직 실제 사진으로 교체되지 않은 이미지 슬롯을 알린다.
//
// 예전 패턴은 `/src:\s*"([^"]+)"[\s\S]*?sample:\s*true/g` 였다. `[\s\S]*?` 가
// 객체 리터럴 경계를 그냥 넘어가기 때문에, 슬롯 하나라도 `sample: false` 로
// 바뀌는 순간 짝이 어긋난다 — 이미 교체가 끝난 슬롯의 src 를 뒤쪽 슬롯의
// `sample: true` 와 묶어 "아직 샘플" 로 보고하고, 정작 아직 샘플인 슬롯은
// 목록에서 사라진다. 네 슬롯이 전부 `sample: true` 인 동안만 우연히 맞았고,
// 클라이언트의 첫 실제 사진이 들어오는 날부터 거짓말을 시작한다.
//
// 그래서 IMAGE_SLOTS 본문을 슬롯 객체 블록 단위로 먼저 쪼갠 뒤, 각 블록
// 안에서만 src 와 sample 을 읽는다. 블록 밖으로 나갈 수 있는 패턴을 아예
// 쓰지 않으므로 짝이 어긋날 수 없다.
const imagesConfig = await readFile(
  path.join(projectRoot, "src/app/config/images.ts"),
  "utf8",
);

const registry = imagesConfig.match(/export const IMAGE_SLOTS[^=]*=\s*\{([\s\S]*?)\n\};/);

if (!registry) {
  console.error(
    "[verify-assets] src/app/config/images.ts 에서 IMAGE_SLOTS 본문을 찾지 못했다 — 샘플 이미지 경고가 무력화된 상태다",
  );
  process.exit(1);
}

const registryBody = registry[1];
// 중첩이 없는 슬롯 객체 하나하나. `[^{}]*` 라 블록을 벗어날 수 없다.
const slotBlocks = [...registryBody.matchAll(/\{([^{}]*)\}/g)].map((match) => match[1]);
// 레지스트리에 선언된 슬롯 키 개수(`persona: {`, `"voice-1": {` ...).
const declaredSlotCount = (
  registryBody.match(/^\s*(?:"[^"]+"|[A-Za-z_$][\w$]*)\s*:\s*\{/gm) ?? []
).length;

const slots = slotBlocks.map((block) => ({
  src: block.match(/src:\s*"([^"]+)"/)?.[1],
  sample: /sample:\s*true/.test(block),
}));

if (slots.length !== declaredSlotCount || slots.some((slot) => !slot.src)) {
  console.error(
    `[verify-assets] IMAGE_SLOTS 파싱 실패 — 선언된 슬롯 ${declaredSlotCount}개, 읽어낸 슬롯 ${slots.length}개`,
  );
  console.error(
    "  images.ts 의 구조가 바뀌었다면 이 스크립트의 파싱도 같이 고쳐야 한다. 그냥 두면 샘플 이미지가 조용히 배포된다.",
  );
  process.exit(1);
}

const pendingSamples = slots.filter((slot) => slot.sample).map((slot) => slot.src);

if (pendingSamples.length > 0) {
  console.warn(
    `[verify-assets] 아직 샘플인 이미지 ${pendingSamples.length}개 — 실제 사진으로 교체 필요`,
  );
  for (const src of pendingSamples) {
    console.warn(`  - public${src}`);
  }
}

/**
 * 공유 카드(og:image)가 실제로 있고 규격이 맞는지.
 *
 * 이 검사가 필요한 이유는 산출 HTML 만으로는 깨진 걸 알 수 없기 때문이다.
 * `check-html.mjs` 는 `<meta property="og:image">` 태그가 **있는지**만 볼 수
 * 있고, 그 URL 이 가리키는 파일이 사라졌는지는 모른다. 링크 미리보기가
 * 깨졌다는 사실은 남이 우리 링크를 공유한 뒤에야 드러난다.
 *
 * 크기까지 보는 이유: 1200×630 이 아니면 카카오톡·슬랙이 잘라내거나 작은
 * 정사각 썸네일로 떨어뜨린다. 파일이 있다고 카드가 제대로 뜨는 게 아니다.
 *
 * PNG 헤더에서 폭·높이를 직접 읽는다(IHDR 청크: 16바이트 오프셋부터 4바이트씩
 * 빅엔디언). 이미지 라이브러리를 새로 들이지 않으려는 것이다.
 */
const OG_IMAGES = ["/og/default-ko.png", "/og/default-en.png"];
const OG_SIZE = { width: 1200, height: 630 };

for (const src of OG_IMAGES) {
  const file = path.join(projectRoot, "public", src.slice(1));
  let buffer;
  try {
    buffer = await readFile(file);
  } catch {
    console.error(`[verify-assets] 공유 카드가 없다 — public${src}`);
    console.error(
      "  og:image 가 가리키는 파일이다. 없으면 링크 미리보기가 빈 카드로 뜬다.",
    );
    console.error("  원본은 assets/og/ 에 있다. README 의 '공유 카드' 절 참고.");
    process.exit(1);
  }

  if (detectFormat(buffer) !== "png") {
    console.error(`[verify-assets] 공유 카드가 PNG 가 아니다 — public${src}`);
    process.exit(1);
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  if (width !== OG_SIZE.width || height !== OG_SIZE.height) {
    console.error(
      `[verify-assets] 공유 카드 규격이 다르다 — public${src} 는 ${width}×${height}, ${OG_SIZE.width}×${OG_SIZE.height} 이어야 한다`,
    );
    console.error("  규격이 어긋나면 카카오톡·슬랙이 잘라내거나 작게 떨어뜨린다.");
    process.exit(1);
  }
}

console.log(`[verify-assets] 공유 카드 ${OG_IMAGES.length}개 확인 (1200×630)`);
