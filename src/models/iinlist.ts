interface Scheme {
    name: string;
}

interface Product {
    name: string;
    segment: string;
}

interface Country {
    code: string;
}

interface Account {
    funding: string;
    country: Country;
}

interface Issuer {
    name: string;
}

interface FastFunds {
    domestic: boolean;
    cross_border: boolean;
}

interface Card {
    scheme: Scheme;
    product: Product;
    account: Account;
    issuer: Issuer;
    fast_funds: FastFunds;
}

interface Embedded {
    cards: Card[];
}

// Response from API
export interface IINLookupResult {
    count: number;
    _embedded: Embedded;
}

