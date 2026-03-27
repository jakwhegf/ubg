"""Download background000.lh and referenced assets from Y8 storage."""
import os
import posixpath
import re
import urllib.request

BASE = "https://storage.y8.com/y8-studio/html5/Yomitoo/super-umo-v111/"
ROOT = os.path.dirname(os.path.abspath(__file__))
BG_PREFIX = "sub1/res/3d/backgrounds/Conventional/"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

ASSET_EXT = re.compile(
    r'"((?:Assets|Resources)/[^"]+\.(?:ls|lh|lm|lmat|lani|png|jpg|jpeg|tga))"',
    re.IGNORECASE,
)
LMAT_TEX = re.compile(
    r'"path"\s*:\s*"([^"]+\.(?:png|jpg|jpeg|tga))"',
    re.IGNORECASE,
)


def fetch(rel: str) -> tuple[bool, bytes | None]:
    rel = rel.replace("\\", "/").lstrip("/")
    url = BASE + rel
    out = os.path.join(ROOT, *rel.split("/"))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if os.path.isfile(out) and os.path.getsize(out) > 0:
        with open(out, "rb") as f:
            return True, f.read()
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            data = r.read()
    except Exception as e:
        print("FAIL", rel, e)
        return False, None
    with open(out, "wb") as f:
        f.write(data)
    print("OK", rel, len(data))
    return True, data


def collect_paths(text: str) -> set[str]:
    out = set()
    for m in ASSET_EXT.finditer(text):
        p = m.group(1).replace("\\\\", "/")
        if ".." in p:
            continue
        out.add(BG_PREFIX + p)
    return out


def collect_lmat_textures(lmat_rel: str, text: str) -> set[str]:
    out = set()
    base_dir = posixpath.dirname(lmat_rel.replace("\\", "/"))
    for m in LMAT_TEX.finditer(text):
        raw = m.group(1).replace("\\", "/")
        if raw.startswith(("Assets/", "Resources/")):
            out.add(BG_PREFIX + raw)
            continue
        full = posixpath.normpath(posixpath.join(base_dir, raw))
        if ".." in full.split("/"):
            continue
        out.add(full)
    return out


def main():
    pending: set[str] = {BG_PREFIX + "background000.lh"}
    done: set[str] = set()
    for _round in range(50):
        if not pending:
            break
        batch = sorted(pending)
        pending = set()
        for rel in batch:
            if rel in done:
                continue
            done.add(rel)
            ok, data = fetch(rel)
            if not ok or not data:
                continue
            if data[:1] not in (b"{", b"["):
                continue
            try:
                text = data.decode("utf-8")
            except UnicodeDecodeError:
                continue
            for r2 in collect_paths(text):
                if r2 not in done:
                    pending.add(r2)
            if rel.endswith(".lmat"):
                for r2 in collect_lmat_textures(rel, text):
                    if r2 not in done:
                        pending.add(r2)
    conv = os.path.join(ROOT, *BG_PREFIX.split("/"))
    if os.path.isdir(conv):
        more: set[str] = set()
        for dirpath, _, files in os.walk(conv):
            for fn in files:
                if not fn.endswith(".lmat"):
                    continue
                abs_p = os.path.join(dirpath, fn)
                rel = os.path.relpath(abs_p, ROOT).replace("\\", "/")
                t = open(abs_p, encoding="utf-8").read()
                for r2 in collect_lmat_textures(rel, t):
                    if r2 not in done:
                        more.add(r2)
        while more:
            rel = more.pop()
            if rel in done:
                continue
            done.add(rel)
            ok, data = fetch(rel)
            if ok and data and rel.endswith(".lmat"):
                try:
                    t = data.decode("utf-8")
                except UnicodeDecodeError:
                    continue
                for r2 in collect_lmat_textures(rel, t):
                    if r2 not in done:
                        more.add(r2)
    print("Finished. Unique:", len(done))


if __name__ == "__main__":
    main()
