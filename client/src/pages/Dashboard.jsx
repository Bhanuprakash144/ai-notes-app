import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login");
      return navigate("/login");
    }

    fetchNotes(token);
  }, []);

  const fetchNotes = async (token) => {
    try {
      const res = await API.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editNoteId) {
        // update note
        const res = await API.put(
          `/notes/${editNoteId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedNotes = notes.map((note) =>
          note._id === editNoteId ? res.data : note
        );
        setNotes(updatedNotes);
        setEditNoteId(null);
      } else {
        // add new note
        const res = await API.post(
          "/notes",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes([...notes, res.data]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      alert("Error saving note");
    }
  };

  const handleEdit = (note) => {
    setEditNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Error deleting note");
    }
  };

  return (
    <div className="dashboard">
      <h2>📝 {editNoteId ? "Edit Note" : "Your Notes"}</h2>

      <form onSubmit={handleAddOrUpdate}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">
          {editNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {notes.length === 0 && <p>No notes yet.</p>}
        {notes.map((note) => (
          <div key={note._id} style={noteStyle}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => handleEdit(note)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(note._id)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const noteStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

export default Dashboard;
