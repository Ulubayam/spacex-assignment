import type { LaunchChartData } from '../../types/spacex';
import type { ChartDataItem, RocketStats } from './types';

export const getRocketStats = (data: LaunchChartData[]): ChartDataItem[] => {
  const rocketStats = new Map<string, RocketStats>();

  data.forEach((launch) => {
    if (!launch.rocket) return;

    const rocketName =
      launch.rocket.rocket_name ||
      (typeof launch.rocket.rocket === 'object' ? launch.rocket.rocket?.name : null) ||
      'Unknown Rocket';

    const successRatePct =
      typeof launch.rocket.rocket === 'object' && launch.rocket.rocket?.success_rate_pct
        ? launch.rocket.rocket.success_rate_pct
        : 0;

    const existing = rocketStats.get(rocketName);
    if (existing) {
      existing.totalLaunches++;
      existing.successRateSum += successRatePct;
      existing.successRateAvg = existing.successRateSum / existing.totalLaunches;
    } else {
      rocketStats.set(rocketName, {
        name: rocketName,
        totalLaunches: 1,
        successRateSum: successRatePct,
        successRateAvg: successRatePct,
      });
    }
  });

  return Array.from(rocketStats.entries())
    .map(([rocketName, stats]) => ({
      rocket: rocketName,
      successRate: stats.successRateAvg,
      count: stats.totalLaunches,
      name: rocketName,
    }))
    .sort((a, b) => b.successRate - a.successRate);
};
