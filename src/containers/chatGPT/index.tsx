import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { InputMUI } from "@/common/components/input";
import { ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  useTheme,
  Typography,
  Stack,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { TConversation } from "./types.d";

export const ChartGPT = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string>("");
  const [conversation, setConversation] = useState<TConversation[]>([]);

  const engine = Promise. await CreateMLCEngine("gemma-2b-it-q4f32_1-MLC", {
    initProgressCallback: (info) => {
      console.log("⚡", info);
    },
  });

  /**
   * Capturar valor del campo de mensaje
   * @function handleChange
   * @param event evento
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  /**
   * Enviar mensaje
   * @function handleClick
   * @param event evento
   */
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message) {
      setConversation([...conversation, { message, type: "user" }]);
      setMessage("");
    }
  };

  return (
    <Box width="100vw" height="100dvh" bgcolor={theme.palette.common.black}>
      <Grid container columns={12} rowGap={2} p={1}>
        <Grid item xs={12}>
          <Stack
            border={`1px solid ${theme.palette.grey[800]}`}
            p={2}
            borderRadius={2}
            gap={2}
          >
            {conversation?.map((item) => (
              <Typography color="white">{item?.message ?? ""}</Typography>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} display="flex" gap={2} alignItems="center">
          <InputMUI
            type="text"
            name="message"
            onChange={handleChange}
            value={message}
            label="Envía un mensaje a ChatGPT"
          />
          <IconButton
            type="button"
            disabled={!message}
            onClick={handleClick}
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
