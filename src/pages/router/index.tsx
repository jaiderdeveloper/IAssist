import { createBrowserRouter } from "react-router-dom";
import ChatGPTPage from "../chatGPT";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Login</h1>,
    children: [
      {
        path: "chat-gpt",
        element: <ChatGPTPage />,
      },
    ],
  },
]);
