import type { Theme } from '@mui/material';

export const getSuccessColor = (successRate: number, theme: Theme): string => {
  if (successRate >= 70) return theme.palette.success.main;
  if (successRate >= 30) return theme.palette.warning.main;
  return theme.palette.error.main;
};
