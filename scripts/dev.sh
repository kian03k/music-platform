#!/usr/bin/env bash
# 一键启动 music-platform 的三个服务：网易云 API(3000) → Flask(5000) → Vue(8080)
# 用法：bash scripts/dev.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN="$ROOT/.run"
mkdir -p "$RUN"

# 从 .env 读环境变量（可选）
if [ -f "$ROOT/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT/.env"
  set +a
fi

if [ -z "${MUSIC_DB_PASSWORD:-}" ]; then
  echo "✗ 未设置 MUSIC_DB_PASSWORD"
  echo "  export MUSIC_DB_PASSWORD=你的MySQL密码   或复制 .env.example 为 .env 再填"
  exit 1
fi

port_busy() { ss -lnt 2>/dev/null | grep -q ":$1 "; }

if ! port_busy 3000; then
  echo "→ 网易云 API (:3000)"
  ( cd "$ROOT/NeteaseCloudMusicApi-master" && nohup node app.js > "$RUN/netease.log" 2>&1 & )
else
  echo "· 3000 已在运行"
fi

if ! port_busy 5000; then
  echo "→ Flask 后端 (:5000)"
  ( cd "$ROOT/music-server-flask" && nohup python app.py > "$RUN/flask.log" 2>&1 & )
else
  echo "· 5000 已在运行"
fi

if ! port_busy 8080 && ! port_busy 8081; then
  echo "→ Vue 前端 (:8080)"
  ( cd "$ROOT/music-web-vue2" && nohup pnpm serve > "$RUN/vue.log" 2>&1 & )
else
  echo "· 8080 已在运行"
fi

echo "等待启动…"
sleep 20

echo "--- 端口状态 ---"
for p in 3000 5000 8080; do
  if port_busy "$p"; then echo "✓ $p"; else echo "✗ $p（看 $RUN 下的日志）"; fi
done
echo "打开 http://localhost:8080 ，账号 admin / 123456"
