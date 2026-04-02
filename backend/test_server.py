from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import hashlib
import json

app = FastAPI(title="Trinacria Hub API - Test")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Admin users
admin_users = {
    "admin@trinacriahub.com": hashlib.sha256("TrinacriA2024!".encode()).hexdigest(),
    "mangi@trinacriahub.com": hashlib.sha256("TrinacriA2024!".encode()).hexdigest(),
    "staff@trinacriahub.com": hashlib.sha256("TrinacriA2024!".encode()).hexdigest()
}

# Demo products
products = [
    {
        "id": "1",
        "name": "Nike Air Max 270",
        "description": "Scarpa da running con unità Max Air visibile",
        "price": 150.00,
        "category": "scarpe",
        "brand": "nike", 
        "product_type": "sneakers",
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        "id": "2",
        "name": "Gucci Horsebit 1955",
        "description": "Borsa a spalla in pelle con iconico morso a cavallo",
        "price": 2800.00,
        "category": "accessori",
        "brand": "gucci",
        "product_type": "borsa", 
        "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },
    {
        "id": "3",
        "name": "Adidas Ultraboost 22",
        "description": "Scarpa da running con tecnologia Boost",
        "price": 190.00,
        "category": "scarpe",
        "brand": "adidas",
        "product_type": "running",
        "image_url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
    }
]

@app.get("/")
async def root():
    return {"message": "Trinacria Hub API - Test", "version": "1.0.0"}

@app.post("/api/auth/login")
async def login(request):
    try:
        # Get raw body and parse manually
        body = await request.body()
        data = json.loads(body.decode())
        
        email = data.get("email", "")
        password = data.get("password", "")
        
        print(f"Login attempt - Email: {email}, Password length: {len(password)}")
        
        if email in admin_users:
            stored_hash = admin_users[email]
            provided_hash = hashlib.sha256(password.encode()).hexdigest()
            
            print(f"Hash check - Stored: {stored_hash[:10]}..., Provided: {provided_hash[:10]}...")
            
            if provided_hash == stored_hash:
                return JSONResponse({
                    "access_token": f"simple_token_{email}",
                    "token_type": "bearer"
                })
        
        return JSONResponse({"error": "Invalid credentials"}, status_code=401)
        
    except Exception as e:
        print(f"Login error: {e}")
        return JSONResponse({"error": "Login failed"}, status_code=500)

@app.get("/api/auth/me")
async def get_me():
    return JSONResponse({"email": "admin@trinacriahub.com", "id": "1"})

@app.get("/api/products")
async def get_products():
    return JSONResponse(products)

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    for product in products:
        if product["id"] == product_id:
            return JSONResponse(product)
    return JSONResponse({"error": "Product not found"}, status_code=404)

@app.get("/api/filters/categories")
async def get_categories():
    return JSONResponse([
        {"value": "scarpe", "label": "Scarpe"},
        {"value": "abbigliamento", "label": "Abbigliamento"}, 
        {"value": "accessori", "label": "Accessori"}
    ])

@app.get("/api/filters/brands")
async def get_brands():
    return JSONResponse([
        {"value": "nike", "label": "Nike"},
        {"value": "adidas", "label": "Adidas"},
        {"value": "gucci", "label": "Gucci"},
        {"value": "prada", "label": "Prada"}
    ])

if __name__ == "__main__":
    print("Starting Trinacria Hub Test Server on port 8002...")
    uvicorn.run(app, host="0.0.0.0", port=8002, log_level="info")
