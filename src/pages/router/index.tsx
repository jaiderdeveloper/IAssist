import { createBrowserRouter } from "react-router-dom";
import ChatGPTPage from "../chatGPT";
import SignInPage from "../sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "chat-gpt",
    element: <ChatGPTPage />,
  },
]);
