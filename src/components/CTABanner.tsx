
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import OnboardingModal from "./OnboardingModal";

interface CTABannerProps {
  onSearch: (category: string, location: string) => void;
}

const CTABanner: React.FC<CTABannerProps> = ({ onSearch }) => {
  const [showModal, setShowModal] = useState(false);

  const handleComplete = (category: string, location: string) => {
    onSearch(category, location);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-blue-700 text-white p-8 md:p-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your perfect store?</h2>
            <p className="text-white/90 text-lg mb-6">
              Start your search now and discover amazing Shopify stores that match exactly what you're looking for.
            </p>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-white text-primary hover:bg-white/90 hover:text-primary/90"
              size="lg"
            >
              Start Searching <Search className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="hidden md:block rounded-lg bg-white/10 p-6 backdrop-blur-sm border border-white/20">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['Clothing', 'Electronics', 'Home Decor', 'Toys', 'Beauty', 'Sports'].map((category) => (
                <div 
                  key={category}
                  className="flex items-center rounded-md bg-white/10 px-3 py-2 hover:bg-white/20 cursor-pointer transition-colors"
                >
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <OnboardingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default CTABanner;
