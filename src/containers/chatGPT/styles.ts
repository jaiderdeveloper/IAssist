import { Theme } from "@mui/material";
import { TStyle } from "@/common/types";

export const styleSheet = (theme: Theme) => {
  const style: TStyle = {
    messages: {
      p: 2,
      gap: 2,
      borderRadius: 2,
      overflow: "auto",
    },
    flexibleContent: {
      flexDirection: "row",
      gap: 1,
    },
    button: {
      background: theme.palette.grey[800],
      height: "38px",
      width: "38px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      justifyContent: "end",
      height: "100dvh",
      pb: 2,
    },
  };

  return style;
};
