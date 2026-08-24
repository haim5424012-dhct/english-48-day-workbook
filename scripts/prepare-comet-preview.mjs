import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";

const sourceDir = new URL("../dist/public/", import.meta.url);
const outputDir = new URL("../../comet-preview-48-day-workbook/", import.meta.url);
const assetDir = new URL("assets/", outputDir);
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
  var folderMatch = pathname.match(/\/(lo-trinh|quiz-lab|on-tap|tong-ket)\/index\.html$/);
  var route = queryRoute || (dayMatch ? "/ngay/" + dayMatch[1] : folderMatch ? "/" + folderMatch[1] : "/");
  window.__COMET_PREVIEW_PATH__ = route;
  window.__COMET_PREVIEW_ROOT__ = pathname.slice(0, pathname.lastIndexOf("/") + 1);
  function resolve(href) {
    if (!href || href.charAt(0) !== "/") return null;
    var hashIndex = href.indexOf("#");
    var path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    var hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    var targetRoute = path === "" || path === "/" ? "/" : path;
    return window.__COMET_PREVIEW_ROOT__ + "index.html?cometRoute=" + encodeURIComponent(targetRoute) + hash;
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

const replaceAssetUrls = (value, mode, assetPrefix, assetData) => localAssets.reduce((result, [remoteName, localName]) => {
  if (mode === "js") {
    const inline = assetData?.[localName];
    const replacement = inline ? JSON.stringify(inline) : `window.__COMET_PREVIEW_ROOT__ + "assets/${localName}"`;
    return result
      .replaceAll(`"/manus-storage/${remoteName}"`, replacement)
      .replaceAll(`'/manus-storage/${remoteName}'`, replacement);
  }
  const replacement = assetData?.[localName] ?? `${assetPrefix}assets/${localName}`;
  return result.replaceAll(`/manus-storage/${remoteName}`, replacement);
}, value);

const prepareHtml = (html, css, js, assetPrefix, assetData) => html
  .replace(/<link rel="preconnect"[^>]*>/g, "")
  .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "")
  .replace(/\s*<script src="[^\"]*debug-collector\.js" defer><\/script>/g, "")
  .replace(/\s*<script defer src="https:\/\/manus-analytics\.com\/umami"[^>]*><\/script>/g, "")
  .replace(/<link rel="stylesheet"[^>]*>/, `<style>${replaceAssetUrls(css, "html", assetPrefix, assetData)}</style>`)
  .replace(/\s*<script type="module"[^>]*><\/script>/, "")
  .replace("</head>", `${cometPathShim}\n  </head>`)
  .replace("</body>", `<script>${replaceAssetUrls(js, "js", assetPrefix, assetData)}</script>\n  </body>`);

const routeShell = (route) => `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><title>48 Ngày Lấy Gốc Tiếng Anh</title><script>(function(){var q=${JSON.stringify(route)};var base=location.pathname.slice(0,location.pathname.lastIndexOf("/")+1);location.replace(base+"index.html?cometRoute="+encodeURIComponent(q));})();</script></head><body>Đang mở bài học…</body></html>`;

await rm(outputDir, { recursive: true, force: true });
await mkdir(assetDir, { recursive: true });
const assetData = {};
for (const [remoteName, localName] of localAssets) {
  const source = new URL(`../../webdev-static-assets/${localName}`, import.meta.url);
  await cp(source, new URL(localName, assetDir));
  const bytes = await readFile(source);
  assetData[localName] = `data:image/png;base64,${bytes.toString("base64")}`;
}

const builtFiles = await readdir(new URL("assets/", sourceDir));
const cssFile = builtFiles.find((fileName) => fileName.endsWith(".css"));
const jsFile = builtFiles.find((fileName) => fileName.endsWith(".js"));
if (!cssFile || !jsFile) throw new Error("Không tìm thấy CSS/JS production trong dist/public/assets");
const css = await readFile(new URL(`assets/${cssFile}`, sourceDir), "utf8");
const js = await readFile(new URL(`assets/${jsFile}`, sourceDir), "utf8");
const rootHtml = await readFile(new URL("index.html", sourceDir), "utf8");

await writeFile(new URL("index.html", outputDir), prepareHtml(rootHtml, css, js, "./", assetData));
await mkdir(new URL("ngay/", outputDir), { recursive: true });
for (let day = 1; day <= 48; day += 1) await writeFile(new URL(`ngay/${String(day).padStart(2, "0")}.html`, outputDir), routeShell(`/ngay/${String(day).padStart(2, "0")}.html`));
for (const route of ["lo-trinh", "quiz-lab", "on-tap", "tong-ket"]) {
  const routeDir = new URL(`${route}/`, outputDir);
  await mkdir(routeDir, { recursive: true });
  await writeFile(new URL("index.html", routeDir), routeShell(`/${route}`));
}

const readme = `# 48 Ngày Lấy Gốc Tiếng Anh — Gói Comet tương thích cao

Bản này dùng một \`index.html\` trung tâm tự chứa JavaScript, CSS và toàn bộ 4 ảnh dưới dạng data URI. Các file trong \`ngay/\`, \`quiz-lab/\` và \`on-tap/\` chỉ là file mở bài rồi chuyển về index trung tâm; vì vậy không phụ thuộc ảnh hoặc bundle nằm ngoài file gốc.

## Cách chạy

Giải nén toàn bộ ZIP vào một thư mục cố định, không mở bản xem trước trong thư mục \`AppData\\Local\\Temp\`. Bấm đúp \`index.html\`. Sau đó bấm thẻ \`LESSON / 01\`; ứng dụng sẽ hiển thị Bài 1 ngay trong index trung tâm.

Nếu Comet chặn JavaScript từ file local, bấm đúp \`start-comet-preview.bat\`; launcher sẽ chạy localhost bằng Python nếu máy đã có \`py\` hoặc \`python\`.

Gói gồm 1 HTML trung tâm tự chứa, 52 route shell, 4 ảnh dự phòng và QA report. Không có module script, Google Fonts, analytics hoặc asset mạng bắt buộc.
`;
await writeFile(new URL("README-COMET.md", outputDir), readme);
const windowsLauncher = `@echo off
cd /d "%~dp0"
where py >nul 2>nul && (start "48 Ngay English" cmd /k "py -m http.server 4173" & timeout /t 2 >nul & start "" "http://localhost:4173/" & exit /b)
where python >nul 2>nul && (start "48 Ngay English" cmd /k "python -m http.server 4173" & timeout /t 2 >nul & start "" "http://localhost:4173/" & exit /b)
echo Khong tim thay Python. Hay mo PowerShell tai thu muc nay va chay: py -m http.server 4173
pause
`;
await writeFile(new URL("start-comet-preview.bat", outputDir), windowsLauncher);
console.log(`Comet compatible preview written to ${outputDir.pathname}`);
console.log(`Central HTML size: ${(Buffer.byteLength(await readFile(new URL("index.html", outputDir))) / 1024 / 1024).toFixed(1)} MB`);

