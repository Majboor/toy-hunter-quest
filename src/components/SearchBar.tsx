
import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), location.trim());
    }
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto"
      >
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
          />
        </div>
        <input
          type="text"
          placeholder="Location (e.g., us, pk, in)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full md:w-44 h-12 px-4 rounded-lg border border-input bg-background/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
