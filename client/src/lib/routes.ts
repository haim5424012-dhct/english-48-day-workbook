/* STYLE REMINDER — Route helpers stay invisible and reliable: preserve the workbook navigation across hosting roots. */

export function routePath(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "./" || base === ".") return path;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  if (path === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export function assetPath(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "./" || base === ".") return path;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripRouteBase(pathname: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "./" || base === ".") return pathname || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  if (pathname === normalizedBase || pathname === `${normalizedBase}/`) return "/";
  return pathname.startsWith(`${normalizedBase}/`) ? pathname.slice(normalizedBase.length) || "/" : pathname || "/";
}
