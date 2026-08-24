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
  var queryRoute = new URLSearchParams(window.location.search).get("cometRoute");
  var dayMatch = pathname.match(/\\/ngay\\/(\\d+\\.html)$/);
  var folderMatch = pathname.match(/\\/(lo-trinh|quiz-lab|on-tap)\\/index\\.html$/);
  var route = queryRoute || (dayMatch ? "/ngay/" + dayMatch[1] : folderMatch ? "/" + folderMatch[1] : "/");
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

const readBinaryAsDataUri = async (fileUrl) => `data:image/png;base64,${(await readFile(fileUrl)).toString("base64")}`;

const replaceKnownAssets = (value, replacements) => replacements.reduce(
  (result, [remoteName, dataUri]) => result.replaceAll(`/manus-storage/${remoteName}`, dataUri),
  value
);

const prepareSelfContainedHtml = (html, css, js, replacements) => {
  let result = replaceKnownAssets(html, replacements);
  let inlineCss = replaceKnownAssets(css, replacements);
  let inlineJs = replaceKnownAssets(js, replacements);
  result = result
    .replace(/<link rel="stylesheet"[^>]*>/, `<style>${inlineCss}</style>`)
    .replace(/\s*<script type="module"[^>]*><\/script>/, "")
    .replace(/\s*<script src="[^\"]*debug-collector\.js" defer><\/script>/, "")
    .replace(/\s*<script defer src="https:\/\/manus-analytics\.com\/umami"[^>]*><\/script>/, "")
    .replace(/\s*<script id="manus-runtime">[\s\S]*?<\/script>/, "")
    .replace("</head>", `${cometPathShim}\n  </head>`)
    .replace("</body>", `<script>${inlineJs}</script>\n  </body>`);
  return result;
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(sourceDir, outputDir, { recursive: true });

const assetReplacements = [];
for (const [remoteName, localName] of localAssets) {
  const dataUri = await readBinaryAsDataUri(new URL(`../../webdev-static-assets/${localName}`, import.meta.url));
  assetReplacements.push([remoteName, dataUri]);
}

const builtFiles = await readdir(new URL("assets/", sourceDir));
const cssFile = builtFiles.find((fileName) => fileName.endsWith(".css"));
const jsFile = builtFiles.find((fileName) => fileName.endsWith(".js"));
if (!cssFile || !jsFile) throw new Error("Không tìm thấy CSS/JS production trong dist/public/assets");
const css = await readFile(new URL(`assets/${cssFile}`, sourceDir), "utf8");
const js = await readFile(new URL(`assets/${jsFile}`, sourceDir), "utf8");
const rootHtml = await readFile(new URL("index.html", sourceDir), "utf8");

await writeFile(new URL("index.html", outputDir), prepareSelfContainedHtml(rootHtml, css, js, assetReplacements));
const routeRedirect = (route, prefix = "../") => `<!doctype html><meta charset="utf-8"><title>48 Ngày Lấy Gốc Tiếng Anh</title><script>window.location.replace("${prefix}index.html?cometRoute=${route}");</script><p>Đang mở workbook… <a href="${prefix}index.html?cometRoute=${route}">Bấm vào đây nếu cần</a>.</p>`;
await mkdir(new URL("ngay/", outputDir), { recursive: true });
for (let day = 1; day <= 48; day += 1) await writeFile(new URL(`ngay/${String(day).padStart(2, "0")}.html`, outputDir), routeRedirect(`/ngay/${String(day).padStart(2, "0")}.html`));
for (const route of ["lo-trinh", "quiz-lab", "on-tap"]) {
  const routeDir = new URL(`${route}/`, outputDir);
  await mkdir(routeDir, { recursive: true });
  await writeFile(new URL("index.html", routeDir), routeRedirect(`/${route}`));
}
await rm(new URL("assets/", outputDir), { recursive: true, force: true });

const readme = `# 48 Ngày Lấy Gốc Tiếng Anh — Gói Comet tự chạy

Đây là bản HTML self-contained tối ưu. File gốc \`index.html\` chứa trực tiếp JavaScript, CSS và ảnh thương hiệu; các file route nested là file chuyển tiếp rất nhỏ về file gốc kèm route cần hiển thị. Có thể mở trực tiếp bằng cách bấm đúp trên Windows/Comet, không cần cài Node.js, Python hoặc chạy máy chủ.

## Cách chạy

1. Giải nén ZIP vào một thư mục bình thường.
2. Mở thư mục \`comet-preview-48-day-workbook\`.
3. Bấm đúp vào \`index.html\`.

Các file có thể mở trực tiếp gồm \`ngay/01.html\` đến \`ngay/48.html\`, \`quiz-lab/index.html\`, \`lo-trinh/index.html\` và \`on-tap/index.html\`. Các file này tự chuyển về \`index.html\` và giữ đúng route trong chế độ \`file://\` trên Windows.

Nếu Comet vẫn áp dụng chính sách chặn file local, dùng phương án dự phòng:

\`\`\`bash
python3 -m http.server 4173
\`\`\`

rồi mở \`http://localhost:4173/\`. Bản self-contained không phụ thuộc ảnh hoặc JavaScript bên ngoài; font Google có thể dùng font dự phòng nếu offline.

Tiến trình học và SRS lưu trong localStorage của Comet. Quyền microphone chỉ cần cấp khi muốn thử ghi âm.
`;
await writeFile(new URL("README-COMET.md", outputDir), readme);

console.log(`Self-contained Comet preview written to ${outputDir.pathname}`);
