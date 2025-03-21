
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { StoreResult } from "../types";

interface StoreCardProps {
  store: StoreResult;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  // Create a URL object to extract domain
  const urlObj = new URL(store.link);
  const domain = urlObj.hostname;
  
  // Encode the full URL for use in our app's routing
  const encodedStoreUrl = encodeURIComponent(store.link);
  
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover-lift">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-card-foreground line-clamp-2">{store.title}</h3>
          <a 
            href={store.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Visit store website"
          >
            <ExternalLink size={16} />
          </a>
        </div>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{store.snippet}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
            {domain}
          </span>
          
          <Link
            to={`/store?url=${encodedStoreUrl}`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            View Products
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 transform group-hover:translate-x-1">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
