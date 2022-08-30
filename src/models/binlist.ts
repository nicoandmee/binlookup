interface Number {
    length: number;
    luhn: boolean;
}

interface Country {
    numeric: string;
    alpha2: string;
    name: string;
    emoji: string;
    currency: string;
    latitude: number;
    longitude: number;
}

interface Bank {
    name: string;
    url: string;
    phone: string;
    city: string;
}

export type BinLookupResponse = {
    scheme: string;
    type: string;
    brand: string;
    bank: Bank;
    number?: Number;
    prepaid?: boolean;
    country?: Country;
}