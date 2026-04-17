import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { streamSseJson, apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { MarkdownContent } from "./MarkdownContent.jsx";

const recognitionApi =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

export function AIChatPanel({ compact = false, defaultTopic = "general", className = "" }) {
  const { token } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const didAutostartRef = useRef(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Salut. Sunt **Mentorul Astral**. Pot sa explic formule, sa predau ca un profesor, sa verific calcule si sa construiesc sesiuni de invatare pas cu pas."
    }
  ]);
  const [input, setInput] = useState("");
  const [topicTag, setTopicTag] = useState(defaultTopic);
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastAssistantText, setLastAssistantText] = useState("");
  const [pendingImage, setPendingImage] = useState(null);
  const [chatError, setChatError] = useState("");

  const aiStatus = useMemo(() => (isStreaming ? "Gandesc..." : "Online"), [isStreaming]);

  async function sendMessage(prefilled) {
    const finalInput = (prefilled ?? input).trim();
    if (!finalInput || isStreaming) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: finalInput
    };
    const assistantMessageId = crypto.randomUUID();

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" }
    ]);
    setInput("");
    setIsStreaming(true);
    setLastAssistantText("");
    setChatError("");

    try {
      await streamSseJson({
        path: "/api/ai/chat/stream",
        token,
        body: {
          sessionId,
          message: finalInput,
          topicTag,
          imageDataUrl: pendingImage
        },
        onMessage: (payload) => {
          if (payload.type === "delta") {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantMessageId
                  ? { ...message, content: `${message.content}${payload.delta}` }
                  : message
              )
            );
            setLastAssistantText((current) => `${current}${payload.delta}`);
          }
        }
      });
    } catch (error) {
      setChatError(error.message || "Nu am putut contacta AI-ul.");
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? { ...message, content: `Eroare AI: ${error.message}` }
            : message
        )
      );
    } finally {
      setIsStreaming(false);
      setPendingImage(null);
    }
  }

  useEffect(() => {
    const initialPrompt = location.state?.initialPrompt;
    const initialTopic = location.state?.initialTopic;
    if (!initialPrompt || didAutostartRef.current) return;
    didAutostartRef.current = true;
    if (initialTopic) {
      setTopicTag(initialTopic);
    }
    sendMessage(initialPrompt);
  }, [location.state]);

  function startVoiceInput() {
    if (!recognitionApi) return;
    const recognition = new recognitionApi();
    recognition.lang = "ro-RO";
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        setInput((current) => `${current} ${transcript}`.trim());
      }
    };
    recognition.start();
  }

  function speakLatest() {
    if (!("speechSynthesis" in window) || !lastAssistantText) return;
    const utterance = new SpeechSynthesisUtterance(lastAssistantText);
    utterance.lang = "ro-RO";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function saveExplanation() {
    if (!lastAssistantText.trim()) return;
    await apiRequest("/api/ai/notes", {
      method: "POST",
      token,
      body: {
        title: `Explicatie ${new Date().toLocaleDateString("ro-RO")}`,
        content: lastAssistantText,
        sourceTopic: topicTag
      }
    });
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPendingImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <section className={`chat-card ${compact ? "chat-card-compact" : "chat-card-page"} ${className}`.trim()}>
      <header className="chat-header">
        <div>
          <p className="eyebrow">Powered by AI</p>
          <h3>Mentorul Astral</h3>
          {!compact ? (
            <p className="muted-copy">
              Profesorul tau virtual pentru ONAA: explicatii pas cu pas, dialog socratic si ajutor contextual.
            </p>
          ) : null}
        </div>
        <span className="chat-status">{aiStatus}</span>
      </header>

      <select value={topicTag} onChange={(event) => setTopicTag(event.target.value)}>
        <option value="general">General</option>
        <option value="orbital_mechanics">Mecanica orbitala</option>
        <option value="stellar_physics">Fizica stelara</option>
        <option value="magnitude_scale">Magnitudini</option>
        <option value="constellations">Cerul noptii</option>
      </select>

      <div className={`chat-messages ${compact ? "" : "chat-messages-large"}`}>
        {messages.map((message) => (
          <article key={message.id} className={`chat-message ${message.role}`}>
            <strong>{message.role === "assistant" ? "Mentorul Astral" : "Tu"}</strong>
            <MarkdownContent content={message.content || "_scriu..._"} />
          </article>
        ))}
      </div>

      {pendingImage ? <p className="chat-helper">Imagine atasata pentru analiza AI.</p> : null}
      {chatError ? <p className="form-error">{chatError}</p> : null}

      <div className="chat-actions">
        <button className="ghost-button" type="button" onClick={() => sendMessage("Explica pe intelesul unui elev de 15 ani.")}>
          Explica simplu
        </button>
        <button className="ghost-button" type="button" onClick={() => sendMessage("Genereaza un alt exemplu, dar mai intuitiv.")}>
          Alt exemplu
        </button>
        {!compact ? (
          <button className="ghost-button" type="button" onClick={() => sendMessage("Verifica daca am inteles corect si pune-mi 2 intrebari scurte.")}>
            Mini verificare
          </button>
        ) : null}
      </div>

      <textarea
        rows={compact ? 4 : 6}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Intreaba despre formule, trimite un pas de calcul sau porneste o lectie ghidata..."
      />

      <div className="chat-toolbar">
        <button className="ghost-button" type="button" onClick={startVoiceInput}>
          Dictare
        </button>
        <button className="ghost-button" type="button" onClick={() => fileInputRef.current?.click()}>
          Incarca imagine
        </button>
        <button className="ghost-button" type="button" onClick={saveExplanation}>
          Salveaza
        </button>
        <button className="ghost-button" type="button" onClick={speakLatest}>
          Voce
        </button>
      </div>

      <button className="primary-button" type="button" onClick={() => sendMessage()} disabled={isStreaming}>
        {isStreaming ? "Se genereaza..." : "Trimite"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="visually-hidden"
        onChange={handleImageUpload}
      />
    </section>
  );
}

