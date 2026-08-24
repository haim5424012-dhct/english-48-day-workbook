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
  var dayMatch = pathname.match(/\\/ngay\\/(\\d+\\.html)$/);
  var folderMatch = pathname.match(/\\/(lo-trinh|quiz-lab|on-tap)\\/index\\.html$/);
  var route = dayMatch ? "/ngay/" + dayMatch[1] : folderMatch ? "/" + folderMatch[1] : "/";
  window.__COMET_PREVIEW_PATH__ = route;
  var marker = pathname.search(/\\/(ngay|lo-trinh|quiz-lab|on-tap)(?:\\/|$)/);
  window.__COMET_PREVIEW_ROOT__ = marker >= 0 ? pathname.slice(0, marker + 1) : pathname.slice(0, pathname.lastIndexOf("/") + 1);
  function resolve(href) {
    if (!href || href.charAt(0) !== "/") return null;
    var hashIndex = href.indexOf("#");
    var path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    var hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    if (path === "" || path === "/") return window.__COMET_PREVIEW_ROOT__ + "index.html" + hash;
    if (path === "/quiz-lab" || path === "/on-tap" || path === "/lo-trinh") return window.__COMET_PREVIEW_ROOT__ + path.slice(1) + "/index.html" + hash;
    return window.__COMET_PREVIEW_ROOT__ + path.slice(1) + hash;
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

const replaceAssetUrls = (value, mode, assetPrefix) => localAssets.reduce((result, [remoteName, localName]) => {
  if (mode === "js") {
    const replacement = `window.__COMET_PREVIEW_ROOT__ + "assets/${localName}"`;
    return result
      .replaceAll(`"/manus-storage/${remoteName}"`, replacement)
      .replaceAll(`'/manus-storage/${remoteName}'`, replacement);
  }
  return result.replaceAll(`/manus-storage/${remoteName}`, `${assetPrefix}assets/${localName}`);
}, value);

const prepareHtml = (html, css, js, assetPrefix) => {
  let result = replaceAssetUrls(html, "html", assetPrefix)
    .replace(/<link rel="preconnect"[^>]*>/g, "")
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "")
    .replace(/\s*<script src="[^\"]*debug-collector\.js" defer><\/script>/g, "")
    .replace(/\s*<script defer src="https:\/\/manus-analytics\.com\/umami"[^>]*><\/script>/g, "")
    .replace(/<link rel="stylesheet"[^>]*>/, `<style>${replaceAssetUrls(css, "html", assetPrefix)}</style>`)
    .replace(/\s*<script type="module"[^>]*><\/script>/, "")
    .replace("</head>", `${cometPathShim}\n  </head>`)
    .replace("</body>", `<script>${replaceAssetUrls(js, "js", assetPrefix)}</script>\n  </body>`);
  return result;
};

await rm(outputDir, { recursive: true, force: true });
await mkdir(assetDir, { recursive: true });
for (const [, localName] of localAssets) await cp(new URL(`../../webdev-static-assets/${localName}`, import.meta.url), new URL(localName, assetDir));

const builtFiles = await readdir(new URL("assets/", sourceDir));
const cssFile = builtFiles.find((fileName) => fileName.endsWith(".css"));
const jsFile = builtFiles.find((fileName) => fileName.endsWith(".js"));
if (!cssFile || !jsFile) throw new Error("Không tìm thấy CSS/JS production trong dist/public/assets");
const css = await readFile(new URL(`assets/${cssFile}`, sourceDir), "utf8");
const js = await readFile(new URL(`assets/${jsFile}`, sourceDir), "utf8");
const rootHtml = await readFile(new URL("index.html", sourceDir), "utf8");

await writeFile(new URL("index.html", outputDir), prepareHtml(rootHtml, css, js, "./"));
await mkdir(new URL("ngay/", outputDir), { recursive: true });
for (let day = 1; day <= 48; day += 1) await writeFile(new URL(`ngay/${String(day).padStart(2, "0")}.html`, outputDir), prepareHtml(rootHtml, css, js, "../"));
for (const route of ["lo-trinh", "quiz-lab", "on-tap"]) {
  const routeDir = new URL(`${route}/`, outputDir);
  await mkdir(routeDir, { recursive: true });
  await writeFile(new URL("index.html", routeDir), prepareHtml(rootHtml, css, js, "../"));
}

const readme = `# 48 Ngày Lấy Gốc Tiếng Anh — Gói Comet tương thích cao

Mỗi file HTML trong gói đã nhúng trực tiếp JavaScript và CSS. Ảnh được giữ thành file local trong thư mục \`assets\` để tránh tạo file HTML quá lớn; các đường dẫn ảnh đều là relative path đúng theo từng thư mục route. Không có module script, analytics, Google Fonts hoặc asset mạng bắt buộc.

## Cách chạy

Giải nén gói, sau đó bấm đúp trực tiếp vào \`index.html\`, \`ngay/13.html\`, hoặc một route khác. Không cần Node.js, Python hay web server. Nếu Comet chặn JavaScript từ file local, hãy bật quyền chạy nội dung local cho thư mục này hoặc dùng phương án localhost:

\`\`\`bash
python3 -m http.server 4173
\`\`\`

Mở \`http://localhost:4173/\` sau khi chạy lệnh. Gói gồm 52 HTML, 4 ảnh local và QA report.

Trên Windows, có thể bấm đúp \`start-comet-preview.bat\`. File này thử dùng \`py\`, sau đó \`python\`, rồi mở trang tại \`http://localhost:4173/\`. Đây là phương án nên dùng nếu mở trực tiếp vẫn hiện trang trắng do chính sách bảo mật của Comet.
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
