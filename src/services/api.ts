
import { SearchResponse, ProductsResponse } from "../types";

const API_URL = "https://productfinder.techrealm.online";

export const searchStores = async (query: string, location: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
    
    if (!response.ok) {
      throw new Error(`API returned error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching stores:", error);
    throw error;
  }
};

export const getStoreProducts = async (storeUrl: string): Promise<ProductsResponse> => {
  try {
    // Extract domain name from URL
    const domain = new URL(storeUrl).hostname.replace('www.', '');
    
    const response = await fetch(`${API_URL}/sitemap?url=${encodeURIComponent(domain)}`);
    
    if (!response.ok) {
      throw new Error(`API returned error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching store products:", error);
    throw error;
  }
};
