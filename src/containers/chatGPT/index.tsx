import { InputMUI } from "@/common/components/input";
import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";
import { ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

export const ChartGPT = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string>("");
  const [messageGPT, setMessageGPT] = useState<string>("");
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [engine, setEngine] = useState<MLCEngine | null>(null);
  const [infoText, setInfoText] = useState("");

  /**
   * Capturar valor del campo de mensaje
   * @function handleChange
   * @param event evento
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  /**
   * Enviar mensaje
   * @function handleClick
   * @param event evento
   */
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (message) {
      const dataMessages = messages;
      dataMessages.push({ role: "user", content: message });
      setMessages(dataMessages);
      if (engine) {
        const chunks = await engine.chat.completions.create({
          messages: dataMessages,
          stream: true,
        });
        let content = "";
        for await (const chunk of chunks) {
          const [choice] = chunk.choices;
          content += choice?.delta?.content ?? "";
          setMessageGPT(content);
        }
        dataMessages.push({ role: "assistant", content: content });
        setMessages(dataMessages);
        setMessage("");
        setMessageGPT("");
      }
    }
  };

  useEffect(() => {
    const handle = async () => {
      const result = await CreateMLCEngine("Qwen2-0.5B-Instruct-q0f32-MLC", {
        initProgressCallback: (info) => {
          setInfoText(info?.text ?? "");
        },
      });
      setEngine(result);
    };
    handle();
  }, []);

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
            {messages?.map((item, index) => (
              <Typography
                key={index}
                color={item?.role === "user" ? "white" : "green"}
              >
                {String(item.content ?? "")}
              </Typography>
            ))}
            <Typography color="white">{messageGPT}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} display="flex" gap={2} alignItems="center">
          <InputMUI
            type="text"
            name="message"
            onChange={handleChange}
            value={message}
            label="Envía un mensaje a ChatGPT"
            helperText={infoText}
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
