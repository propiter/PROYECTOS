import requests
import json
from datetime import datetime

# Datos para el formulario
data = {
    "stringifiedObjectParams": json.dumps({
        "rowId": "recEyU7pE8wHPIPtq",
        "cellValuesByColumnId": {
            "fldnA7WIFe01lI0Ex": datetime.utcnow().isoformat() + "Z",  # Fecha en formato ISO
            "fldaXjMyOWU9uXrWq": "Pedro Rodriguez",
            "fldINEybbf3AFUj0u": "Con actitud",
            "fldhtyN1aD17hsxW2": "Con Energia",
            "fldwSo0V7524DWAdu": "Prepararme",
            "fldC3RhMQ9l1ZS67Q": "Booking\nPartners of Americas",
            "fldu8QyYIJ7N1tBnI": "Prospectar 20 leads, \nenviar 3 cotizaciones",
            "fldJycYvXx2tIpB3z": "conductores Bilingues en Barranquilla"
        }
    }),
    "requestId": "reqsI3Li68Y8bGV6E",
    "accessPolicy": json.dumps({
        "allowedActions": [
            {"modelClassName": "view", "modelIdSelector": "viwn93t0Dsdy0ZdbD",
                "action": "submitSharedForm"}
        ],
        "shareId": "shrX5dJYLydlmPGKr",
        "applicationId": "appZ0BUIOOM049EEo",
        "generationNumber": 0,
        "expires": "2024-09-12T00:00:00.000Z",
        "signature": "d051273d38913320773cf4e1e664bc7874dc2b08e66f4207391ce19333ab8975"
    }),
    "_csrf": "qWHtIR1L-UsFdO7e3WtSiO9tqptjdFUnCEgU"
}

# Enviar la solicitud POST
response = requests.post(
    "https://airtable.com/v0.3/view/viwn93t0Dsdy0ZdbD/submitSharedForm",
    data=data
)

# Verificar la respuesta
if response.status_code == 200:
    print("Formulario enviado con éxito:", response.json())
else:
    print("Error al enviar el formulario:",
          response.status_code, response.text)
