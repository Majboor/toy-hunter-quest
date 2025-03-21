
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Search, ShoppingCart, Zap } from "lucide-react";

const FeatureSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">How it works</h2>
        <p className="text-lg text-muted-foreground">
          Our platform makes it easy to discover Shopify stores and products that match your interests,
          no matter where you are in the world.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Search className="h-8 w-8 text-primary" />,
            title: "Search",
            description: "Start by entering a product category you're interested in, like 'clothing' or 'home decor'."
          },
          {
            icon: <Globe className="h-8 w-8 text-primary" />,
            title: "Location",
            description: "Specify your location to find stores that ship to your region or are based nearby."
          },
          {
            icon: <ShoppingCart className="h-8 w-8 text-primary" />,
            title: "Discover",
            description: "Browse through a curated list of Shopify stores that match your search criteria."
          },
          {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: "Shop",
            description: "Explore products from each store and find exactly what you're looking for."
          }
        ].map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
