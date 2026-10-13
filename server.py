#!/usr/bin/env python3
"""
Локальный сервер для ISHOTGIRLS — The Training Journal.

    python3 server.py            # http://localhost:8000
    python3 server.py 8080       # другой порт

Отдаёт статику из каталога репозитория, ставит кэш-заголовки для ассетов
и НЕ запрещает встраивание в iframe (нужно для живого превью в IDE/панели).
"""
import http.server
import socketserver
import sys
from functools import partial
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CACHE_ONE_YEAR = (".woff2", ".webp", ".jpg", ".png", ".svg", ".ico")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        if self.path.endswith(CACHE_ONE_YEAR):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):  # тише в консоли
        if "404" in (fmt % args):
            super().log_message(fmt, *args)


def main():
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Порт должен быть числом")
            sys.exit(1)

    handler = partial(Handler, directory=str(ROOT))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("", port), handler) as httpd:
        print(f"ISHOTGIRLS → http://localhost:{port}  (каталог: {ROOT})")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nСервер остановлен.")


if __name__ == "__main__":
    main()
