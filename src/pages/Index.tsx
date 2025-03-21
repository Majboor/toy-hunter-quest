import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import StoreCard from "../components/StoreCard";
import Loader from "../components/Loader";
import { searchStores } from "../services/api";
import { SearchResponse, StoreResult } from "../types";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import TestimonialSection from "../components/TestimonialSection";
import CTABanner from "../components/CTABanner";
import { toast } from "sonner";
import { Search, Lock } from "lucide-react";
import CTAButton from "../components/CTAButton";

const Index = () => {
  const [searchResults, setSearchResults] = useState<StoreResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  const handleSearch = async (query: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    setSearchLocation(location);

    toast.info(`Searching for ${query} in ${location}...`, {
      icon: <Search className="h-4 w-4" />,
    });

    try {
      const data: SearchResponse = await searchStores(query, location, 5);
      setSearchResults(data.results);
      
      if (data.results.length === 0) {
        setError("No stores found for your search. Try different keywords or location.");
        toast.error("No stores found. Try different keywords or location.");
      } else {
        toast.success(`Found ${data.results.length} stores matching your search!`);
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      toast.error("An error occurred while searching. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSearchResults = () => {
    if (!searchResults || searchResults.length === 0) return null;

    return (
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              Results for "{searchQuery}"
              {searchLocation && <span className="text-muted-foreground"> in {searchLocation}</span>}
            </h2>
            <span className="text-sm text-muted-foreground">
              {searchResults.length} store{searchResults.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.slice(0, 4).map((store, index) => (
              <div key={store.link} className="animate-fade-up relative" style={{ animationDelay: `${index * 0.1}s` }}>
                <StoreCard store={store} />
                
                {index >= 2 && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-border">
                    <Lock className="h-10 w-10 text-primary mb-3" />
                    <p className="text-center font-medium mb-4">Premium Content</p>
                    <CTAButton highlight>
                      Unlock All Results
                    </CTAButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const pageTitle = searchQuery 
    ? `${searchQuery} Stores${searchLocation ? ` in ${searchLocation}` : ''} - ProductFinder`
    : "ProductFinder - Discover Top Shopify Stores and Products";
  
  const pageDescription = searchQuery
    ? `Browse ${searchResults?.length || 0} Shopify stores selling ${searchQuery}${searchLocation ? ` in ${searchLocation}` : ''}. Find the perfect products for your needs.`
    : "Discover the best Shopify stores and products with ProductFinder. Search by category and location to find exactly what you're looking for.";

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
      
      <div className="flex flex-col">
        <HeroSection onSearch={handleSearch} />
        
        {isLoading && (
          <Loader 
            fullScreen 
            message={`Searching for "${searchQuery}" in ${searchLocation || "all locations"}...`} 
          />
        )}

        {error && !isLoading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {searchResults && !isLoading && searchResults.length > 0 && (
          renderSearchResults()
        )}
        
        {!searchResults && !isLoading && !error && (
          <>
            <FeatureSection />
            <TestimonialSection />
            <CTABanner onSearch={handleSearch} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
