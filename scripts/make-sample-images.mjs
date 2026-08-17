import { promises as fs } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const outDir = path.join(process.cwd(), "public", "img");

const slots = [
  { name: "persona", width: 1200, height: 960 },
  { name: "voice-1", width: 400, height: 400 },
  { name: "voice-2", width: 400, height: 400 },
  { name: "footer-wide", width: 2400, height: 760 },
];

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([length, typeAndData, crc]);
}

/** 결정적 의사난수. 같은 좌표는 늘 같은 값을 낸다. */
function noise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function renderGray(width, height) {
  // 종이 질감: 은은한 세로 밝기 변화 + 가로 결 + 미세 노이즈
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(width * 3 + 1);
    row[0] = 0; // filter type: None
    const vertical = 214 - (y / height) * 18;
    const grain = Math.sin(y * 0.7) * 1.5;
    for (let x = 0; x < width; x++) {
      const speckle = (noise(x, y) - 0.5) * 7;
      const value = Math.max(0, Math.min(255, Math.round(vertical + grain + speckle)));
      const offset = 1 + x * 3;
      row[offset] = value;
      row[offset + 1] = value;
      row[offset + 2] = value;
    }
    rows.push(row);
  }
  return Buffer.concat(rows);
}

function encodePng(width, height) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  const idat = zlib.deflateSync(renderGray(width, height), { level: 9 });

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

await fs.mkdir(outDir, { recursive: true });

for (const slot of slots) {
  const file = path.join(outDir, `${slot.name}.png`);
  await fs.writeFile(file, encodePng(slot.width, slot.height));
  console.log(`[sample-images] ${slot.name}.png ${slot.width}x${slot.height}`);
}

console.log("[sample-images] 완료. 실제 사진을 같은 경로에 덮어쓰면 교체된다.");
