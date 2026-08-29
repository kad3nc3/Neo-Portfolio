from unittest.mock import Mock

import pytest

from app import create_app


@pytest.fixture()
def mailer():
    return Mock()


@pytest.fixture()
def client(mailer):
    app = create_app({"TESTING": True}, mailer=mailer)
    return app.test_client()


def valid_payload(**overrides):
    payload = {
        "name": "Hiring Manager",
        "email": "manager@example.com",
        "subject": "Internship opportunity",
        "message": "We would like to discuss a full-stack internship.",
        "website": "",
    }
    payload.update(overrides)
    return payload


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"ok": True}
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Cache-Control"] == "no-store"


def test_contact_rejects_get_method(client):
    response = client.get("/api/contact")
    assert response.status_code == 405
    assert response.get_json() == {"ok": False, "message": "Method not allowed."}


def test_contact_requires_json(client, mailer):
    response = client.post("/api/contact", data="test", content_type="text/plain")
    assert response.status_code == 415
    assert response.get_json() == {"ok": False, "message": "JSON is required."}
    mailer.send.assert_not_called()


def test_contact_rejects_oversized_request(client, mailer):
    response = client.post("/api/contact", json={"message": "x" * 20_000})
    assert response.status_code == 413
    assert response.get_json() == {"ok": False, "message": "Request is too large."}
    mailer.send.assert_not_called()


def test_valid_contact_message_is_delivered(client, mailer):
    response = client.post("/api/contact", json=valid_payload())
    assert response.status_code == 200
    assert response.get_json() == {
        "ok": True,
        "message": "Message sent successfully.",
    }
    mailer.send.assert_called_once_with(
        name="Hiring Manager",
        email="manager@example.com",
        subject="Internship opportunity",
        message="We would like to discuss a full-stack internship.",
    )


@pytest.mark.parametrize(
    ("field", "value", "expected_error"),
    [
        ("name", "", "Please enter your name."),
        ("email", "hi", "Please enter a valid email address."),
        ("subject", "", "Please enter a subject."),
        ("message", "short", "Message must be at least 10 characters."),
    ],
)
def test_invalid_fields_return_actionable_errors(
    client, mailer, field, value, expected_error
):
    response = client.post("/api/contact", json=valid_payload(**{field: value}))
    assert response.status_code == 400
    assert response.get_json()["errors"][field] == expected_error
    mailer.send.assert_not_called()


def test_honeypot_submission_is_rejected(client, mailer):
    response = client.post(
        "/api/contact", json=valid_payload(website="https://spam.example")
    )
    assert response.status_code == 400
    assert response.get_json() == {
        "ok": False,
        "errors": {"form": "Unable to send this message."},
    }
    mailer.send.assert_not_called()


def test_delivery_failure_returns_safe_error(client, mailer):
    mailer.send.side_effect = RuntimeError("SMTP_PASSWORD=secret")
    response = client.post("/api/contact", json=valid_payload())
    assert response.status_code == 500
    body = response.get_json()
    assert body == {
        "ok": False,
        "message": "Message delivery failed. Please email Neo directly.",
    }
    assert "secret" not in response.get_data(as_text=True)


def test_missing_smtp_configuration_returns_service_unavailable(monkeypatch):
    for key in (
        "SMTP_HOST",
        "SMTP_USER",
        "SMTP_PASSWORD",
        "SMTP_FROM",
        "CONTACT_TO",
    ):
        monkeypatch.delenv(key, raising=False)
    app = create_app({"TESTING": True})
    response = app.test_client().post("/api/contact", json=valid_payload())
    assert response.status_code == 503
    assert response.get_json() == {
        "ok": False,
        "message": "Contact form is not configured yet. Please email Neo directly.",
    }
