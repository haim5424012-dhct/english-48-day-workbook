import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";

const sourceDir = new URL("../dist/public/", import.meta.url);
const outputDir = new URL("../../comet-preview-48-day-workbook/", import.meta.url);
const localAssets = [
  ["english-workbook-mark_c4f80e77.png", "english-workbook-mark.png"],
  ["english-workbook-hero_ff29b05e.png", "english-workbook-hero.png"],
  ["english-workbook-journey_ddf185cf.png", "english-workbook-journey.png"],
  ["english-workbook-paper-texture_e34801e7.png", "english-workbook-paper-texture.png"],
];

const cometPathShim = `<script>
(function () {
  if (window.location.protocol !== "file:") return;
  var pathname = decodeURIComponent(window.location.pathname).replace(/\\\\/g, "/");
  var dayMatch = pathname.match(/\\/ngay\\/(\\d+\\.html)$/);
  var folderMatch = pathname.match(/\\/(lo-trinh|quiz-lab|on-tap)\\/index\\.html$/);
  var route = dayMatch ? "/ngay/" + dayMatch[1] : folderMatch ? "/" + folderMatch[1] : "/";
  window.__COMET_PREVIEW_PATH__ = route;

  var marker = pathname.search(/\\/(ngay|lo-trinh|quiz-lab|on-tap)(?:\\/|$)/);
  var root = marker >= 0 ? pathname.slice(0, marker + 1) : pathname.slice(0, pathname.lastIndexOf("/") + 1);
  window.__COMET_PREVIEW_ROOT__ = root;
  function resolve(href) {
    if (!href || href.charAt(0) !== "/") return null;
    var hashIndex = href.indexOf("#");
    var path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    var hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    if (path === "" || path === "/") return root + "index.html" + hash;
    if (path === "/quiz-lab" || path === "/on-tap" || path === "/lo-trinh") return root + path.slice(1) + "/index.html" + hash;
    return root + path.slice(1) + hash;
  }
  document.addEventListener("click", function (event) {
    var anchor = event.target.closest && event.target.closest("a");
    if (!anchor) return;
    var target = resolve(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    window.location.href = target;
  }, true);
})();
</script>`;

const readHtml = async (fileUrl) => readFile(fileUrl, "utf8");
const prepareHtml = (html, assetPrefix) => localAssets.reduce(
  (result, [remoteName, localName]) => result.replaceAll(`/manus-storage/${remoteName}`, `${assetPrefix}assets/${localName}`),
  html
)
  .replace(/<script type="module" crossorigin src="[^\"]*assets\/([^\"]+)"><\/script>/, `<script defer src="${assetPrefix}assets/$1"></script>`)
  .replaceAll('href="./assets/', `href="${assetPrefix}assets/`)
  .replace(/<link rel="stylesheet" crossorigin /, '<link rel="stylesheet" ')
  .replace(/\s*<script src="[^\"]*debug-collector\.js" defer><\/script>/, "")
  .replace("</head>", `${cometPathShim}\n  </head>`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(sourceDir, outputDir, { recursive: true });
for (const [remoteName, localName] of localAssets) {
  await cp(new URL(`../../webdev-static-assets/${localName}`, import.meta.url), new URL(`assets/${localName}`, outputDir));
}
const cssFile = (await readdir(new URL("assets/", outputDir))).find((fileName) => fileName.endsWith(".css"));
if (cssFile) {
  let css = await readFile(new URL(`assets/${cssFile}`, outputDir), "utf8");
  for (const [remoteName, localName] of localAssets) {
    css = css.replaceAll(`/manus-storage/${remoteName}`, `./${localName}`);
  }
  await writeFile(new URL(`assets/${cssFile}`, outputDir), css);
}
const jsFile = (await readdir(new URL("assets/", outputDir))).find((fileName) => fileName.endsWith(".js"));
if (jsFile) {
  let js = await readFile(new URL(`assets/${jsFile}`, outputDir), "utf8");
  for (const [remoteName, localName] of localAssets) {
    js = js.replaceAll(`"/manus-storage/${remoteName}"`, `window.__COMET_PREVIEW_ROOT__ + "assets/${localName}"`);
  }
  await writeFile(new URL(`assets/${jsFile}`, outputDir), js);
}

const rootHtml = await readHtml(new URL("index.html", sourceDir));
await writeFile(new URL("index.html", outputDir), prepareHtml(rootHtml, "./"));

for (let day = 1; day <= 48; day += 1) {
  await mkdir(new URL("ngay/", outputDir), { recursive: true });
  await writeFile(new URL(`ngay/${String(day).padStart(2, "0")}.html`, outputDir), prepareHtml(rootHtml, "../"));
}

for (const route of ["lo-trinh", "quiz-lab", "on-tap"]) {
  const routeDir = new URL(`${route}/`, outputDir);
  await mkdir(routeDir, { recursive: true });
  await writeFile(new URL("index.html", routeDir), prepareHtml(rootHtml, "../"));
}

const readme = `# 48 Ngày Lấy Gốc Tiếng Anh — Gói chạy thử Comet

Đây là bản build tĩnh production đã được chuẩn bị để chạy bằng máy chủ cục bộ hoặc mở trực tiếp file HTML trên Windows/Comet.

## Cách chạy khuyến nghị

Giải nén gói, mở Terminal/PowerShell tại thư mục gói và chạy:

\`\`\`bash
python3 -m http.server 4173
\`\`\`

Sau đó mở Comet tại \`http://localhost:4173/\`. Nếu Windows không nhận \`python3\`, dùng \`py -m http.server 4173\`.

## Mở trực tiếp file HTML

Bạn cũng có thể bấm đúp vào \`index.html\` hoặc một file trong \`ngay/\`. Gói này đã dùng asset relative và route shim cho chế độ \`file://\`. Tuy vậy, chạy qua \`localhost\` vẫn là cách ổn định nhất.

Các URL thử nhanh khi chạy localhost:

- \`http://localhost:4173/\`
- \`http://localhost:4173/quiz-lab/\`
- \`http://localhost:4173/ngay/13.html\`
- \`http://localhost:4173/ngay/48.html\`

Gói có 48 trang Ngày, Lộ trình, Phòng quiz và Ôn tập. Các ảnh nhận diện chính đã được đóng gói local; Internet chỉ cần nếu bạn muốn tải font Google, còn trình duyệt vẫn có font dự phòng. Tiến trình học và SRS lưu trong localStorage của Comet.
`;
await writeFile(new URL("README-COMET.md", outputDir), readme);

console.log(`Comet preview written to ${outputDir.pathname}`);
