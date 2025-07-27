import { Box } from '@mui/material';
import type { CustomTooltipProps } from './types';

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <Box sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                color: 'common.white',
                p: 1.5,
                borderRadius: 1,
                fontSize: '13px',
                pointerEvents: 'none',
                zIndex: 10,
                minWidth: 180,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
                <Box sx={{ mb: 1, pb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>{data.rocket}</Box>
                    <Box>{data.count} {data.count === 1 ? 'launch' : 'launches'}</Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box>Success Rate:</Box>
                    <Box sx={{ fontWeight: 'bold' }}>{data.successRate.toFixed(1)}%</Box>
                </Box>
            </Box>
        );
    }
    return null;
};
