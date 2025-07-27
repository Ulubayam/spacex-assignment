import { Card, CardContent, Typography, useTheme, Box, CircularProgress } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    Tooltip,
} from 'recharts';
import type { LaunchChartProps } from './types';
import { getSuccessColor } from '../../utils/getSuccessColor';
import { CustomTooltip } from './components/CustomTooltip';
import { getRocketStats } from '../../lib/rocket/getRocketStats';

export const LaunchChart = ({ data, isLoading = false }: LaunchChartProps) => {
    const theme = useTheme();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Card sx={{ mt: 4, p: 3, textAlign: 'center' }}>
                <Typography>No launch data available for the selected criteria.</Typography>
            </Card>
        );
    }



    return (
        <Card sx={{ mt: 4, p: 3 }}>
            <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 500 }}>
                    Rocket Launch Success Rates
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 3,
                        flexWrap: 'wrap',
                        mb: 2
                    }}>
                        {[
                            { label: '≥70% Success', color: theme.palette.success.main },
                            { label: '30-69% Success', color: theme.palette.warning.main },
                            { label: '<30% Success', color: theme.palette.error.main }
                        ].map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    bgcolor: item.color,
                                    borderRadius: '2px'
                                }} />
                                <Typography variant="caption" color="text.secondary">
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{
                        width: '100%',
                        height: 350,
                        position: 'relative',
                        '& .recharts-cartesian-axis-tick text': {
                            fontSize: '11px',
                            fill: theme.palette.text.secondary,
                        }
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={getRocketStats(data)}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    tickFormatter={(value) => `${value}%`}
                                    tick={{ fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={5}
                                />
                                <YAxis
                                    dataKey="rocket"
                                    type="category"
                                    width={100}
                                    tick={{ fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={5}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="successRate"
                                    name="Success Rate"
                                    barSize={14}
                                    radius={[0, 2, 2, 0]}
                                >
                                    {getRocketStats(data).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={getSuccessColor(entry.successRate, theme)}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                {getRocketStats(data).length > 0 && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {`Displaying ${getRocketStats(data).length} rocket type${getRocketStats(data).length !== 1 ? 's' : ''}`}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
