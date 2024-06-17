import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <Container
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/IAssist-logo.png" alt="logo" />
      <Link to="assist">
        <Button variant="outlined">Ir al chat</Button>
      </Link>
    </Container>
  );
};
