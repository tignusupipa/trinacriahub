from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import bcrypt
import jwt
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
logger = logging.getLogger(__name__)

try:
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    # Test connection
    client.admin.command('ping')
    logger.info("MongoDB connected successfully")
except Exception as e:
    logger.warning(f"MongoDB not available: {e}")
    # Fallback to in-memory storage for demo
    db = None

# JWT settings
JWT_SECRET = os.environ['JWT_SECRET']
ALGORITHM = "HS256"
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI(title="Trinacria Hub API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class Category(str, Enum):
    SCARPE = "scarpe"
    ABBIGLIAMENTO = "abbigliamento"
    ACCESSORI = "accessori"

class Brand(str, Enum):
    NIKE = "nike"
    ADIDAS = "adidas"
    PUMA = "puma"
    GUCCI = "gucci"
    PRADA = "prada"
    VERSACE = "versace"
    ARMANI = "armani"
    VALENTINO = "valentino"
    DOLCE_GABBANA = "dolce_gabbana"
    BOTTEGA_VENETA = "bottega_veneta"

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: Category
    brand: Brand
    product_type: str  # es: "sneakers", "t-shirt", "jeans", etc.
    image_url: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: Category
    brand: Brand
    product_type: str
    image_url: str

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[Category] = None
    brand: Optional[Brand] = None
    product_type: Optional[str] = None
    image_url: Optional[str] = None

class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# In-memory storage fallback
admin_users = {}
products_list = []

# Helper functions for in-memory storage
async def get_admin_by_email(email: str):
    return admin_users.get(email)

async def create_admin_user(email: str, password_hash: str):
    admin_data = {
        "id": str(uuid.uuid4()),
        "email": email,
        "password_hash": password_hash,
        "created_at": datetime.now(timezone.utc)
    }
    admin_users[email] = admin_data
    return admin_data

async def get_all_products():
    return products_list

async def create_product_in_memory(product_data):
    product_data["id"] = str(uuid.uuid4())
    product_data["created_at"] = datetime.now(timezone.utc)
    product_data["updated_at"] = datetime.now(timezone.utc)
    products_list.append(product_data)
    return product_data

async def get_product_by_id(product_id: str):
    for product in products_list:
        if product["id"] == product_id:
            return product
    return None

async def update_product_in_memory(product_id: str, update_data):
    for i, product in enumerate(products_list):
        if product["id"] == product_id:
            products_list[i].update(update_data)
            products_list[i]["updated_at"] = datetime.now(timezone.utc)
            return products_list[i]
    return None

async def delete_product_in_memory(product_id: str):
    for i, product in enumerate(products_list):
        if product["id"] == product_id:
            del products_list[i]
            return True
    return False
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + datetime.timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    if db:
        admin = await db.admins.find_one({"email": email}, {"_id": 0})
    else:
        admin = await get_admin_by_email(email)
        
    if admin is None:
        raise credentials_exception
    return admin

# Admin whitelist
ADMIN_EMAILS = [
    "admin@trinacriahub.com",
    "mangi@trinacriahub.com",
    "staff@trinacriahub.com"
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Trinacria Hub API", "version": "1.0.0"}

# Auth routes
@api_router.post("/auth/login", response_model=Token)
async def login(admin_data: AdminLogin):
    if admin_data.email not in ADMIN_EMAILS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not authorized"
        )
    
    if db:
        admin = await db.admins.find_one({"email": admin_data.email}, {"_id": 0})
        if not admin or not verify_password(admin_data.password, admin["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
    else:
        admin = await get_admin_by_email(admin_data.email)
        if not admin:
            # Create admin user if doesn't exist
            password_hash = get_password_hash(admin_data.password)
            admin = await create_admin_user(admin_data.email, password_hash)
        elif not verify_password(admin_data.password, admin["password_hash"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
    
    access_token = create_access_token(data={"sub": admin_data.email})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me")
async def get_me(current_admin: dict = Depends(get_current_admin)):
    return {"email": current_admin["email"], "id": current_admin["id"]}

# Product routes
@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate, current_admin: dict = Depends(get_current_admin)):
    product_dict = product.model_dump()
    product_obj = Product(**product_dict)
    
    doc = product_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.products.insert_one(doc)
    return product_obj

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[Category] = None, brand: Optional[Brand] = None):
    query = {}
    if category:
        query["category"] = category.value
    if brand:
        query["brand"] = brand.value
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    
    for product in products:
        if isinstance(product['created_at'], str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
        if isinstance(product['updated_at'], str):
            product['updated_at'] = datetime.fromisoformat(product['updated_at'])
    
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if isinstance(product['created_at'], str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    if isinstance(product['updated_at'], str):
        product['updated_at'] = datetime.fromisoformat(product['updated_at'])
    
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductUpdate, current_admin: dict = Depends(get_current_admin)):
    update_data = product_update.model_dump(exclude_unset=True)
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
        
        result = await db.products.update_one(
            {"id": product_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
    
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if isinstance(product['created_at'], str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    if isinstance(product['updated_at'], str):
        product['updated_at'] = datetime.fromisoformat(product['updated_at'])
    
    return product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_admin: dict = Depends(get_current_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# Filter options
@api_router.get("/filters/categories")
async def get_categories():
    return [{"value": cat.value, "label": cat.value.title()} for cat in Category]

@api_router.get("/filters/brands")
async def get_brands():
    return [{"value": brand.value, "label": brand.value.replace("_", " ").title()} for brand in Brand]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@trinacriahub.com')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'TrinacriA2024!')
    
    if db:
        existing_admin = await db.admins.find_one({"email": admin_email})
        if not existing_admin:
            admin = Admin(
                email=admin_email,
                password_hash=get_password_hash(admin_password)
            )
            doc = admin.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.admins.insert_one(doc)
            logger.info(f"Created default admin: {admin_email}")
    else:
        # Create default admin in memory
        password_hash = get_password_hash(admin_password)
        await create_admin_user(admin_email, password_hash)
        logger.info(f"Created default admin in memory: {admin_email}")
        
        # Add some demo products
        demo_products = [
            {
                "name": "Nike Air Max 270",
                "description": "Scarpa da running con unità Max Air visibile",
                "price": 150.00,
                "category": "scarpe",
                "brand": "nike",
                "product_type": "sneakers",
                "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            },
            {
                "name": "Gucci Horsebit 1955",
                "description": "Borsa a spalla in pelle con iconico morso a cavallo",
                "price": 2800.00,
                "category": "accessori",
                "brand": "gucci",
                "product_type": "borsa",
                "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
            },
            {
                "name": "Adidas Ultraboost 22",
                "description": "Scarpa da running con tecnologia Boost",
                "price": 190.00,
                "category": "scarpe",
                "brand": "adidas",
                "product_type": "running",
                "image_url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
            }
        ]
        
        for product_data in demo_products:
            await create_product_in_memory(product_data.copy())
        
        logger.info(f"Created {len(demo_products)} demo products")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
