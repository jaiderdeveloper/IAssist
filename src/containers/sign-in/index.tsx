import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <Link to="chat-gpt">
      <Button>Ir al chat</Button>
    </Link>
  );
};
