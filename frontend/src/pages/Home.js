import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const Home = () => {
  const { fetchProducts, products } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 3));
  }, [products]);

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Spedizione Gratuita",
      description: "Per ordini superiori a €100"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Garanzia di Qualità",
      description: "100% prodotti autentici"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Reso Facile",
      description: "30 giorni per cambiare idea"
    }
  ];

  const categories = [
    {
      title: "Scarpe",
      image: "https://images.pexels.com/photos/4061395/pexels-photo-4061395.jpeg",
      description: "Le migliori marche di sneakers e scarpe eleganti",
      link: "/catalog?category=scarpe"
    },
    {
      title: "Abbigliamento",
      image: "https://images.pexels.com/photos/7674327/pexels-photo-7674327.jpeg",
      description: "Collezioni esclusive dei brand più prestigiosi",
      link: "/catalog?category=abbigliamento"
    },
    {
      title: "Accessori",
      image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      description: "Borse, cinture e accessori di lusso",
      link: "/catalog?category=accessori"
    }
  ];

  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/etna.png"
            alt="Etna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative container-custom text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Eleganza Siciliana
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
              Scopri la nostra esclusiva selezione di abbigliamento e scarpe dei migliori brand internazionali
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/catalog" 
                className="btn-primary bg-white text-black hover:bg-gray-100 inline-flex items-center justify-center"
                data-testid="shop-now-button"
              >
                Acquista Ora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="#collections" 
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-black inline-flex items-center justify-center"
              >
                Scopri Collezioni
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="collections" className="py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">
              Le Nostre Collezioni
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Esplora la nostra curata selezione di prodotti dei brand più prestigiosi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-heading text-2xl font-medium mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                    <div className="flex items-center text-sm font-medium">
                      Scopri di più
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">
                Prodotti in Evidenza
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Una selezione dei nostri prodotti più amati
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-w-16 aspect-h-12">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          {product.brand.replace('_', ' ')}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">4.5</span>
                        </div>
                      </div>
                      <h3 className="font-heading text-lg font-medium mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light">€{product.price.toFixed(2)}</span>
                        <Link 
                          to={`/product/${product.id}`}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Dettagli
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/catalog" 
                className="btn-primary inline-flex items-center"
              >
                Vedi Tutti i Prodotti
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-6">
            Pronto a Scoprire l'Eleganza?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Unisciti a migliaia di clienti che hanno scelto Trinacria Hub per il loro stile unico
          </p>
          <Link 
            to="/catalog" 
            className="bg-white text-primary px-8 py-4 font-medium tracking-wide uppercase text-sm hover:bg-gray-100 transition-all inline-flex items-center"
          >
            Inizia Shopping Ora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
