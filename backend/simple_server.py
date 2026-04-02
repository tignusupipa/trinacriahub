from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
import uvicorn
import hashlib
import uuid
from datetime import datetime, timezone
from enum import Enum
from pydantic import BaseModel
import json

app = FastAPI(title="Trinacria Hub API - Simple")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage
admin_users = {
    "admin@trinacriahub.com": {
        "id": "1",
        "email": "admin@trinacriahub.com", 
        "password_hash": hashlib.sha256("TrinacriA2024!".encode()).hexdigest()
    },
    "mangi@trinacriahub.com": {
        "id": "2", 
        "email": "mangi@trinacriahub.com",
        "password_hash": hashlib.sha256("TrinacriA2024!".encode()).hexdigest()
    },
    "staff@trinacriahub.com": {
        "id": "3",
        "email": "staff@trinacriahub.com", 
        "password_hash": hashlib.sha256("TrinacriA2024!".encode()).hexdigest()
    }
}

products = [
    {
        "id": "1",
        "name": "Nike Air Max 270",
        "description": "Scarpa da running con unità Max Air visibile",
        "price": 150.00,
        "category": "scarpe",
        "brand": "nike", 
        "product_type": "sneakers",
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "2", 
        "name": "Gucci Horsebit 1955",
        "description": "Borsa a spalla in pelle con iconico morso a cavallo",
        "price": 2800.00,
        "category": "accessori",
        "brand": "gucci",
        "product_type": "borsa", 
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "3",
        "name": "Adidas Ultraboost 22", 
        "description": "Scarpa da running con tecnologia Boost",
        "price": 190.00,
        "category": "scarpe",
        "brand": "adidas",
        "product_type": "running",
        "image_url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
]

@app.get("/")
async def root():
    return {"message": "Trinacria Hub API - Simple", "version": "1.0.0"}

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/login")
async def login(request: Request):
    try:
        # Try to parse as JSON first
        body = await request.body()
        data = json.loads(body.decode())
        login_email = data.get("email", "")
        login_password = data.get("password", "")
    except:
        # Fallback to form data
        form = await request.form()
        login_email = form.get("email", "")
        login_password = form.get("password", "")
    
    print(f"Login attempt: {login_email}")
    
    # Simple form data login
    if login_email in admin_users:
        stored_hash = admin_users[login_email]["password_hash"]
        provided_hash = hashlib.sha256(login_password.encode()).hexdigest()
        
        if provided_hash == stored_hash:
            # Simple token (just email for demo)
            return {
                "access_token": f"simple_token_{login_email}",
                "token_type": "bearer"
            }
    
    return {"error": "Invalid credentials"}

@app.get("/api/auth/me")
async def get_me():
    return {"email": "admin@trinacriahub.com", "id": "1"}

@app.get("/api/products")
async def get_products():
    return products

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    for product in products:
        if product["id"] == product_id:
            return product
    return {"error": "Product not found"}

@app.get("/api/filters/categories")
async def get_categories():
    return [
        {"value": "scarpe", "label": "Scarpe"},
        {"value": "abbigliamento", "label": "Abbigliamento"}, 
        {"value": "accessori", "label": "Accessori"}
    ]

@app.get("/api/filters/brands")
async def get_brands():
    return [
        {"value": "nike", "label": "Nike"},
        {"value": "adidas", "label": "Adidas"},
        {"value": "gucci", "label": "Gucci"},
        {"value": "prada", "label": "Prada"}
    ]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
