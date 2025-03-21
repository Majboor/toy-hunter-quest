
export interface StoreResult {
  link: string;
  snippet: string;
  title: string;
}

export interface SearchResponse {
  query: string;
  results: StoreResult[];
}

export interface Product {
  image_url: string;
  title: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
}
