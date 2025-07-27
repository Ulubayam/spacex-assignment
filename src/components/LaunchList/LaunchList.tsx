import {
    List,
    ListItemButton,
    Typography,
    Box,
    CircularProgress,
    Paper,
    ListItem,
    useTheme,
    Checkbox,
    ListItemIcon,
    Avatar,
    Divider
} from '@mui/material';
import { CalendarToday, RocketLaunch } from '@mui/icons-material';
import type { LaunchListProps } from './types';
import { imageResolver } from '../../utils/imageResolver';
import { rocketName } from '../../utils/rocketName';

export const LaunchList = ({
    launches,
    selected,
    onToggle,
    isLoading = false
}: LaunchListProps) => {
    const theme = useTheme();
    const handleToggle = (id: string) => {
        onToggle(id);
    }

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        )
    }

    if (launches.length === 0) {
        return (
            <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                    No launches available
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper
            }}
        >
            <Box sx={{
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                flexShrink: 0
            }}>
                <Typography variant="h6" component="div">
                    SpaceX Launches
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {launches.length} launches available
                </Typography>
            </Box>

            <Box sx={{
                flex: 1,
                overflow: 'auto',
                minHeight: 0,
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: theme.palette.background.default,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: theme.palette.action.selected,
                }
            }}>
                <List disablePadding>
                    {launches.map((launch) => {
                        const isSelected = selected.includes(launch.id);

                        return (
                            <Box key={launch.id}>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        backgroundColor: isSelected
                                            ? theme.palette.action.selected
                                            : 'transparent',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover
                                        }
                                    }}
                                >
                                    <ListItemButton
                                        role="button"
                                        onClick={() => handleToggle(launch.id)}
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 80, position: 'relative' }}>
                                            <Checkbox
                                                edge="start"
                                                checked={isSelected}
                                                tabIndex={-1}
                                                disableRipple
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: theme.palette.primary.main,
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                    },
                                                }}
                                            />

                                        </ListItemIcon>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flex: 1,
                                                minWidth: 0
                                            }}
                                        >
                                            <Avatar
                                                src={imageResolver(launch)}
                                                alt={launch.mission_name || 'Launch'}
                                                variant="rounded"
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    mr: 2,
                                                    backgroundColor: theme.palette.background.default
                                                }}
                                            />

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    noWrap
                                                    sx={{
                                                        fontWeight: 500,
                                                        color: isSelected
                                                            ? theme.palette.primary.main
                                                            : theme.palette.text.primary
                                                    }}
                                                >
                                                    {launch.mission_name || 'Unnamed Launch'}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        mt: 0.5,
                                                        '& > *:not(:last-child)': {
                                                            mr: 1.5
                                                        }
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            color: 'text.secondary'
                                                        }}
                                                    >
                                                        <CalendarToday
                                                            fontSize="small"
                                                            sx={{ mr: 0.5, fontSize: '1rem' }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            noWrap
                                                        >
                                                            {launch.launch_year}
                                                        </Typography>
                                                    </Box>

                                                    {launch.rocket && (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            <RocketLaunch
                                                                fontSize="small"
                                                                sx={{ mr: 0.5, fontSize: '1rem' }}
                                                            />
                                                            <Typography
                                                                variant="caption"
                                                                noWrap
                                                            >
                                                                {rocketName(launch.rocket)}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </Box>
                        );
                    })}
                </List>
            </Box>

            {selected.length > 0 && (
                <Box
                    sx={{
                        p: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {selected.length} launch{selected.length !== 1 ? 'es' : ''} selected
                    </Typography>
                </Box>
            )}
        </Paper>
    )
}