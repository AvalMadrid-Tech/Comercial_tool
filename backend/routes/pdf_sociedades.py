from flask import Blueprint, request, render_template, make_response
from weasyprint import HTML
import io

pdf_sociedades_bp = Blueprint("sociedades", __name__)

@pdf_sociedades_bp.route("/sociedades/pdf", methods=["POST"])
def generar_pdf_sociedades():
    data = request.json  # Datos que rellenarán los campos

    html = render_template("solicitud_sociedades.html", **data)
    pdf = HTML(string=html).write_pdf()

    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "attachment; filename=solicitud_sociedades.pdf"
    return response
