import type { LaunchChartData } from '../../types/spacex';

export interface LaunchListProps {
    launches: LaunchChartData[];
    selected: string[];
    onToggle: (id: string) => void;
    isLoading?: boolean;
}
