import asyncio
import sys
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

# Add the parent directory to the path so we can import from server
sys.path.append(str(Path(__file__).parent))
from server import Product, Category, Brand

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_products():
    """Seed the database with sample products"""
    
    # Clear existing products
    await db.products.delete_many({})
    
    sample_products = [
        # Nike Products
        {
            "name": "Air Max 270",
            "description": "Scarpa da running con unità Max Air visibile per un'amortizzazione eccezionale e stile moderno.",
            "price": 150.00,
            "category": Category.SCARPE,
            "brand": Brand.NIKE,
            "product_type": "sneakers",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            "name": "Nike Air Force 1",
            "description": "Iconica scarpa da basket con design intramontabile e prestazioni superiori.",
            "price": 110.00,
            "category": Category.SCARPE,
            "brand": Brand.NIKE,
            "product_type": "sneakers",
            "image_url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
        },
        {
            "name": "Nike Dri-FIT Tee",
            "description": "Maglietta tecnica in tessuto traspirante ideale per sport e tempo libero.",
            "price": 35.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.NIKE,
            "product_type": "t-shirt",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
        },
        
        # Adidas Products
        {
            "name": "Ultraboost 22",
            "description": "Scarpa da running con tecnologia Boost per massima energia e comfort.",
            "price": 190.00,
            "category": Category.SCARPE,
            "brand": Brand.ADIDAS,
            "product_type": "running",
            "image_url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
        },
        {
            "name": "Adidas 3-Stripes Tee",
            "description": "Maglietta classica con iconiche 3 strisce laterali, simbolo dello stile Adidas.",
            "price": 30.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.ADIDAS,
            "product_type": "t-shirt",
            "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27"
        },
        {
            "name": "Adidas Track Jacket",
            "description": "Giacca da track in poliestere con design classico e vestibilità comoda.",
            "price": 75.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.ADIDAS,
            "product_type": "giacca",
            "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
        },
        
        # Gucci Products
        {
            "name": "Gucci Horsebit 1955",
            "description": "Borsa a spalla in pelle con iconico morso a cavallo, simbolo di lusso senza tempo.",
            "price": 2800.00,
            "category": Category.ACCESSORI,
            "brand": Brand.GUCCI,
            "product_type": "borsa",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
        },
        {
            "name": "Gucci Princetown Leather Slipper",
            "description": "Pantofoia in pelle con morso a cavallo, perfetta per un'eleganza casual.",
            "price": 650.00,
            "category": Category.SCARPE,
            "brand": Brand.GUCCI,
            "product_type": "pantofole",
            "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
        },
        {
            "name": "Gucci Silk Shirt",
            "description": "Camicia in seta pura con pattern GG, capo iconico della moda italiana.",
            "price": 1200.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.GUCCI,
            "product_type": "camicia",
            "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c"
        },
        
        # Prada Products
        {
            "name": "Prada Re-Edition 2005",
            "description": "Borsa a tracolla in nylon Re-Nylon con logo triangolo Prada.",
            "price": 1890.00,
            "category": Category.ACCESSORI,
            "brand": Brand.PRADA,
            "product_type": "borsa",
            "image_url": "https://images.unsplash.com/photo-1584917865442-de89df2d3e3a"
        },
        {
            "name": "Prada Monolith Boots",
            "description": "Stivali in pelle con suola imponente e design architettonico moderno.",
            "price": 1100.00,
            "category": Category.SCARPE,
            "brand": Brand.PRADA,
            "product_type": "stivali",
            "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772"
        },
        {
            "name": "Prada Nylon Jacket",
            "description": "Giacca in nylon Re-Nylon con design minimalista e funzionale.",
            "price": 950.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.PRADA,
            "product_type": "giacca",
            "image_url": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3"
        },
        
        # Versace Products
        {
            "name": "Versace Medusa Aevitas Platform",
            "description": "Sandali con plateau e iconica Medusa, simbolo del lusso Versace.",
            "price": 795.00,
            "category": Category.SCARPE,
            "brand": Brand.VERSACE,
            "product_type": "sandali",
            "image_url": "https://images.unsplash.com/photo-1603366617143-e6f82b92456a"
        },
        {
            "name": "Versace Barocco Print Shirt",
            "description": "Camicia con iconica stampa Barocco, capo distintivo e lussuoso.",
            "price": 850.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.VERSACE,
            "product_type": "camicia",
            "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
        },
        {
            "name": "Versace Greca Charm Bracelet",
            "description": "Bracciale in metallo prezioso con charm Greca, simbolo della maison.",
            "price": 450.00,
            "category": Category.ACCESSORI,
            "brand": Brand.VERSACE,
            "product_type": "bracciale",
            "image_url": "https://images.unsplash.com/photo-1611085583190-a60881d3dc78"
        },
        
        # Puma Products
        {
            "name": "Puma Suede Classic",
            "description": "Iconica sneaker in pelle scamosciata con design intramontabile degli anni '70.",
            "price": 75.00,
            "category": Category.SCARPE,
            "brand": Brand.PUMA,
            "product_type": "sneakers",
            "image_url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
        },
        {
            "name": "Puma Essentials Tee",
            "description": "Maglietta in cotone con logo Puma, versatile e confortevole.",
            "price": 25.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.PUMA,
            "product_type": "t-shirt",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
        },
        
        # Dolce & Gabbana Products
        {
            "name": "D&G Sicily Bag",
            "description": "Borsa in pelle con stampa Sicily e dettagli floreali, omaggio alla terra d'origine.",
            "price": 2250.00,
            "category": Category.ACCESSORI,
            "brand": Brand.DOLCE_GABBANA,
            "product_type": "borsa",
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
        },
        {
            "name": "D&Majolica Dress",
            "description": "Abito con iconica stampa Maiolica, capo unico che celebra l'artigianato italiano.",
            "price": 3200.00,
            "category": Category.ABBIGLIAMENTO,
            "brand": Brand.DOLCE_GABBANA,
            "product_type": "abito",
            "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
        }
    ]
    
    for product_data in sample_products:
        product = Product(**product_data)
        doc = product.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        
        await db.products.insert_one(doc)
        print(f"Added product: {product.name}")
    
    print(f"\nSeeded {len(sample_products)} products successfully!")

async def main():
    print("Starting database seeding...")
    await seed_products()
    print("Seeding completed!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
