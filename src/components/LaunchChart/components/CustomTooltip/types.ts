import type { ChartDataItem } from "../../types";

export interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: ChartDataItem }>;
}
