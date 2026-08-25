/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * this is a working shelf, not a generic file manager; use paper cards,
 * ledger metadata, clear source labels, and tactile status marks.
 */
import { ArrowUpRight, BookOpen, FileText, FolderOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import materialsData from "../data/drive-materials.json";
import { assetPath, routePath } from "../lib/routes";

type Material = (typeof materialsData.items)[number];

const materials = materialsData.items as Material[];
const categories = ["Tất cả", ...Array.from(new Set(materials.map((item) => item.category)))];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function MaterialsHeader() {
  const [, setLocation] = useLocation();
  return (
    <header className="topbar materials-topbar">
      <button className="brand brand-button" onClick={() => setLocation(routePath("/"))} aria-label="Về lộ trình 48 ngày">
        <span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span>
        <span className="brand-label-badge">48</span>
        <span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span>
      </button>
      <nav className="topnav roadmap-nav" aria-label="Điều hướng chính">
        <a href={routePath("/lo-trinh")}>Lộ trình</a>
        <a href={routePath("/ngay/01.html")}>Bài học</a>
        <a href={routePath("/tong-ket")}>Tổng kết</a>
        <a href={routePath("/quiz-lab")}>Phòng quiz</a>
        <a className="is-active" href={routePath("/tai-lieu")}>Tài liệu học</a>
      </nav>
    </header>
  );
}

export default function Materials() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return materials.filter((item) => {
      const matchesCategory = category === "Tất cả" || item.category === category;
      const matchesQuery = !normalized || `${item.name} ${item.category} ${item.format}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);
  const categoryCounts = useMemo(() => categories.slice(1).map((name) => ({ name, count: materials.filter((item) => item.category === name).length })), []);

  return (
    <div className="app-shell materials-page">
      <MaterialsHeader />
      <main>
        <section className="materials-hero">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> 48 NGÀY / KHO TÀI LIỆU</div>
            <h1>Tài liệu học<br /><em>đã xếp ngăn.</em></h1>
            <p>Danh mục bổ trợ cho hành trình <strong>48 ngày — 06 bước</strong>. Các bản gốc được giữ trên Google Drive để bạn mở, tải xuống hoặc tiếp tục ghi chú khi cần.</p>
          </div>
          <aside className="materials-stat-card">
            <span className="tiny-label">SỔ TÀI LIỆU / 48 NGÀY</span>
            <strong>{materialsData.count}</strong>
            <span>{materialsData.count} tài liệu · {formatBytes(materialsData.totalBytes)}</span>
            <small>Bản gốc: Google Drive · đồng bộ {materialsData.syncedAt}</small>
          </aside>
        </section>

        <section className="materials-path" aria-label="Tài liệu trong phương pháp học"><span className="materials-path-label">ĐƯỜNG ĐI HỌC</span><strong>01 Nghe</strong><i>→</i><strong>02 Ngữ pháp</strong><i>→</i><strong>03 Điền & kiểm tra</strong><i>→</i><strong>04 Nói · 05 Viết · 06 Ôn tập</strong><span className="materials-path-note">Tài liệu này là ngăn bổ trợ — không thay thế sáu bước của bài học.</span></section>

        <section className="materials-toolbar" aria-label="Lọc tài liệu">
          <label className="materials-search"><Search size={17} /><span className="sr-only">Tìm tài liệu</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên, nhóm hoặc định dạng..." /></label>
          <div className="materials-filters" role="list" aria-label="Nhóm tài liệu">
            {categories.map((name) => <button key={name} className={category === name ? "is-selected" : ""} onClick={() => setCategory(name)}>{name}{name !== "Tất cả" && <small>{categoryCounts.find((item) => item.name === name)?.count}</small>}</button>)}
          </div>
        </section>

        <section className="materials-ledger" aria-live="polite">
          <div className="materials-ledger-head"><div><span className="section-kicker">SỔ GHI / {filtered.length} MỤC TÀI LIỆU</span><p className="materials-ledger-caption">Mỗi thẻ là một record có thể mở lại trong lúc học hoặc dùng làm tài liệu tham khảo.</p></div><span className="materials-note"><FolderOpen size={15} /> Bản gốc vẫn nằm trên Drive</span></div>
          <div className="materials-grid">
            {filtered.map((item, index) => <article className="material-card" key={item.id}>
              <div className="material-card-top"><span className="material-index">MỤC / {String(index + 1).padStart(2, "0")}</span><span className="material-format"><FileText size={14} /> {item.format}</span></div>
              <h2>{item.name}</h2>
              <div className="material-meta"><span>{item.category}</span><span>{formatBytes(item.size)}</span></div>
              <div className="material-card-foot"><span className="material-source-stamp">DRIVE / BẢN GỐC</span><a className="material-open" href={item.webViewLink} target="_blank" rel="noreferrer">Mở tài liệu <ArrowUpRight size={16} /></a></div>
            </article>)}
          </div>
          {filtered.length === 0 && <div className="materials-empty"><BookOpen size={21} /><strong>Chưa có bản ghi phù hợp.</strong><span>Thử một từ khóa khác hoặc chọn lại nhóm tài liệu.</span></div>}
        </section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><img src={assetPath("/assets/english-workbook-mark.png")} alt="" /></span><span className="brand-label-badge">48</span><span><strong>48 NGÀY</strong><small>LẤY GỐC TIẾNG ANH</small></span></div><p>Ngăn tài liệu · Giữ nguyên bản gốc.</p><span className="footer-note">{materials.length} mục đã lập chỉ mục</span></footer>
    </div>
  );
}
