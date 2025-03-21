
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getStoreProducts } from "../services/api";
import { Product } from "../types";

const StoreProducts = () => {
  const [searchParams] = useSearchParams();
  const storeUrl = searchParams.get("url") || "";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Extract store domain for display
  const storeDomain = storeUrl ? new URL(decodeURIComponent(storeUrl)).hostname : "";
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeUrl) {
        setError("No store URL provided");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const decodedUrl = decodeURIComponent(storeUrl);
        const data = await getStoreProducts(decodedUrl, 5);
        setProducts(data.products || []);
        
        if (!data.products || data.products.length === 0) {
          setError("No products found for this store.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products from this store. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [storeUrl]);
  
  // Generate page title and descriptions for meta tags
  const pageTitle = storeDomain ? `Products from ${storeDomain} - ProductFinder` : "Store Products - ProductFinder";
  const pageDescription = storeDomain 
    ? `Discover ${products.length} products from ${storeDomain}. View detailed product information and visit the store.`
    : "Browse products from top Shopify stores with ProductFinder.";
  
  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-1" size={16} />
            Back to search
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Products from{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                  {storeDomain}
                </span>
              </h1>
              
              {!isLoading && !error && products.length > 0 && (
                <p className="text-muted-foreground mt-1">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
            
            <a
              href={decodeURIComponent(storeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Visit Store
              <ExternalLink className="ml-1" size={14} />
            </a>
          </div>
        </div>
        
        {isLoading && (
          <Loader message="Loading products..." />
        )}
        
        {error && !isLoading && (
          <div className="text-center py-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div key={product.url} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StoreProducts;
