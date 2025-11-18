# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
import pdfkit
import tempfile
from dotenv import load_dotenv
import base64
import shutil

load_dotenv()

app = Flask(__name__)
CORS(app)

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
WKHTMLTOPDF_PATH = os.getenv("WKHTMLTOPDF_PATH")  # optional

if not SENDGRID_API_KEY or not SENDER_EMAIL:
    raise RuntimeError("Missing SENDGRID_API_KEY or SENDER_EMAIL environment variables. Set them before starting the app.")

# Configure pdfkit: prefer WKHTMLTOPDF_PATH env var, otherwise use system binary
if WKHTMLTOPDF_PATH:
    PDFKIT_CONFIG = pdfkit.configuration(wkhtmltopdf=WKHTMLTOPDF_PATH)
else:
    # If wkhtmltopdf is available on PATH, configuration can be None
    try:
        PDFKIT_CONFIG = pdfkit.configuration()  # will use system binary
    except Exception:
        PDFKIT_CONFIG = None

PDFKIT_OPTIONS = {
    'enable-local-file-access': None,
    'encoding': "UTF-8",
    # you can add more options here if needed
}

@app.route("/")
def index():
    return "✔️ Flask server is running"

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json(force=True, silent=True) or {}
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    event_date = data.get('eventDate')
    preferred_date = data.get('preferredDate')
    preferred_time = data.get('preferredTime')
    event_type = data.get('eventType')
    message = data.get('message', '')

    if not name or not email or not event_date or not event_type:
        return jsonify({'error': 'Missing required fields: name, email, eventDate, or eventType'}), 400

    email_content = f"""
New Enquiry Received:

Name: {name}
Email: {email}
Phone: {phone}
Event Type: {event_type}
Event Date: {event_date}
Preferred Contact Date: {preferred_date}
Preferred Contact Time: {preferred_time}
Message: {message}
"""

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        email_to_send = Mail(
            from_email=SENDER_EMAIL,
            to_emails=[SENDER_EMAIL, email],
            subject=f"New Enquiry from {name}",
            plain_text_content=email_content
        )
        response = sg.send(email_to_send)
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        app.logger.exception("Error sending contact email")
        return jsonify({'error': 'Email sending failed', 'details': str(e)}), 500


@app.route("/send-quotation", methods=["POST"])
def send_quotation():
    data = request.get_json(force=True, silent=True) or {}
    try:
        name = data.get("name", "Customer")
        email = data.get("email")
        phone = data.get("phone", "")
        event_date = data.get("event_date", "")
        note = data.get("note", "")
        selections = data.get("selections", {})
        # Parse total robustly
        total_raw = data.get("total", 0)
        try:
            # remove commas and currency symbols if present
            total = float(str(total_raw).replace(",", "").replace("₹", "").strip())
        except Exception:
            total = 0.0

        # Build HTML
        html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><style>
body {{ font-family: Arial, sans-serif; }}
table {{ width:100%; border-collapse:collapse; margin-top:10px; }}
th, td {{ border:1px solid #ddd; padding:8px; text-align:left; }}
th {{ background-color: #f2f2f2; }}
</style></head><body>
<h2 style="color:#B22222">Summary of Your Quotation</h2>
<p><strong>Name:</strong> {name}<br>
<strong>Email:</strong> {email}<br>
<strong>Phone:</strong> {phone}<br>
<strong>Event Date:</strong> {event_date}<br>
<strong>Note:</strong> {note}</p>
<hr/>
"""

        prices = {
            'Traditional Photography': 5000,
            'Traditional Videography': 6000,
            'Candid Photography': 7000,
            'Cinematic Videography': 8000,
            'Drone': 3000,
            'LED Screen': 4000,
            'Candid Album - Pressbook': 6000,
            'Candid Album - Magnum': 8000,
            'Traditional Album - Pressbook': 5000,
            'Traditional Album - Magnum': 7000
        }

        # selections should be a dict with sections
        if not isinstance(selections, dict):
            selections = {}

        for section, data_dict in selections.items():
            if not data_dict:
                continue
            html += f"<h3>{section}</h3>"
            html += "<table><tr style='background:#fce7f3'><th>Person</th><th>Service</th><th>Qty</th><th>Price</th></tr>"
            # Album: likely service->qty mapping
            if isinstance(data_dict, dict):
                # Decide if it's a simple mapping service->qty OR person->{service:qty}
                first_val = next(iter(data_dict.values()), None)
                # If first_val is int/float -> simple service->qty
                if isinstance(first_val, (int, float)):
                    for service, qty in data_dict.items():
                        price = prices.get(service, 0)
                        try:
                            qty_num = float(qty)
                        except Exception:
                            qty_num = 0
                        html += f"<tr><td>-</td><td>{service}</td><td>{qty_num}</td><td>₹{int(qty_num * price)}</td></tr>"
                else:
                    # person -> {service:qty}
                    for person, services in data_dict.items():
                        if not isinstance(services, dict):
                            continue
                        for service, qty in services.items():
                            price = prices.get(service, 0)
                            try:
                                qty_num = float(qty)
                            except Exception:
                                qty_num = 0
                            html += f"<tr><td>{person}</td><td>{service}</td><td>{qty_num}</td><td>₹{int(qty_num * price)}</td></tr>"
            html += "</table>"

        html += f"<p style='text-align:right;font-weight:bold;margin-top:10px;'>Estimated Total: ₹{int(total)}</p>"
        html += "</body></html>"

        # Generate PDF to temp file
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                tmp_path = tmp.name
                if PDFKIT_CONFIG:
                    pdfkit.from_string(html, tmp_path, configuration=PDFKIT_CONFIG, options=PDFKIT_OPTIONS)
                else:
                    pdfkit.from_string(html, tmp_path, options=PDFKIT_OPTIONS)
                tmp.seek(0)
                pdf_data = tmp.read()
                pdf_base64 = base64.b64encode(pdf_data).decode()
        except Exception as e:
            app.logger.exception("PDF generation failed")
            return jsonify({"error": "PDF generation failed", "details": str(e)}), 500
        finally:
            # remove temp file if exists
            try:
                if tmp_path and os.path.exists(tmp_path):
                    os.remove(tmp_path)
            except Exception:
                pass

        # Compose email and attach PDF
        message = Mail(
            from_email=SENDER_EMAIL,
            to_emails=[SENDER_EMAIL, email] if email else [SENDER_EMAIL],
            subject=f"Wedding Quotation for {name}",
            html_content=html
        )

        attachedFile = Attachment(
            FileContent(pdf_base64),
            FileName("Quotation.pdf"),
            FileType("application/pdf"),
            Disposition("attachment")
        )
        message.attachment = attachedFile

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

        return jsonify({"message": "Quotation sent successfully!"}), 200

    except Exception as e:
        app.logger.exception("Unexpected error in send-quotation")
        return jsonify({"error": "Failed to send email", "details": str(e)}), 500


if __name__ == "__main__":
    # For production, use gunicorn in Procfile
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
