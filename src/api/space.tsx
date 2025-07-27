import { GraphQLClient, gql } from 'graphql-request';
import type { LaunchChartData } from '../types/spacex';

const endpoint = import.meta.env.VITE_BASE_URL;
const client = new GraphQLClient(endpoint);

const LAUNCH_FRAGMENT = gql`
  fragment LaunchFields on Launch {
    id
    mission_name
    launch_date_utc
    launch_success
    details
    rocket {
      rocket_name
      rocket_type
      rocket {
        id
        name
        success_rate_pct
        mass {
          kg
          lb
        }
      }
    }
    launch_site {
      site_name
      site_name_long
    }
    links {
      mission_patch_small
      flickr_images
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      ...LaunchFields
    }
  }
  ${LAUNCH_FRAGMENT}
`;

export const GET_LAUNCH = gql`
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      ...LaunchFields
    }
  }
  ${LAUNCH_FRAGMENT}
`;

const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

async function withCache<T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const cached = cache.get(key);
  
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fn();
  cache.set(key, { data, timestamp: now });
  return data;
}

function transformToLaunchChartData(launch: any): LaunchChartData | null {
  if (!launch) return null;

  const rocket = {
    rocket_name: launch.rocket?.rocket_name || 'Unknown Rocket',
    rocket: {
      id: launch.rocket?.rocket?.id || 'unknown',
      name: launch.rocket?.rocket?.name || 'Unknown Rocket',
      success_rate_pct: launch.rocket?.rocket?.success_rate_pct || 0,
      mass: { kg: launch.rocket?.rocket?.mass?.kg || 0 }
    }
  };

  const launchDate = launch.launch_date_utc || new Date().toISOString();
  let launchYear = launch.launch_year || '';
  
  if (!launchYear) {
    try {
      launchYear = new Date(launchDate).getFullYear().toString();
    } catch (e) {
      console.error('Error parsing launch date:', e);
    }
  }

  return {
    id: launch.id,
    mission_name: launch.mission_name || 'Unknown Mission',
    launch_year: launchYear,
    launch_date_utc: launchDate,
    launch_success: launch.launch_success || false,
    rocket,
    links: {
      mission_patch_small: launch.links?.mission_patch_small || null,
      flickr_images: launch.links?.flickr_images || []
    },
    launch_site: {
      site_name: launch.launch_site?.site_name || 'Unknown Site'
    },
    details: launch.details || null
  };
}

export const fetchLaunches = async (limit = 20, offset = 0): Promise<LaunchChartData[]> => {
  const cacheKey = `launches-${limit}-${offset}`;
  
  return withCache(cacheKey, async () => {
    try {
      const { launches } = await client.request<{ launches: any[] }>(
        GET_LAUNCHES, 
        { limit, offset }
      );
      return (launches || []).map(transformToLaunchChartData).filter(Boolean) as LaunchChartData[];
    } catch (error) {
      console.error('Error fetching launches:', error);
      return [];
    }
  });
};

export const fetchLaunch = async (id: string): Promise<LaunchChartData | null> => {
  const cacheKey = `launch-${id}`;
  
  return withCache(cacheKey, async () => {
    try {
      const { launch } = await client.request<{ launch: any }>(GET_LAUNCH, { id });
      return transformToLaunchChartData(launch);
    } catch (error) {
      console.error(`Error fetching launch ${id}:`, error);
      return null;
    }
  });
};
