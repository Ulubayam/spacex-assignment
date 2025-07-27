export interface RocketStats {
    name: string;
    totalLaunches: number;
    successRateSum: number;
    successRateAvg: number;
}

export interface ChartDataItem {
    rocket: string;
    successRate: number;
    count: number;
    name: string;
}