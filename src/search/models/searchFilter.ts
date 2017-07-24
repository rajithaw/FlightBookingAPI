export interface ISearchFilter {
    departureAirportCode: string;
    returnAirportCode: string;
    departureDate: Date;
    returnDate: Date;
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: number;
}
