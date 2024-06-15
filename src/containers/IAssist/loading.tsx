import { Backdrop, Typography } from "@mui/material";
import { FC } from "react";
import { TLoading } from "./types";

export const Loading: FC<TLoading> = ({ infoText }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!infoText}
    >
      <Typography color="white" fontSize="0.75rem" textAlign="center">
        {infoText}
      </Typography>
    </Backdrop>
  );
};
