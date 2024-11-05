import apiClient from "./api-client";

export interface Quote {
  quote: string;
  author: string;
  category?: string;
}

class QuoteService {
  static getRandomQuote() {
    return apiClient.get<Quote[]>("/quotes");
  }
}

export default QuoteService;
