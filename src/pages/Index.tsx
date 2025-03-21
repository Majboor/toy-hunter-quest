
import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import StoreCard from "../components/StoreCard";
import Loader from "../components/Loader";
import { searchStores } from "../services/api";
import { SearchResponse, StoreResult } from "../types";

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

    try {
      const data: SearchResponse = await searchStores(query, location);
      setSearchResults(data.results);
      
      if (data.results.length === 0) {
        setError("No stores found for your search. Try different keywords or location.");
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-10 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-4 md:mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in mb-2">
            Discover Shopify Stores
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Find the perfect products with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              ProductFinder
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your product category and location to discover online stores that match your preferences.
          </p>
        </div>
        
        <div className="w-full mb-10">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && (
          <Loader message="Searching for stores..." />
        )}

        {error && !isLoading && (
          <div className="w-full text-center py-8">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {searchResults && !isLoading && searchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Results for "{searchQuery}"
                {searchLocation && <span className="text-muted-foreground"> in {searchLocation}</span>}
              </h2>
              <span className="text-sm text-muted-foreground">
                {searchResults.length} store{searchResults.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((store, index) => (
                <div key={store.link} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchResults && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-primary/10">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Start your search</h3>
            <p className="text-muted-foreground max-w-sm">
              Enter a product category like "toys" or "clothing" and an optional location to discover stores.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Import missing component
import { Search } from "lucide-react";

export default Index;
