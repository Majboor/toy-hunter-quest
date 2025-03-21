
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <a 
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover-lift"
    >
      <div className="aspect-[3/4] w-full overflow-hidden relative">
        <div className={`w-full h-full bg-muted animate-pulse ${imageLoaded ? 'hidden' : 'block'}`}></div>
        <img
          src={product.image_url}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium text-card-foreground line-clamp-2">{product.title}</h3>
          <ExternalLink size={14} className="ml-1 text-muted-foreground" />
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
