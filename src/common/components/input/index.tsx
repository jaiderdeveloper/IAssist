import { TextField, TextFieldProps, styled } from "@mui/material";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-root": {
    fontSize: "1em",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.9em",
    paddingBottom: "3px",
  },
  "& .MuiInputBase-root": {
    height: "38px",
    paddingBottom: "3px",
  },
}));

/**
 * Adaptador input
 * @param props
 */
export const InputMUI = (props: TextFieldProps) => {
  return (
    <CustomTextField
      {...props}
      fullWidth
      size="small"
      InputLabelProps={{ ...props?.InputLabelProps, shrink: true }}
    />
  );
};
