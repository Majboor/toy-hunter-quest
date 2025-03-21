
import React, { useState } from "react";
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
import { Search } from "lucide-react";

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
      const data: SearchResponse = await searchStores(query, location);
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

  return (
    <Layout>
      <div className="flex flex-col">
        <HeroSection onSearch={handleSearch} />
        
        {isLoading && (
          <div className="container mx-auto px-4 py-16">
            <Loader message="Searching for stores..." />
          </div>
        )}

        {error && !isLoading && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {searchResults && !isLoading && searchResults.length > 0 && (
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
                {searchResults.map((store, index) => (
                  <div key={store.link} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <StoreCard store={store} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
