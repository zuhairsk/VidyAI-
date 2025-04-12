import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// All providers moved to App.tsx
createRoot(document.getElementById("root")!).render(<App />);
