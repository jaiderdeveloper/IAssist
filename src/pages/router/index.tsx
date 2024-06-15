import { createBrowserRouter } from "react-router-dom";
import IAssistPage from "../IAssist";
import SignInPage from "../sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "assist",
    element: <IAssistPage />,
  },
]);
