export interface dataObj {
    countryEn: string;
    countryRu: string;
    regionEn: string;
    regionRu: string;
    population: number;
    capitalEn: string;
    capitalRu: string;
    regionCode: string;
    countryCode: number;
    countryCodeLetters: string;
    area: number;
    length?: number;
}

export interface stateObj {
    regionCode: string;
    max: number;
    min: number;
    usedCountries: string[];
    round: number;
    score: number;
}
