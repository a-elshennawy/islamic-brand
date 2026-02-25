import { createRoot } from "react-dom/client";
import "toastify-js/src/toastify.css";
import "./App.css";
import App from "./App.jsx";
import "./i18n.js";
import { AuthProvider } from "./services/context/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>,
);
