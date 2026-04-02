import requests
import json

# Test login to Flask backend
url = "http://localhost:8003/api/auth/login"
headers = {"Content-Type": "application/json"}
data = {
    "email": "admin@trinacriahub.com",
    "password": "TrinacriA2024!"
}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
