import os
import re

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from mailer import SMTPMailer, SMTPNotConfigured


EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


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
    app.config.update(config or {})
    allowed_origins = os.getenv(
        "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
    delivery = mailer or SMTPMailer()

    @app.get("/api/health")
    def health():
        return jsonify(ok=True)

    @app.post("/api/contact")
    def contact():
        payload = request.get_json(silent=True) or {}
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
    app.run(host="127.0.0.1", port=5000, debug=True)

