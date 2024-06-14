import { InputMUI } from "@/common/components/input";
import {
  ChatCompletionMessageParam,
  CreateMLCEngine,
  MLCEngine,
} from "@mlc-ai/web-llm";
import { ArrowUpward } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { styleSheet } from "./styles";

export const ChartGPT = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const dataMessages = messages;
      dataMessages.push({ role: "user", content: message });
      setMessages(dataMessages);
      setMessage("");
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
        setMessageGPT("");
        setLoading(false);
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
    <Container sx={styles.container}>
      <Stack sx={styles.messages}>
        {messages?.map((item, index) => (
          <Typography
            sx={{ textAlign: item?.role === "user" ? "right" : "left" }}
            key={index}
            color={
              item?.role === "user" ? "white" : theme.palette.secondary.light
            }
          >
            {String(item.content ?? "")}
          </Typography>
        ))}
        <Typography color="white">{messageGPT}</Typography>
      </Stack>
      <Stack sx={styles.flexibleContent}>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height="38px" />
        ) : (
          <InputMUI
            type="text"
            name="message"
            onChange={handleChange}
            value={message}
            label="Envía un mensaje a ChatGPT"
          />
        )}
        {loading ? (
          <Skeleton variant="circular" width="38px" height="38px" />
        ) : (
          <IconButton
            type="button"
            disabled={!message}
            onClick={handleClick}
            sx={styles.button}
          >
            <ArrowUpward />
          </IconButton>
        )}
      </Stack>
      <Typography color="white" fontSize="0.75rem" textAlign="center">
        {infoText}
      </Typography>
    </Container>
  );
};
