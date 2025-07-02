import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.create({
    title,
    content,
    tags,
    user: req.userId
  });
  res.status(201).json(note);
};

export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted" });
};
