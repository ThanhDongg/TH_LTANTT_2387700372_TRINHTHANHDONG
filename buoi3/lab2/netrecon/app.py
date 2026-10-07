from flask import Flask, render_template, request
import asyncio
import os

from dotenv import load_dotenv

from modules.port_scanner import async_scan_ports
from modules.service_detector import detect_service
from modules.banner_grabber import grab_banner
from modules.network_mapper import map_network
from modules.vuln_checker import check_vulns
from modules.email_sender import send_email

load_dotenv()

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/scan", methods=["POST"])
def scan():
    target = request.form["target"]

    ports = [
        int(p.strip())
        for p in request.form["ports"].split(",")
        if p.strip()
    ]

    mode = request.form["mode"]
    email = request.form.get("email", "").strip()

    result = {}

    if mode in ["scan", "all"]:
        result["scan"] = asyncio.run(
            async_scan_ports(target, ports)
        )

    if mode in ["service", "all"]:
        result["service"] = detect_service(
            target,
            ports
        )

    if mode in ["banner", "all"]:
        result["banner"] = {
            port: grab_banner(target, port)
            for port in ports
        }

    if mode in ["map", "all"]:
        result["map"] = map_network()

    if mode in ["vuln", "all"]:
        result["vuln"] = check_vulns(ports)

    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    if email and smtp_user and smtp_pass:
        body = "KET QUA NETRECON\n\n"

        for key, value in result.items():
            body += f"--- {key.upper()} ---\n{value}\n\n"

        send_email(
            email,
            "Ket qua NetRecon",
            body,
            smtp_user,
            smtp_pass
        )

    return render_template(
        "result.html",
        result=result
    )


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
