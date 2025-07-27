import { useState } from 'react';
import type { LaunchChartData } from '../types/spacex';
import { fetchLaunch } from '../api/space';

export const useSelection = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedLaunches, setSelectedLaunches] = useState<{ [key: string]: LaunchChartData }>({});
    const [isLoadingSelection, setIsLoadingSelection] = useState(false);

    const toggle = async (id: string) => {
        const isSelected = selected.includes(id);
        const updated = isSelected
            ? selected.filter(i => i !== id)
            : [...selected, id];
        setSelected(updated);

        if (!isSelected && !selectedLaunches[id]) {
            try {
                setIsLoadingSelection(true);
                const launch = await fetchLaunch(id);
                if (launch) {
                    setSelectedLaunches(prev => ({
                        ...prev,
                        [id]: launch
                    }));
                }
            } finally {
                setIsLoadingSelection(false);
            }
        }
    };

    const selectAll = async (ids: string[]) => {
        setSelected(ids);

        const idsToFetch = ids.filter(id => !selectedLaunches[id]);
        if (idsToFetch.length === 0) return;

        try {
            setIsLoadingSelection(true);
            const launchPromises = idsToFetch.map(id => fetchLaunch(id));
            const launches = await Promise.all(launchPromises);
            
            const newLaunches = launches.reduce<{ [key: string]: LaunchChartData }>((acc, launch) => {
                if (launch) {
                    acc[launch.id] = launch;
                }
                return acc;
            }, {});

            setSelectedLaunches(prev => ({ ...prev, ...newLaunches }));
        } finally {
            setIsLoadingSelection(false);
        }
    };

    const deselectAll = () => {
        setSelected([]);
        setSelectedLaunches({});
    };

    return {
        selected,
        selectedLaunches,
        isLoadingSelection,
        toggle,
        selectAll,
        deselectAll,
    };
};
