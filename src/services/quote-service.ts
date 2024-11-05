import apiClient from "./api-client";

export interface Quote {
  quote: string;
  author: string;
  category: string;
}

class QuoteService {
  static getRandomQuote(params: { category?: string }) {
    return apiClient.get<Quote[]>("/quotes", { params });
  }
}

export default QuoteService;
