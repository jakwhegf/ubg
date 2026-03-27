t = open("js/bundle.js", encoding="utf-8", errors="ignore").read()
i = t.find("onPlayBtnClick")
open("_play_extract.txt", "w", encoding="utf-8").write(t[i : i + 2500])
