export interface ProductData {
    name: string;
    rating: string;
    numberOfRatings: string;
    price: string;
    discount: string;
    aboutThisItem: string[];
    productInformation: Record<string, string>;
    productImages: string[];
    aiSummary: string;
    bankOffers?: string[];
    manufacturerImages?: string[];
  }
  