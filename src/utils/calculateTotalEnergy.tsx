import type { LaunchChartData } from '../types/spacex';

const FUEL_MASS_RATIO = 15;
const FUEL_ENERGY_DENSITY = 1.35e7;

export const calculateTotalEnergy = (launches: LaunchChartData[]): number => {
    return launches.reduce((total, launch) => {
        const rocketMass = launch.rocket?.rocket?.mass?.kg ?? 500_000;
        const payloadMass = 0;
        const totalMass = rocketMass + payloadMass;
        return total + totalMass * FUEL_MASS_RATIO * FUEL_ENERGY_DENSITY;
    }, 0);
};
