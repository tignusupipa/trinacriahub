from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])

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

@app.route('/')
def home():
    return jsonify({"message": "Trinacria Hub API - Flask", "version": "1.0.0"})

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            data = request.form.to_dict()
        
        email = data.get("email", "")
        password = data.get("password", "")
        
        print(f"Login attempt - Email: {email}, Password length: {len(password)}")
        
        if email in admin_users:
            stored_hash = admin_users[email]
            provided_hash = hashlib.sha256(password.encode()).hexdigest()
            
            print(f"Hash check - Stored: {stored_hash[:10]}..., Provided: {provided_hash[:10]}...")
            
            if provided_hash == stored_hash:
                return jsonify({
                    "access_token": f"simple_token_{email}",
                    "token_type": "bearer"
                })
        
        return jsonify({"error": "Invalid credentials"}), 401
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({"error": "Login failed"}), 500

@app.route('/api/auth/me')
def get_me():
    return jsonify({"email": "admin@trinacriahub.com", "id": "1"})

@app.route('/api/products')
def get_products():
    return jsonify(products)

@app.route('/api/products/<product_id>')
def get_product(product_id):
    for product in products:
        if product["id"] == product_id:
            return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/filters/categories')
def get_categories():
    return jsonify([
        {"value": "scarpe", "label": "Scarpe"},
        {"value": "abbigliamento", "label": "Abbigliamento"}, 
        {"value": "accessori", "label": "Accessori"}
    ])

@app.route('/api/filters/brands')
def get_brands():
    return jsonify([
        {"value": "nike", "label": "Nike"},
        {"value": "adidas", "label": "Adidas"},
        {"value": "gucci", "label": "Gucci"},
        {"value": "prada", "label": "Prada"}
    ])

if __name__ == '__main__':
    print("Starting Trinacria Hub Flask Server on port 8003...")
    app.run(host='0.0.0.0', port=8003, debug=True)
