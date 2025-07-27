import { useEffect, useState } from 'react';
import { fetchLaunches } from '../api/space';
import type { LaunchChartData } from '../types/spacex';

export const useLaunchData = () => {
  const [launches, setLaunches] = useState<LaunchChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLaunches(100);
        setLaunches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading launches');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredLaunches = launches.filter(l =>
    l && l.id && l.mission_name && l.launch_date_utc
  );

  return { launches, filteredLaunches, isLoading, error };
};
