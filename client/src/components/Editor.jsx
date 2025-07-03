import { useState, useEffect } from "react";
import "../components/Components.css";

function Editor() {
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousSummaries, setPreviousSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedSummary, setEditedSummary] = useState("");

  useEffect(() => {
    const fetchSummaries = async () => {
      const res = await fetch("http://localhost:5000/api/notes/summaries");
      const data = await res.json();
      setPreviousSummaries(data);
    };
    fetchSummaries();
  }, []);

  const handleSummarize = () => {
    setLoading(true);
    setTimeout(() => {
      const dummySummary = `Summary: ${note.substring(0, 50)}...`;
      setSummary(dummySummary);
      setPreviousSummaries(prev => [
        { note, summary: dummySummary },
        ...prev.slice(0, 4)
      ]);
      setLoading(false);
    }, 1000);
  };

  const startEditing = (index, summary) => {
    setEditIndex(index);
    setEditedSummary(summary);
  };

  const saveEditedSummary = (index) => {
    const updated = [...previousSummaries];
    updated[index].summary = editedSummary;
    setPreviousSummaries(updated);
    setEditIndex(null);
  };

  const deleteSummary = (index) => {
    const updated = [...previousSummaries];
    updated.splice(index, 1);
    setPreviousSummaries(updated);
  };

  const filteredSummaries = previousSummaries.filter(
    (s) =>
      s.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <input
          type="text"
          placeholder="Search summaries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="previous-summaries">
          <h3>🕓 Previous Summaries</h3>
          <ul>
            {filteredSummaries.map((s, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <>
                    <textarea
                      value={editedSummary}
                      onChange={(e) => setEditedSummary(e.target.value)}
                    />
                    <button onClick={() => saveEditedSummary(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <strong>Note:</strong> {s.note.substring(0, 100)}...<br />
                    <strong>Summary:</strong> {s.summary}
                    <br />
                    <button onClick={() => startEditing(index, s.summary)}>✏️ Edit</button>
                    <button onClick={() => deleteSummary(index)}>🗑️ Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Editor;
