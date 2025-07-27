interface RocketMass {
    kg: number | null;
}

interface RocketInfo {
    rocket_name: string;
    rocket: {
        id: string;
        name: string;
        success_rate_pct: number;
        mass: RocketMass;
    };
}

interface LaunchLinks {
    mission_patch_small: string | null;
    flickr_images: string[];
}

export interface LaunchChartData {
    id: string;
    launch_year: string;
    mission_name: string;
    launch_date_utc: string;
    launch_success: boolean | null;
    rocket: RocketInfo;
    links: LaunchLinks;
    launch_site: {
        site_name: string;
    };
    details: string | null;
}

export interface LaunchesResponse {
    launches: LaunchChartData[];
}

export interface LaunchResponseSingle {
    launch: LaunchChartData;
}
