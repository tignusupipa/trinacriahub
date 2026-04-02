import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = await fetchProduct(id);
      setProduct(productData);
      setLoading(false);
    };
    loadProduct();
  }, [id, fetchProduct]);

  const generateWhatsAppMessage = () => {
    if (!product) return '';
    return `Ciao! Sono interessato al prodotto: ${product.name} - ${product.brand} - €${product.price.toFixed(2)}`;
  };

  const generateEmailMessage = () => {
    if (!product) return '';
    return `subject=Richiesta prodotto: ${product.name}&body=Ciao! Sono interessato al prodotto: ${product.name} - ${product.brand} - €${product.price.toFixed(2)}\n\nPosso avere maggiori informazioni?`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container-custom text-center">
          <h1 className="font-heading text-3xl font-light mb-4">Prodotto non trovato</h1>
          <Link to="/catalog" className="btn-primary">
            Torna al catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/catalog" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna al catalogo
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12 bg-white rounded-lg overflow-hidden">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Additional images could go here */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                  {product.brand.replace('_', ' ')}
                </span>
                <span className="text-sm px-3 py-1 bg-muted rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-light mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.product_type}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.5 · 128 recensioni)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-light">
              €{product.price.toFixed(2)}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading text-xl font-medium mb-3">Descrizione</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b border-border">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm">Spedizione gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Garanzia 2 anni</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span className="text-sm">Reso 30 giorni</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/393331234567?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-green-600 hover:bg-green-700 flex items-center justify-center"
                  data-testid="whatsapp-button"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ordina via WhatsApp
                </a>
                <a
                  href={`mailto:info@trinacriahub.com?${generateEmailMessage()}`}
                  className="btn-secondary flex items-center justify-center"
                  data-testid="email-button"
                >
                  Contatta via Email
                </a>
              </div>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Aggiungi ai preferiti</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Condividi</span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-heading text-lg font-medium mb-4">Informazioni aggiuntive</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Marca</dt>
                  <dd className="capitalize">{product.brand.replace('_', ' ')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Categoria</dt>
                  <dd className="capitalize">{product.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Tipo</dt>
                  <dd className="capitalize">{product.product_type}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Codice Prodotto</dt>
                  <dd>{product.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-heading text-3xl font-light mb-8">Prodotti correlati</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Related products would be loaded here */}
            <div className="text-center text-muted-foreground py-8 col-span-full">
              Altri prodotti della stessa categoria coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
