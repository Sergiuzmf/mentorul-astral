import { useState } from "react";
import { AIChatPanel } from "./AIChatPanel.jsx";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`chat-widget ${isOpen ? "open" : "closed"}`}>
      <button className="chat-toggle" type="button" onClick={() => setIsOpen((current) => !current)}>
        <span className="status-dot" />
        {isOpen ? "Minimizeaza Mentorul Astral" : "Deschide Mentorul Astral"}
      </button>

      {isOpen ? <AIChatPanel compact /> : null}
    </div>
  );
}
