import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <Link to="assist">
      <Button variant="outlined">Ir al chat</Button>
    </Link>
  );
};
