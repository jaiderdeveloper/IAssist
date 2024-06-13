import { InputMUI } from "@/common/components/input";
import { ArrowUpward } from "@mui/icons-material";
import { Box, Grid, IconButton, useTheme, Typography } from "@mui/material";

export const ChartGPT = () => {
  const theme = useTheme();

  return (
    <Box width="100vw" height="100vh" bgcolor={theme.palette.common.black}>
      <Grid container columns={12} rowGap={2} p={1}>
        <Grid item xs={12}>
          <Box
            border={`1px solid ${theme.palette.grey[800]}`}
            p={2}
            borderRadius={2}
          >
            <Typography color="white">xs</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} display="flex" gap={2} alignItems="center">
          <InputMUI label="Envía un mensaje a ChatGPT" />
          <IconButton
            sx={{
              background: theme.palette.grey[800],
              ":hover": { background: theme.palette.primary.main },
            }}
          >
            <ArrowUpward />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
