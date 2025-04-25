import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
      <Toaster   position="top-right"/>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
