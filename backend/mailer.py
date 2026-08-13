import os
import smtplib
import ssl
from email.message import EmailMessage


class SMTPNotConfigured(RuntimeError):
    pass


class SMTPMailer:
    def __init__(self, settings=None):
        self.settings = settings or {
            "host": os.getenv("SMTP_HOST", ""),
            "port": int(os.getenv("SMTP_PORT", "587")),
            "user": os.getenv("SMTP_USER", ""),
            "password": os.getenv("SMTP_PASSWORD", ""),
            "sender": os.getenv("SMTP_FROM", ""),
            "recipient": os.getenv("CONTACT_TO", ""),
        }

    def send(self, *, name, email, subject, message):
        required = ("host", "user", "password", "sender", "recipient")
        if any(not self.settings.get(key) for key in required):
            raise SMTPNotConfigured("SMTP environment variables are incomplete.")

        email_message = EmailMessage()
        email_message["Subject"] = f"Portfolio contact: {subject}"
        email_message["From"] = self.settings["sender"]
        email_message["To"] = self.settings["recipient"]
        email_message["Reply-To"] = email
        email_message.set_content(
            f"Name: {name}\nEmail: {email}\n\n{message}", subtype="plain"
        )

        context = ssl.create_default_context()
        with smtplib.SMTP(self.settings["host"], self.settings["port"], timeout=15) as server:
            server.starttls(context=context)
            server.login(self.settings["user"], self.settings["password"])
            server.send_message(email_message)

