import os
import re

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from mailer import SMTPMailer, SMTPNotConfigured


# QA patch: require a mailbox, an @ sign, and a real alphabetic domain suffix.
# This rejects values such as "hi" before any mail client or SMTP delivery is used.
EMAIL_PATTERN = re.compile(
    r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,63}$"
)


def clean(value):
    return value.strip() if isinstance(value, str) else ""


def validate_contact(payload):
    values = {
        key: clean(payload.get(key))
        for key in ("name", "email", "subject", "message", "website")
    }
    if values["website"]:
        return values, {"form": "Unable to send this message."}

    errors = {}
    if not values["name"]:
        errors["name"] = "Please enter your name."
    elif len(values["name"]) > 80:
        errors["name"] = "Name must be 80 characters or fewer."

    if not EMAIL_PATTERN.match(values["email"]):
        errors["email"] = "Please enter a valid email address."
    elif len(values["email"]) > 254:
        errors["email"] = "Email address is too long."

    if not values["subject"]:
        errors["subject"] = "Please enter a subject."
    elif len(values["subject"]) > 120:
        errors["subject"] = "Subject must be 120 characters or fewer."

    if len(values["message"]) < 10:
        errors["message"] = "Message must be at least 10 characters."
    elif len(values["message"]) > 2000:
        errors["message"] = "Message must be 2,000 characters or fewer."
    return values, errors


def create_app(config=None, mailer=None):
    load_dotenv()
    app = Flask(__name__)
    # QA patch: bound request bodies before Flask parses JSON. The contact form
    # only needs a few short text fields, so accepting large bodies is unnecessary.
    app.config.update(MAX_CONTENT_LENGTH=16 * 1024)
    app.config.update(config or {})
    allowed_origins = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
        ).split(",")
        if origin.strip()
    ]
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

    @app.errorhandler(413)
    def request_too_large(_error):
        return jsonify(ok=False, message="Request is too large."), 413

    @app.errorhandler(405)
    def method_not_allowed(_error):
        return jsonify(ok=False, message="Method not allowed."), 405

    @app.after_request
    def add_security_headers(response):
        # QA patch: the frontend already has edge security headers; keeping the
        # API responses protected too avoids exposing a weaker backend surface.
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault(
            "Referrer-Policy", "strict-origin-when-cross-origin"
        )
        response.headers.setdefault(
            "Permissions-Policy", "camera=(), microphone=(), geolocation=()"
        )
        response.headers.setdefault(
            "Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
        )
        if request.path.startswith("/api/"):
            response.headers.setdefault("Cache-Control", "no-store")
        return response

    delivery = mailer or SMTPMailer()

    @app.get("/api/health")
    def health():
        return jsonify(ok=True)

    @app.post("/api/contact")
    def contact():
        # QA patch: reject non-JSON bodies explicitly instead of treating them
        # as empty form submissions, which gives clients a clear 415 response.
        if not request.is_json:
            return jsonify(ok=False, message="JSON is required."), 415

        payload = request.get_json(silent=True)
        if not isinstance(payload, dict):
            return jsonify(ok=False, message="A JSON object is required."), 400

        values, errors = validate_contact(payload)
        if errors:
            return jsonify(ok=False, errors=errors), 400

        try:
            delivery.send(
                name=values["name"],
                email=values["email"],
                subject=values["subject"],
                message=values["message"],
            )
        except SMTPNotConfigured:
            return (
                jsonify(
                    ok=False,
                    message=(
                        "Contact form is not configured yet. "
                        "Please email Neo directly."
                    ),
                ),
                503,
            )
        except Exception:
            app.logger.exception("Contact email delivery failed")
            return (
                jsonify(
                    ok=False,
                    message="Message delivery failed. Please email Neo directly.",
                ),
                500,
            )

        return jsonify(ok=True, message="Message sent successfully.")

    return app


app = create_app()


if __name__ == "__main__":
    # QA patch: never force Flask debug mode in a deployed process. Local debug
    # can be opted into explicitly with FLASK_DEBUG=1 when troubleshooting.
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    app.run(host="127.0.0.1", port=5000, debug=debug)

