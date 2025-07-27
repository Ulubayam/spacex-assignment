import type { LaunchChartData } from "../../types/spacex";

export interface LaunchChartProps {
    data: LaunchChartData[];
    isLoading?: boolean;
}

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
}