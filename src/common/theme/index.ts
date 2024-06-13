import { ThemeOptions, createTheme } from "@mui/material/styles";
import { palette } from "./colors";
import { esES } from "@mui/material/locale";

const themeOptions: ThemeOptions = {
  palette,
  typography: { fontFamily: "Poppins" },
};

const theme = createTheme(themeOptions, esES);

export default theme;
