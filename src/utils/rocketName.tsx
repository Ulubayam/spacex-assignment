export const rocketName = (rocket: any): string => {
    if (!rocket) return 'Unknown Rocket';
    if (typeof rocket === 'string') return rocket;
    if (rocket.rocket_name) return rocket.rocket_name;
    if (rocket.name) return rocket.name;
    if (rocket.rocket?.name) return rocket.rocket.name;
    return 'Unknown Rocket';
};