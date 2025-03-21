
import React, { useState } from "react";
import { ArrowRight, Search, ShoppingBag, Sparkles, Store } from "lucide-react";
import CTAButton from "./CTAButton";
import OnboardingModal from "./OnboardingModal";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onSearch: (category: string, location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleComplete = (category: string, location: string) => {
    onSearch(category, location);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center pt-12 pb-20 gap-8">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Find amazing products with ease
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Discover the best
              <span className="relative whitespace-nowrap">
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                  {" "}Products{" "}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-full mt-1 h-[0.58em] w-full fill-primary/30"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
              </span>
              <br />
              for your store
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Find the perfect Shopify stores and products with our intelligent search. 
              Start by choosing a category and location to discover stores that match your preferences.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton 
                onClick={() => setShowModal(true)}
                className="bg-primary text-white hover:bg-primary/90 shadow-md"
                highlight={true}
                icon={<Search />}
              >
                Start Searching
              </CTAButton>
              
              <CTAButton 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => setShowModal(true)}
                icon={<ShoppingBag />}
              >
                Find Products
              </CTAButton>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2 text-muted-foreground">
              <span className="flex items-center text-sm">
                <Store className="mr-1 h-4 w-4" /> 1000+ stores
              </span>
              <span className="flex items-center text-sm">
                <ShoppingBag className="mr-1 h-4 w-4" /> Millions of products
              </span>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-lg bg-primary/20 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg bg-blue-400/20 -z-10"></div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-background">
                <div className="p-4 border-b">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center space-x-3 bg-muted/50 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Search className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded-md w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex space-x-3">
                        <div className="w-14 h-14 rounded-md bg-muted"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded-md w-3/4"></div>
                          <div className="h-3 bg-muted rounded-md w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div className="h-4 bg-muted rounded-md w-16 ml-2"></div>
                    </div>
                    <div className="w-20 h-8 rounded-md bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background/50 backdrop-blur-sm -z-10"></div>
      
      <OnboardingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default HeroSection;
