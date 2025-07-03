import { useState } from "react";
import "../components/Components.css";

function Editor() {
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await fetch("http://localhost:5000/api/notes/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: note }),
      });
      const data = await result.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("Failed to summarize. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-container">
      <textarea
        className="note-input"
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="summary-section">
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? "Summarizing..." : "Ask AI to Summarize"}
        </button>
        {summary && <p className="summary-result">{summary}</p>}
      </div>
    </div>
  );
}

export default Editor;
