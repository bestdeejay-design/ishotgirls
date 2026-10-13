#!/usr/bin/env python3
"""
Сервер для локального просмотра сайта ISHOTGIRLS.

  python3 server.py            # http://localhost:8000
  python3 server.py 8080       # другой порт
  PORT=8080 python3 server.py  # порт через переменную окружения

Раздаётся каталог, в котором лежит сам server.py, поэтому скрипт работает
из любого места и не зависит от абсолютных путей. Слушает 0.0.0.0, чтобы
страница открывалась и через внешний прокси (превью в браузере).
"""
from __future__ import annotations

import http.server
import os
import socketserver
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        # Cache static assets hard, but never cache the HTML itself.
        if self.path.endswith((".html", "/")) or "." not in Path(self.path).name:
            self.send_header("Cache-Control", "no-store, must-revalidate")
        else:
            self.send_header("Cache-Control", "public, max-age=604800")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        # Deliberately no X-Frame-Options: the site must be embeddable in the
        # sandbox preview iframe.
        super().end_headers()

    def log_message(self, fmt: str, *args) -> None:  # quieter logs
        sys.stderr.write("  %s\n" % (fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main() -> None:
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Порт должен быть числом")
            raise SystemExit(1)
    elif os.environ.get("PORT"):
        port = int(os.environ["PORT"])

    with Server(("0.0.0.0", port), Handler) as httpd:
        print(f"ISHOTGIRLS → http://localhost:{port}  (раздаётся {ROOT})")
        print("Ctrl+C — остановить")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nОстановлено.")


if __name__ == "__main__":
    main()
