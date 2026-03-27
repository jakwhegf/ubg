# Mirror sub1 3D + card assets from Y8 storage (BFS from GameScene.ls + card list).
import os
import posixpath
import re
import urllib.request

BASE = "https://storage.y8.com/y8-studio/html5/Yomitoo/super-umo-v111/"
ROOT = os.path.dirname(os.path.abspath(__file__))
PREFIX = "sub1/res/3d/GameScene/Conventional/"
SCENE_REL = PREFIX + "GameScene.ls"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

ASSET_EXT = re.compile(
    r'"((?:Assets|Resources)/[^"]+\.(?:ls|lh|lm|lmat|lani|png|jpg|jpeg|tga|ktx|dds))"',
    re.IGNORECASE,
)
LMAT_TEX = re.compile(
    r'"path"\s*:\s*"([^"]+\.(?:png|jpg|jpeg|tga|ktx|dds))"',
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


def rel_under_conventional(asset_path: str) -> str:
    p = asset_path.replace("\\\\", "/").replace("\\", "/")
    return PREFIX + p


def collect_paths(text: str) -> set[str]:
    out = set()
    for m in ASSET_EXT.finditer(text):
        p = m.group(1).replace("\\\\", "/")
        if ".." in p:
            continue
        out.add(rel_under_conventional(p))
    return out


def collect_lmat_textures(lmat_rel: str, text: str) -> set[str]:
    """Resolve texture paths in a .lmat relative to the material file's directory."""
    out = set()
    base_dir = posixpath.dirname(lmat_rel.replace("\\", "/"))
    for m in LMAT_TEX.finditer(text):
        raw = m.group(1).replace("\\", "/")
        if raw.startswith(("Assets/", "Resources/")):
            out.add(rel_under_conventional(raw))
            continue
        full = posixpath.normpath(posixpath.join(base_dir, raw))
        if ".." in full.split("/"):
            continue
        out.add(full)
    return out


def initial_card_paths() -> set[str]:
    cp = "sub1/res/Cards"
    s = {
        f"{cp}/BlankCard.png",
        f"{cp}/DrawFour.png",
        f"{cp}/Wild.png",
    }
    for c in range(1, 5):
        s.add(f"{cp}/DrawTwo_{c}.png")
        s.add(f"{cp}/Number_{c}.png")
        s.add(f"{cp}/Reverse_{c}.png")
        s.add(f"{cp}/Skip_{c}.png")
    for n in range(10):
        s.add(f"{cp}/Numbers/Number_{n}.png")
        s.add(f"{cp}/Numbers/Corners/Number_{n}.png")
    return s


def main():
    scene_path = os.path.join(ROOT, *SCENE_REL.split("/"))
    if not os.path.isfile(scene_path):
        print("Missing local GameScene.ls; download it first:", SCENE_REL)
        return

    pending: set[str] = initial_card_paths() | collect_paths(
        open(scene_path, encoding="utf-8").read()
    )
    done: set[str] = set()
    round_n = 0
    while pending:
        round_n += 1
        if round_n > 50:
            print("Stop: too many BFS rounds")
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
            if rel.endswith(".ls") and data[:1] in (b"{", b"["):
                try:
                    text = data.decode("utf-8")
                except UnicodeDecodeError:
                    continue
                for r2 in collect_paths(text):
                    if r2 not in done:
                        pending.add(r2)
            if rel.endswith(".lmat"):
                try:
                    t = data.decode("utf-8")
                except UnicodeDecodeError:
                    continue
                for r2 in collect_lmat_textures(rel, t):
                    if r2 not in done:
                        pending.add(r2)
    # Materials downloaded in a prior run may still need sibling texture files.
    conv = os.path.join(ROOT, *PREFIX.split("/"))
    if os.path.isdir(conv):
        for dirpath, _, files in os.walk(conv):
            for fn in files:
                if not fn.endswith(".lmat"):
                    continue
                abs_p = os.path.join(dirpath, fn)
                rel = os.path.relpath(abs_p, ROOT).replace("\\", "/")
                try:
                    t = open(abs_p, encoding="utf-8").read()
                except OSError:
                    continue
                for r2 in collect_lmat_textures(rel, t):
                    if r2 not in done:
                        pending.add(r2)
        while pending:
            batch = sorted(pending)
            pending = set()
            for rel in batch:
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
                            pending.add(r2)
    print("Finished. Unique URLs touched:", len(done))


if __name__ == "__main__":
    main()
