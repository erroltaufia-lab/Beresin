#!/bin/zsh
# Builds a shareable static demo into ./demo-build/.
# The artifact host does not serve pages at the domain root, so this flattens
# every route to a root-level .html, makes asset refs relative, and injects a
# click handler so the browser follows real links instead of Next's router.
set -e
export PATH="$HOME/.local/node/bin:$PATH"
ROOT="${0:A:h}"
cd "$ROOT"
RESTORE=0
[ -f next.config.ts ] && cp next.config.ts /tmp/beresin.config.bak && RESTORE=1
cat > next.config.ts <<'CFG'
import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
CFG
rm -rf out demo-build
npx next build
if [ $RESTORE -eq 1 ]; then cp /tmp/beresin.config.bak next.config.ts; else rm -f next.config.ts; fi
cp -R out demo-build

python3 - "$ROOT/demo-build" <<'PY'
import pathlib, re, shutil, sys
root = pathlib.Path(sys.argv[1])
SHIM = b'''<script>
(function () {
  function flat(href) {
    var hash = "", query = "", i = href.indexOf("#");
    if (i >= 0) { hash = href.slice(i); href = href.slice(0, i); }
    i = href.indexOf("?");
    if (i >= 0) { query = href.slice(i); href = href.slice(0, i); }
    var p = href.replace(/^\\/+|\\/+$/g, "");
    return (p === "" ? "index.html" : p.split("/").join("-") + ".html") + query + hash;
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.assign(href.charAt(0) === "/" ? flat(href) : href);
  }, true);
  var push = history.pushState;
  history.pushState = function (state, title, url) {
    if (typeof url === "string" && url.charAt(0) === "/") { window.location.assign(flat(url)); return; }
    return push.apply(history, arguments);
  };
})();
</script>'''
for junk in ("_not-found", "404"):
    p = root / junk
    if p.is_dir(): shutil.rmtree(p)
for t in root.rglob("*.txt"): t.unlink()
nxt = root / "_next"
if nxt.is_dir(): nxt.rename(root / "assets")
routes = {"/": "index.html"}
for h in sorted(root.rglob("index.html")):
    rel = h.relative_to(root)
    if rel == pathlib.Path("index.html"): continue
    segs = rel.parts[:-1]
    routes["/" + "/".join(segs) + "/"] = "-".join(segs) + ".html"
    h.rename(root / ("-".join(segs) + ".html"))
for d in sorted(root.rglob("*"), key=lambda p: -len(p.parts)):
    if d.is_dir() and "assets" not in d.parts and not any(d.iterdir()): d.rmdir()
ordered = sorted(routes.items(), key=lambda kv: -len(kv[0]))
for f in root.rglob("*"):
    if not f.is_file(): continue
    b = f.read_bytes(); o = b
    b = b.replace(b"/_next/", b"assets/")
    for q in (b'"', b"'", b'\\"'): b = b.replace(q + b"/assets/", q + b"assets/")
    if f.suffix == ".html":
        for route, flat in ordered:
            if route == "/": continue
            b = b.replace(b'"' + route.encode() + b'"', b'"' + flat.encode() + b'"')
            b = b.replace(b'\\"' + route.encode() + b'\\"', b'\\"' + flat.encode() + b'\\"')
        b = b.replace(b'href="/"', b'href="index.html"')
    if b != o: f.write_bytes(b)
doomed = [f for f in root.rglob("*") if f.is_file() and b"\xef\xbf\xbd" in f.read_bytes()]
names = [f.name for f in doomed]
for f in doomed: f.unlink()
for h in root.rglob("*.html"):
    b = h.read_bytes()
    for nm in names:
        b = re.sub(rb"<script[^>]*" + re.escape(nm.encode()) + rb"[^>]*></script>", b"", b)
    if b"location.assign(href)" not in b:
        b = b.replace(b"<head>", b"<head>" + SHIM, 1) if b"<head>" in b else SHIM + b
    h.write_bytes(b)
n = sum(1 for f in root.rglob("*") if f.is_file())
print(f"demo-build: {n} files, {len(routes)} routes")
PY
echo "Done -> $ROOT/demo-build"
