import {
  Container,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  Paper,
} from '@mui/material';
import { darkTheme } from './theme';
import { LaunchList } from './components/LaunchList';
import { LaunchChart } from './components/LaunchChart';
import { useLaunchData } from './hooks/useLaunchData';
import { useSelection } from './hooks/useSelection';
import { calculateTotalEnergy } from './utils/calculateTotalEnergy';


const App = () => {
  const { filteredLaunches, isLoading, error } = useLaunchData();
  const {
    selected,
    selectedLaunches,
    toggle,
    selectAll,
    deselectAll,
    isLoadingSelection,
  } = useSelection();

  const selectedList = Object.values(selectedLaunches);
  const totalEnergy = calculateTotalEnergy(selectedList);



  if (isLoading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }



  if (error) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box p={3}>
          <Typography color="error">Error loading launches: {error}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
          width: '100%'
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ minHeight: 64 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              SpaceX Launches Dashboard
            </Typography>
            <Box sx={{ '& > *:not(:last-child)': { mr: 1.5 } }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => selectAll(filteredLaunches.map(l => l.id))}
                disabled={isLoading || filteredLaunches.length === 0}
                sx={{ textTransform: 'none' }}
              >
                Select All
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={deselectAll}
                disabled={selected.length === 0}
                sx={{ textTransform: 'none' }}
              >
                Clear Selection
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ flex: 1, minHeight: 'calc(100vh - 64px)', backgroundColor: 'background.default' }}>
        <Container maxWidth={false} sx={{ height: '100%', py: 3, px: { xs: 2, sm: 3, md: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 3,
              height: '100%',
              minHeight: 'calc(100vh - 120px)',
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', lg: '35%' },
                maxWidth: { lg: 500 },
                height: 'calc(100vh - 180px)',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <LaunchList
                launches={filteredLaunches}
                selected={selected}
                onToggle={toggle}
                isLoading={isLoading}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '50vh', lg: 'auto' },
                height: { xs: 'auto', lg: '100%' },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Launch Analysis
                </Typography>

                {error ? (
                  <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    p={3}
                  >
                    <Typography color="error" variant="subtitle1" gutterBottom>
                      Error Loading Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {error}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.location.reload()}
                      sx={{ mt: 2 }}
                    >
                      Retry
                    </Button>
                  </Box>
                ) : selected.length === 0 ? (
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 4,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No Launches Selected
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Select one or more launches from the list to view detailed analysis and metrics
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Box
                      mb={4}
                      p={3}
                      sx={{
                        backgroundColor: 'background.default',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end"
                      >
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Total Energy Consumption
                          </Typography>
                          <Typography
                            variant="h4"
                            color="primary"
                            sx={{ mt: 0.5 }}
                          >
                            {totalEnergy.toLocaleString()} J
                          </Typography>
                        </Box>

                      </Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        *Energy is estimated based on rocket mass. The calculation assumes 15 kg of fuel per 1 kg of mass to reach orbit, with fuel energy density of 1.35×10⁷ J/kg.
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        minHeight: 400,
                        position: 'relative',
                      }}
                    >
                      <LaunchChart data={selectedList} isLoading={isLoadingSelection} />
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
