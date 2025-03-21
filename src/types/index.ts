
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  value: string;
}

export interface CountryOption {
  name: string;
  code: string;
  flag: string;
}
