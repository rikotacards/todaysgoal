import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('SW registered', reg);
    }).catch(err => {
      console.error('SW registration failed:', err);
    });
  });
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <App />
    </BrowserRouter>
  </StrictMode>
);
